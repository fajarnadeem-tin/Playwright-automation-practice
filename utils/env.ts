/**
 * Read a required environment variable, failing fast with a clear message
 * instead of letting a test run with `undefined` credentials.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable "${name}". Copy .env.example to .env (see README).`);
  }
  return value;
}

export const env = {
  get sauceUsername() {
    return requireEnv('SAUCE_USERNAME');
  },
  get saucePassword() {
    return requireEnv('SAUCE_PASSWORD');
  },
  get bookerUsername() {
    return requireEnv('BOOKER_USERNAME');
  },
  get bookerPassword() {
    return requireEnv('BOOKER_PASSWORD');
  },
};
