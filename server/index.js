import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const db = new Database(path.join('/app/data', 'database.sqlite'));

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    gallery TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL
  )
`);

app.use(cors());
app.use(express.json());

// Get all cards
app.get('/api/cards', (req, res) => {
  const { category } = req.query;
  let cards;
  
  if (category) {
    cards = db.prepare('SELECT * FROM cards WHERE category = ?').all(category);
  } else {
    cards = db.prepare('SELECT * FROM cards').all();
  }
  
  // Parse gallery JSON string back to array
  cards = cards.map(card => ({
    ...card,
    gallery: JSON.parse(card.gallery)
  }));
  
  res.json(cards);
});

// Get single card
app.get('/api/cards/:id', (req, res) => {
  const card = db.prepare('SELECT * FROM cards WHERE id = ?').get(req.params.id);
  if (card) {
    card.gallery = JSON.parse(card.gallery);
    res.json(card);
  } else {
    res.status(404).json({ error: 'Card not found' });
  }
});

// Add new card
app.post('/api/cards', (req, res) => {
  const { title, description, image, gallery, content, category } = req.body;
  
  try {
    const result = db.prepare(`
      INSERT INTO cards (title, description, image, gallery, content, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, description, image, JSON.stringify(gallery), content, category);
    
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});