import path from 'path';

// Where the setup project saves the logged-in browser state (git-ignored).
export const STORAGE_STATE = path.join(__dirname, '..', 'playwright/.auth/user.json');
