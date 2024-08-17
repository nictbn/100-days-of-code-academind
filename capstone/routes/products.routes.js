const express = require('express');
const productRoutes = require('../controllers/products.controller');

const router = express.Router();

router.get('/products', productRoutes.getAllProducts);

module.exports = router;