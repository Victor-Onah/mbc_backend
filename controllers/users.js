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
					let { name, phoneNumber, order } = fields;
					await Order.create({
						name: name[0],
						phoneNumber: phoneNumber[0],
						order: order[0],
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
module.exports = { sendMessage, placeOrder };
