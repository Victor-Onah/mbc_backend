const Product = require('../models/product');

// Get all products
const getProducts = async (req, res, next) => {
	try {
		const products = await Product.find({});
		res.json({ success: true, data: [...products] });
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};

// Get single product
const getSingleProduct = async (req, res, next) => {
	let { productID } = req.params;
	try {
		let requestedProduct = await Product.findOne({ id: productID });
		res.json({ success: true, data: { ...requestedProduct._doc } });
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};

module.exports = { getProducts, getSingleProduct };
