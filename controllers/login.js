const User = require('../models/user');

const login = async (req, res, next) => {
	try {
		let { email, password } = req.body;
		let requestor = await User.findOne({ email });
		if (!requestor) {
			return res.json({
				success: false,
				message: 'No user exists with  this email, please create an account',
			});
		}
		let isPasswordValid = await requestor.validatePassword(password);
		if (!isPasswordValid) {
			return res.json({
				success: false,
				message: 'Incorrect password',
			});
		}
		res.json({
			success: true,
			data: { ...requestor._doc },
		});
	} catch (error) {
		res.json({
			success: false,
			message: 'An unexpected error occurred',
		});
		next(error);
	}
};
module.exports = login;
