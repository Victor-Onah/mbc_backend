const { uploadProduct } = require('../controllers/admin');
const router = require('express').Router();

router.post('/product/upload', uploadProduct);

module.exports = router;
