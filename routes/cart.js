const cart = require('../controllers/cart');
const router = require('express').Router();

router.put('/add/:userID/:productID', cart.updateCart);

module.exports = router;
