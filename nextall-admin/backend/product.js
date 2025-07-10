// backend/product.js
// Standalone Express-compatible logic for product CRUD, matching frontend AddProduct.jsx usage

const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

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

async function createProduct(req, res) {
  const { name, description, price, images, brand, category, stock } = req.body;
  if (!name || !price || !images || !category) return res.status(400).json({ error: 'Missing fields' });
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const result = await db.collection('products').insertOne({
      name,
      description: description || '',
      price: parseFloat(price),
      images,
      brand: brand || '',
      category,
      stock: stock ? parseInt(stock) : 0,
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
  createProduct,
};
