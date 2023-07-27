const {
	uploadProduct,
	deleteProduct,
	updateProduct,
	getMessages,
	getOrders,
	completeOrder,
	markMessageAsRead,
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

// Get orders
router.get('/orders', getOrders);

// Deliver orders
router.patch('/orders/:id', completeOrder);

// Mark message as read
router.patch('/messages/:id', markMessageAsRead);
module.exports = router;
