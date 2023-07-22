const { updateCart, sendMessage } = require('../controllers/users');
const router = require('express').Router();

router.put('/cart/add/:userID/:productID', updateCart);

router.post('/message', sendMessage);

module.exports = router;
