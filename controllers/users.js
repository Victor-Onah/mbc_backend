const Message = require('../models/message');
const Order = require('../models/order');

// Send message
const sendMessage = async (req, res, next) => {
	try {
		let { content, senderID, phoneNumber, name } = req.body;
		await Message.create({
			content,
			senderID,
			phoneNumber,
			name,
		});
		res.json({ success: true });
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};

// Send message
const placeOrder = async (req, res, next) => {
	try {
		let { order, phoneNumber, name } = req.body;
		await Order.create({
			phoneNumber,
			name,
			order,
		});
		res.json({ success: true });
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};
module.exports = { sendMessage, placeOrder };
