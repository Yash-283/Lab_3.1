// seedPlainUser.js
import { insertUser } from './db.js';

const username = 'bob';
const password = 'secret123'; // plain text on purpose for migration demo

insertUser(username, password)
  .then(() => console.log('✅ Seed complete: added plain-text user "bob"'))
  .catch(err => console.error('Seed error:', err.message));
