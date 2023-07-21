const { getProducts, getSingleProduct } = require('../controllers/product');
const router = require('express').Router();

// Get all products
router.get('/', getProducts);

// Get single product
router.get('/:productID', getSingleProduct);

module.exports = router;
