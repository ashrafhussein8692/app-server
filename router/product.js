const express = require('express');
const Auth = require('../middleware/auth');
const router = express.Router();
const productController = require('../controller/product');
router.get('/api/get-products', Auth, productController.getProduct)
router.get('/api/products', Auth, productController.getCategoryProduct)
router.get('/api/products/search/:name', Auth, productController.getSearch)
router.post('/api/rate-product', Auth, productController.postRating)
router.get('/api/deal-of-day', Auth, productController.getDeal)






module.exports = router;