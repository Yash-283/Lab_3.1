// // seed.js
// const sqlite3 = require('sqlite3').verbose();
// const bcrypt = require('bcrypt');

// // Connect to your DB (adjust filename if needed)
// const db = new sqlite3.Database('./users.db');

// // Example seed data
// const username = 'testuser';
// const plainPassword = 'password123';

// // Hash password before storing
// bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
//     if (err) {
//         console.error('Error hashing password:', err);
//         process.exit(1);
//     }

//     // Create users table if it doesn’t exist
//     db.run(`CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT UNIQUE,
//         password TEXT
//     )`);

//     // Insert test user
//     db.run(`INSERT INTO users (username, password) VALUES (?, ?)`,
//         [username, hashedPassword],
//         function (err) {
//             if (err) {
//                 console.error('Error inserting user:', err.message);
//             } else {
//                 console.log(`✅ Seed complete: Added ${username} with hashed password`);
//             }
//             db.close();
//         }
//     );
// });
