const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const productSchema = new mongoose.Schema({
	name: String,
	description: {
		type: String,
		default: 'No description available for this product',
	},
	price: Number,
	id: {
		type: String,
		default: () => uuid(),
	},
	image: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
