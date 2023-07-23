const Message = require('../models/message');
const Order = require('../models/order');
const Product = require('../models/product');
const { readFileSync } = require('fs');

// Upload product
const uploadProduct = async (req, res, next) => {
	await import('formidable')
		.then((module) => {
			let form = new module.IncomingForm({
				keepExtensions: true,
			});
			form.parse(req, async (error, fields, files) => {
				if (error) {
					return res.json({
						success: false,
						message: 'An unexpected error occurred',
					});
				}
				try {
					let { image } = files;
					let raw = readFileSync(image[0].filepath);
					let { name, price, description } = fields;
					await Product.create({
						name: name[0],
						price: price[0],
						image: raw.toString('base64'),
						description: description[0],
					});
					res.json({ success: true });
				} catch (error) {
					res.json({ success: false, message: 'An unexpected error occurred' });
					next(error);
				}
			});
		})
		.catch((error) => {
			res.json({
				success: false,
				message: 'An unexpected error occurred',
			});
			next(error);
		});
};

// Delete a product
const deleteProduct = async (req, res, next) => {
	try {
		let { productID } = req.params;
		await Product.findOneAndDelete({ id: productID });
		res.json({ success: true });
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};

// Update a product
const updateProduct = async (req, res, next) => {
	try {
		let { productID } = req.params;
		let { payload } = req.body;
		await Product.findOneAndUpdate({ id: productID }, { ...payload });
		res.json({ success: true });
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};

// Get messages
const getMessages = async (req, res, next) => {
	try {
		const messages = await Message.find({});
		res.json({ success: true, data: [...messages] });
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};

const getOrders = async (req, res, next) => {
	try {
		const messages = await Order.find({});
		res.json({ success: true, data: [...messages] });
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};

module.exports = {
	uploadProduct,
	deleteProduct,
	updateProduct,
	getMessages,
	getOrders,
};
