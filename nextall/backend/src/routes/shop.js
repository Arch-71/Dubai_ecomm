const express = require('express');
const router = express.Router();
const shop = require('../controllers/shop');
// Import verifyToken function
const verifyToken = require('../config/jwt');
//Admin routes
router.get('/shops', verifyToken, shop.getShopsByAdmin);
router.post('/shops', verifyToken, shop.createShopByAdmin);
router.get('/shops/:slug', verifyToken, shop.getOneShopByAdmin);
router.put('/shops/:slug', verifyToken, shop.updateOneShopByAdmin);
router.put(
  '/shops/status/:slug',
  verifyToken,
  shop.updateShopStatusByAdmin
);
router.delete('/shops/:slug', verifyToken, shop.deleteOneShopByAdmin);
router.get('/shops/all-shops', shop.getAllShopsByAdmin);
//Vendor routes
router.post('/shops', verifyToken, shop.createShopByVendor);
router.get('/shops/stats', verifyToken, shop.getShopStatsByVendor);
router.get('/shops', verifyToken, shop.getOneShopByVendor);
router.put('/vendor/shops/:slug', verifyToken, shop.updateOneShopByVendor);
router.delete('/vendor/shops/:slug', verifyToken, shop.deleteOneShopByVendor);

// create shop by user
router.post('/shops', verifyToken, shop.createShopByUser);
router.get('/user/shop', verifyToken, shop.getShopByUser);

//User routes
router.get('/shops', shop.getShops);
router.get('/all-shops', shop.getAllShops);

router.get('/shops/:slug', shop.getOneShopByUser);
router.get('/shops-slugs', shop.getShopsSlugs);
router.get('/shop-title/:slug', shop.getShopNameBySlug);
router.put('/shops/:shopId/follow', verifyToken, shop.followShop);
module.exports = router;
