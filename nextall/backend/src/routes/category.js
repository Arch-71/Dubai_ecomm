const express = require('express');
const router = express.Router();
const categories = require('../controllers/category');

// Import verifyToken function
const verifyToken = require('../config/jwt');

const multer = require('multer');


router.post('/categories', verifyToken, categories.createCategory);

router.get('/categories', verifyToken, categories.getCategories);

router.get(
  '/categories/:slug',
  verifyToken,
  categories.getCategoryBySlug
);

router.put(
  '/categories/:slug',
  verifyToken,
  categories.updateCategoryBySlug
);
router.delete(
  '/categories/:slug',
  verifyToken,
  categories.deleteCategoryBySlug
);

// New: Delete by _id
router.delete(
  '/categories/id/:id',
  verifyToken,
  categories.deleteCategoryById
);
router.get('/categories/all', verifyToken, categories.getCategories);
router.get('/admin/all-categories', categories.getCategoriesByAdmin);

// User routes

router.get('/categories', categories.getCategories);
router.get('/header/all-categories', categories.getAllHeaderCategories);
router.get('/all-categories', categories.getAllCategories);
router.get('/categories-slugs', categories.getCategoriesSlugs);
router.get('/subcategories-slugs', categories.getSubCategoriesSlugs);
router.get('/categories/:slug', categories.getCategoryBySlug);
router.get('/category-title/:slug', categories.getCategoryNameBySlug);

module.exports = router;
