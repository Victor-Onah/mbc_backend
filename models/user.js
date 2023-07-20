const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	cart: {
		type: Array,
		default: [],
	},
	id: {
		type: String,
		default: uuid(),
	},
});

userSchema.pre('save', async function (next) {
	console.log(this);
	let hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

userSchema.methods.validatePassword = async function (input) {
	return await bcrypt.compare(input, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
