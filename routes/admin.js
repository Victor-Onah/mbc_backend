const {
	uploadProduct,
	deleteProduct,
	updateProduct,
	getMessages,
} = require('../controllers/admin');
const router = require('express').Router();

// Handle product upload
router.post('/products/upload', uploadProduct);

router
	.route('/products/:productID')
	// Delete product
	.delete(deleteProduct)
	// Update a product
	.patch(updateProduct);

// Get messages
router.get('/messages', getMessages);
module.exports = router;
