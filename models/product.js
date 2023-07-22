const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const productSchema = new mongoose.Schema({
	name: String,
	description: {
		type: String,
		default: 'No description available for this product',
	},
	inStock: {
		type: Boolean,
		default: true,
	},
	price: Number,
	id: {
		type: String,
		default: uuid(),
	},
	image: String,
	discount: {
		type: Number,
		default: 0,
	},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
