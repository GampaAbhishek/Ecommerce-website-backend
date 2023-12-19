const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const userRoutes = require('../modules/user/userController');
const productRoutes = require('../modules/product/productController');

router.use('/product', productRoutes);
router.use('/people', userRoutes);

module.exports = router;