const Product = require('../models/product');
const User = require('../models/user');

// Update cart
const updateCart = async (req, res, next) => {
	try {
		let { productID, userID } = req.params;
		let product = await Product.findOne({ id: productID });
		if (!product) {
			return res.json({
				success: false,
				message: 'Unable to complete request, because product was not found!',
			});
		}
		let requestor = await User.findOne({ id: userID });
		if (!requestor) {
			return res.json({
				success: false,
				message:
					'Unable to complete request, because the server could not recognize your ID. Please sign up or login to continue',
			});
		}
		let { cart } = requestor._doc;

		// Check if the product has been added to cart
		let productIndex = Array.from(cart).findIndex(
			(product) => product.id === productID
		);

		// Update the cart if the product is not in the cart
		if (productIndex === -1) {
			cart.push({ ...product, quantity: 1 });
			let updatedUser = await User.findOneAndUpdate({ id: userID }, { cart });
			if (!updatedUser) {
				return res.json({
					success: false,
					message:
						'Unable to complete request, because the server could not recognize your ID. Please sign up or login to continue',
				});
			}
			return res.json({
				success: true,
				data: { ...updatedUser._doc },
			});
		}

		// Update the product quantity if the product is already in the cart
		cart[productIndex].quantity += 1;
		let updatedUser = await User.findOneAndUpdate({ id: userID }, { cart });
		if (!updatedUser) {
			return res.json({
				success: false,
				message:
					'Unable to complete request, because the server could not recognize your ID. Please sign up or login to continue',
			});
		}
		return res.json({
			success: true,
			data: { ...updatedUser._doc },
		});
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};

module.exports = { updateCart };
