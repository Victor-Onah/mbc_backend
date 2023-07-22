const User = require('../models/user');

const register = async (req, res, next) => {
	try {
		let { name, email, password, phoneNumber } = req.body;
		let existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({
				success: false,
				message: 'An account has been created with this email',
			});
		}
		let newUser = await User.create({
			name,
			email,
			password,
			phoneNumber,
		});
		res.json({ success: true, data: { ...newUser._doc } });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};
module.exports = register;
