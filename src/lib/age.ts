/**
 * David's birthday: 31 July 2006. The age is recomputed on every render
 * so this is always correct without manual edits each year.
 */
export const BIRTHDAY = new Date("2006-07-31");

export function getAge(now: Date = new Date()): number {
   const today = new Date(now);
   const beforeBirthday =
      today <
      new Date(today.getFullYear(), BIRTHDAY.getMonth(), BIRTHDAY.getDate());
   return (
      today.getFullYear() - BIRTHDAY.getFullYear() - (beforeBirthday ? 1 : 0)
   );
}

const SPELLED: Record<number, string> = {
   18: "eighteen",
   19: "nineteen",
   20: "twenty",
   21: "twenty-one",
   22: "twenty-two",
   23: "twenty-three",
   24: "twenty-four",
   25: "twenty-five",
};

/** Lower-case English word for a number, or the number string as fallback. */
export function wordForNumber(n: number): string {
   return SPELLED[n] ?? String(n);
}

/** Returns the lower-case English word for the age, or the number string. */
export function ageWord(now: Date = new Date()): string {
   return wordForNumber(getAge(now));
}

/** True when `now` falls on the birthday (month + day match, any year). */
export function isBirthday(now: Date = new Date()): boolean {
   return (
      now.getMonth() === BIRTHDAY.getMonth() &&
      now.getDate() === BIRTHDAY.getDate()
   );
}

/** Midnight of the next birthday relative to `now` (year rolls forward). */
export function nextBirthday(now: Date = new Date()): Date {
   const candidate = new Date(
      now.getFullYear(),
      BIRTHDAY.getMonth(),
      BIRTHDAY.getDate(),
   );
   if (now >= candidate) candidate.setFullYear(candidate.getFullYear() + 1);
   return candidate;
}
