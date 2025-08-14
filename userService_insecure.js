// userService_insecure.js
import { insertUser } from './db.js';

/**
 * INSECURE: stores password as plain text (for demo only).
 */
export async function createUser_insecure(username, password) {
  // ❌ Vulnerable: saving plain text password
  await insertUser(username, password);
  return { status: 'success', user: username };
}
