const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const orderSchema = new mongoose.Schema({
	name: String,
	order: String,
	phoneNumber: Number,
	id: {
		type: String,
		default: () => uuid(),
	},
	delivered: {
		type: Boolean,
		default: false,
	},
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
