const express = require('express');
const router = express.Router();
const brand = require('../controllers/brand');

// Import verifyToken function
const verifyToken = require('../config/jwt');

// admin routes

router.post('/brands', verifyToken, brand.createBrand);

router.get('/brands', verifyToken, brand.getBrands);

router.get('/brands/:slug', verifyToken, brand.getBrandBySlug);

router.put('/brands/:slug', verifyToken, brand.updateBrandBySlug);

router.delete('/brands/:slug', verifyToken, brand.deleteBrandBySlug);

router.get('/all-brands', brand.getAllBrands);

// User routes

router.get('/brands', brand.getAllBrands);

module.exports = router;
