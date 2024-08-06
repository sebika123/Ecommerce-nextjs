const Database = require('better-sqlite3');
const path = require('path');


const dbPath = path.resolve(__dirname, 'mydatabase.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL 
  
  
  
    )
`);

module.exports = db;
