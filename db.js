// db.js
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

async function readUsers() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export async function getUserByUsername(username) {
  const users = await readUsers();
  return users.find(u => u.username === username) || null;
}

export async function insertUser(username, password) {
  const users = await readUsers();
  if (users.some(u => u.username === username)) {
    throw new Error('User already exists');
  }
  users.push({ username, password });
  await writeUsers(users);
}

export async function updateUserPassword(username, newPassword) {
  const users = await readUsers();
  const idx = users.findIndex(u => u.username === username);
  if (idx === -1) throw new Error('User not found');
  users[idx].password = newPassword;
  await writeUsers(users);
}
