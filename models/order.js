const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const orderSchema = new mongoose.Schema({
	name: String,
	order: Array,
	phoneNumber: Number,
	id: {
		type: String,
		default: () => uuid(),
	},
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
