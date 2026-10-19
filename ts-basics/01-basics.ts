// Step 1.1 — Variables, types, functions, arrow functions
// Run me with:  npx tsx ts-basics/01-basics.ts

// ---------- 1. Variables ----------
// const = value never changes (use this by default)
const siteName = 'Sauce Demo';

// let = value will change later
let loginAttempts = 0;
loginAttempts = loginAttempts + 1;

console.log('Site:', siteName, '| attempts:', loginAttempts);

// ---------- 2. Types ----------
// TypeScript usually *guesses* the type (called "type inference"),
// but you can also write it explicitly after a colon.
const username: string = 'standard_user';
const timeoutMs: number = 5000;
const isLoggedIn: boolean = false;

console.log(username, timeoutMs, isLoggedIn);

// Try it: remove the // on the next line. VS Code will underline it in red,
// because a number cannot go into a string box.
// const wrong: string = 123;

// ---------- 3. Functions ----------
// (name: string) -> input must be text
// : string after the brackets -> this function returns text
function greet(name: string): string {
  return 'Hello, ' + name;
}

console.log(greet('Fajar'));

// ---------- 4. Arrow functions ----------
// Same thing as greet(), shorter syntax. Stored in a const.
const greetArrow = (name: string): string => {
  return 'Hi, ' + name;
};

// When the body is just one expression, you can even drop { } and return:
const add = (a: number, b: number): number => a + b;

console.log(greetArrow('Fajar'), '| 2 + 3 =', add(2, 3));

// ---------- 5. Template strings ----------
// Backticks ` let you put variables inside text with ${ }.
// You'll use this a lot for URLs and messages in tests.
const baseUrl = 'https://www.saucedemo.com';
const page = 'inventory.html';
console.log(`Full URL: ${baseUrl}/${page}`);

// Preview of what's coming in Level 2: a Playwright test is just
// a function call that receives a name and an (async) arrow function:
//
//   test('user can log in', async ({ page }) => { ... });
//                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ arrow function!

// Exercise 1: Create a const named password holding the text secret_sauce, with an explicit string type. Then print it with console.log.
const password: string = 'secret_sauce';
console.log(password);

// Exercise 2: Write an arrow function called buildUrl that:
// takes one parameter path of type string
// returns a string combining baseUrl and path with a / between them, using a template string with backticks
// call it with 'cart.html' and print the result. It should print https://www.saucedemo.com/cart.html
const buildUrl = (path: string): string => `${baseUrl}/${path}`;
console.log(buildUrl('cart.html'));
