const express = require('express');
const Auth = require('../middleware/auth');
const router = express.Router();
const userController = require('../controller/user');
router.post('/api/register', userController.postRegister);
router.post('/api/login', userController.postLogin);
router.get('/', Auth, userController.verfiyToken);
router.post('/api/add-to-cart', Auth, userController.addToCart)
router.delete('/api/delete-from-cart/:id', Auth, userController.deleteFromCart)
router.get('/api/get-cart', Auth, userController.getCart);














module.exports = router;