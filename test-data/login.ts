import { env } from '../utils/env';

export interface InvalidLoginCase {
  title: string;
  username: string;
  password: string;
  expectedError: string;
}

// Each entry becomes its own test (data-driven testing).
// A function, so env vars are read when tests are collected, not at import.
export const invalidLoginCases = (): InvalidLoginCase[] => [
  {
    title: 'empty username',
    username: '',
    password: env.saucePassword,
    expectedError: 'Epic sadface: Username is required',
  },
  {
    title: 'empty password',
    username: env.sauceUsername,
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
  {
    title: 'wrong password',
    username: env.sauceUsername,
    password: 'wrong_password',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    title: 'locked out user',
    username: 'locked_out_user',
    password: env.saucePassword,
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
];
