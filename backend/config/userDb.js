const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'team06.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the team06 database.');
});


function createTable( callback) {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS user_details (id INTEGER PRIMARY KEY, username TEXT, password TEXT)`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
                return;
            }
            console.log(`Created the user_details table.`);
            callback();
        });
    });
}        