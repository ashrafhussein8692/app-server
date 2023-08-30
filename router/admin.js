const express = require('express');
const AdminAuth = require('../middleware/admin');
// const upload = require('../middleware/upload');
const router = express.Router();
const AdminController = require('../controller/admin');

router.post('/api/admin/add-product', AdminAuth, AdminController.PostProduct);
router.get('/api/admin/get-product', AdminAuth, AdminController.getProduct);
router.delete('/api/admin/delete-product', AdminAuth, AdminController.deleteProduct);












module.exports = router;