import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { env } from "~/env.mjs";

const query = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
          }
        }
      }
      repositories(
        first: 1
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          pushedAt
        }
      }
    }
  }
`;

const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
   NONE: 0,
   FIRST_QUARTILE: 1,
   SECOND_QUARTILE: 2,
   THIRD_QUARTILE: 3,
   FOURTH_QUARTILE: 4,
};

export type ContributionDay = {
   date: string;
   count: number;
   level: 0 | 1 | 2 | 3 | 4;
   weekday: number;
};

export type ContributionWeek = {
   days: ContributionDay[];
};

export type ContributionData = {
   total: number;
   weeks: ContributionWeek[];
   username: string;
   longestStreak: number;
   currentStreak: number;
   busiestDay: ContributionDay | null;
   /** ISO timestamp of the most recent push to an owned repo (minute-precise). */
   lastPushAt: string | null;
};

const computeStats = (weeks: ContributionWeek[]) => {
   const flat: ContributionDay[] = weeks.flatMap((w) => w.days);
   let longest = 0;
   let running = 0;
   for (const d of flat) {
      if (d.count > 0) {
         running += 1;
         if (running > longest) longest = running;
      } else {
         running = 0;
      }
   }
   // current streak — walk backwards from last non-future day
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   let current = 0;
   for (let i = flat.length - 1; i >= 0; i--) {
      const d = flat[i]!;
      const date = new Date(d.date);
      if (date > today) continue;
      if (d.count > 0) current += 1;
      else break;
   }
   const busiest = flat.reduce<ContributionDay | null>((max, d) => {
      if (!max || d.count > max.count) return d;
      return max;
   }, null);
   return { longest, current, busiest };
};

export async function fetchContributions(): Promise<ContributionData | null> {
   "use cache";
   cacheLife("hours");
   cacheTag("github-contributions");
   try {
      const res = await fetch("https://api.github.com/graphql", {
         method: "POST",
         headers: {
            Authorization: `Bearer ${env.GITHUB_JOB_API_KEY}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            query,
            variables: { login: env.GITHUB_JOB_USERNAME },
         }),
      });
      if (!res.ok) {
         console.error(`GitHub contributions fetch: ${res.status}`);
         return null;
      }
      const json = (await res.json()) as {
         data?: {
            user?: {
               contributionsCollection?: {
                  contributionCalendar?: {
                     totalContributions: number;
                     weeks: {
                        contributionDays: {
                           date: string;
                           contributionCount: number;
                           contributionLevel: string;
                           weekday: number;
                        }[];
                     }[];
                  };
               };
               repositories?: {
                  nodes: { pushedAt: string | null }[];
               };
            };
         };
      };
      const cal =
         json.data?.user?.contributionsCollection?.contributionCalendar;
      if (!cal) return null;
      const lastPushAt =
         json.data?.user?.repositories?.nodes?.[0]?.pushedAt ?? null;
      const weeks: ContributionWeek[] = cal.weeks.map((w) => ({
         days: w.contributionDays.map((d) => ({
            date: d.date,
            count: d.contributionCount,
            level: levelMap[d.contributionLevel] ?? 0,
            weekday: d.weekday,
         })),
      }));
      const { longest, current, busiest } = computeStats(weeks);
      return {
         total: cal.totalContributions,
         weeks,
         username: env.GITHUB_JOB_USERNAME,
         longestStreak: longest,
         currentStreak: current,
         busiestDay: busiest,
         lastPushAt,
      };
   } catch (e) {
      console.error("contributions fetch failed", e);
      return null;
   }
}
