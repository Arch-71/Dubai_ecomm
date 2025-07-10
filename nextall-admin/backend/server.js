// backend/server.js
// Minimal Express server to test category, brand, product, and shop logic
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const category = require('./category');
const brand = require('./brand');
const product = require('./product');
const shop = require('./shop');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

// Category endpoints
app.post('/admin/categories', category.verifyToken, category.createCategory);
// Brand endpoints
app.post('/admin/brands', brand.verifyToken, brand.createBrand);
// Product endpoints
app.post('/admin/products', product.verifyToken, product.createProduct);
// Shop endpoints
app.post('/admin/shops', shop.verifyToken, shop.createShop);

app.get('/', (req, res) => res.send('Test backend running'));

app.listen(PORT, () => {
  console.log(`Test backend running on port ${PORT}`);
});
