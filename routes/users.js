const { sendMessage, placeOrder } = require('../controllers/users');
const router = require('express').Router();

router.post('/message', sendMessage);

router.post('/order', placeOrder);

module.exports = router;
