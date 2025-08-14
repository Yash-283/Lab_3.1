// userService_secure.js
import bcrypt from 'bcryptjs';
import { getUserByUsername, insertUser, updateUserPassword } from './db.js';

const SALT_ROUNDS = 12;

/**
 * Creates a new user with a hashed password.
 */
export async function createUser(username, password) {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  await insertUser(username, hashed);
  return { status: 'success', user: username };
}

/**
 * Logs in a user.
 * - If password already hashed → compare with bcrypt.
 * - If legacy plain-text → verify once, then hash & update (migration).
 */
export async function loginUser(username, password) {
  const user = await getUserByUsername(username);
  if (!user) {
    return { status: 'error', message: 'User not found' };
  }

  const stored = user.password || '';
  const isBcrypt = stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$');

  if (isBcrypt) {
    const ok = await bcrypt.compare(password, stored);
    if (!ok) return { status: 'error', message: 'Invalid password' };
    return { status: 'success', message: 'Login successful (hashed)' };
  }

  // Legacy plain-text
  if (stored !== password) {
    return { status: 'error', message: 'Invalid password' };
  }

  // Migrate now
  const newHash = await bcrypt.hash(password, SALT_ROUNDS);
  await updateUserPassword(username, newHash);
  return { status: 'success', message: 'Login successful (migrated to hashed)' };
}
