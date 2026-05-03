/**
 * David's birthday: 31 July 2006. The age is recomputed on every render
 * so this is always correct without manual edits each year.
 */
const BIRTHDAY = new Date("2006-07-31");

function getAge(now: Date = new Date()): number {
   const today = new Date(now);
   const beforeBirthday =
      today <
      new Date(
         today.getFullYear(),
         BIRTHDAY.getMonth(),
         BIRTHDAY.getDate(),
      );
   return today.getFullYear() - BIRTHDAY.getFullYear() - (beforeBirthday ? 1 : 0);
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

/** Returns the lower-case English word for the age, or the number string. */
export function ageWord(now: Date = new Date()): string {
   const a = getAge(now);
   return SPELLED[a] ?? String(a);
}
