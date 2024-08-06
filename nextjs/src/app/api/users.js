import db from '../lib/database';

export default function handler(req, res) {
    if (req.method === 'GET') {
      // Fetch all users
      const users = db.prepare('SELECT * FROM users').all();
      res.status(200).json(users);
    } else if (req.method === 'POST') {
      const { id, name, description, image } = req.body;
      const stmt = db.prepare('INSERT INTO users (id, name, description, image) VALUES (?, ?, ?, ?)');
      const info = stmt.run(id, name, description, image);
      res.status(201).json({ id: info.lastInsertRowid, name, description, image });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }