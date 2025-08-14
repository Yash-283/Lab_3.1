// demo.js
import { createUser_insecure } from './userService_insecure.js';
import { createUser, loginUser } from './userService_secure.js';

async function run() {
  console.log('--- Seeding legacy user (plain text) ---');
  // (You already seeded via npm run seed; this is just a header)

  console.log('\n--- Creating secure user "alice" ---');
  await createUser('alice', 'P@ssw0rd!');
  console.log('alice created (hashed) ✅');

  console.log('\n--- Test alice login (hashed) ---');
  console.log(await loginUser('alice', 'P@ssw0rd!')); // success (hashed)
  console.log(await loginUser('alice', 'wrong'));     // invalid

  console.log('\n--- Test bob (plain text → migrate on first login) ---');
  console.log(await loginUser('bob', 'secret123'));   // success (migrated)
  console.log(await loginUser('bob', 'secret123'));   // success (hashed now)
  console.log(await loginUser('bob', 'wrong'));       // invalid
}

run().catch(console.error);
