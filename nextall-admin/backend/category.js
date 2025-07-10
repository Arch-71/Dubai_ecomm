// backend/category.js
// Standalone Express-compatible logic for category CRUD, matching frontend AddCategory.jsx usage

const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

// Load env vars (for dev/test, you may want to use dotenv)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'nextall';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

async function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const token = auth.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

async function createCategory(req, res) {
  const { name, description, cover } = req.body;
  if (!name || !cover) return res.status(400).json({ error: 'Missing fields' });
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const result = await db.collection('categories').insertOne({
      name,
      description: description || '',
      cover,
      createdAt: new Date(),
    });
    res.json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}

module.exports = {
  verifyToken,
  createCategory,
};
