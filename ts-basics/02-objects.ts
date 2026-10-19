// Step 1.2 — Objects, arrays, interfaces
// Run me with:  npx tsx ts-basics/02-objects.ts

// ---------- 1. Objects ----------
// An object groups related values together as key: value pairs.
const user = {
  username: 'standard_user',
  password: 'secret_sauce',
};

// Read a value with a dot:
console.log('Username is:', user.username);

// ---------- 2. Interfaces ----------
// An interface describes the SHAPE of an object: which keys it has
// and what type each key is. It's like a form template.
interface User {
  username: string;
  password: string;
  isLocked: boolean;
  nickname?: string; // ? = optional, this key may be missing
}

// Now TypeScript checks this object matches the User shape.
const lockedUser: User = {
  username: 'locked_out_user',
  password: 'secret_sauce',
  isLocked: true,
  // nickname is optional, so leaving it out is fine
};

console.log(lockedUser.username, 'locked?', lockedUser.isLocked);

// Try it: remove the // on the next line -> red underline,
// because "isLocked" is missing.
// const brokenUser: User = { username: 'x', password: 'y' };

// ---------- 3. Arrays ----------
// An array is an ordered list. User[] means "a list of User objects".
const users: User[] = [
  { username: 'standard_user', password: 'secret_sauce', isLocked: false },
  lockedUser,
  { username: 'problem_user', password: 'secret_sauce', isLocked: false, nickname: 'buggy' },
];

console.log('How many users:', users.length);
console.log('First user:', users[0].username); // counting starts at 0!

// ---------- 4. Looping over arrays ----------
// for...of goes through each item one by one.
for (const u of users) {
  console.log(`- ${u.username} (locked: ${u.isLocked})`);
}

// ---------- 5. Useful array methods (take an arrow function!) ----------
// filter: keep only items where the arrow function returns true
const activeUsers = users.filter((u) => u.isLocked === false);
console.log('Active users:', activeUsers.length);

// map: turn each item into something else
const names = users.map((u) => u.username);
console.log('Names:', names);

// find: get the FIRST item that matches (or undefined if none)
const problem = users.find((u) => u.username === 'problem_user');
console.log('Found:', problem?.nickname); // ?. = "only if it exists"

// Preview: in Level 4 we'll loop over an array like this to create
// one test per user automatically (data-driven testing):
//
//   for (const u of users) {
//     test(`login works for ${u.username}`, async ({ page }) => { ... });
//   }
