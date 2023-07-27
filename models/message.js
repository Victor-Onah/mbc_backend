const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const messageSchema = new mongoose.Schema({
	id: {
		type: String,
		default: () => uuid(),
	},
	content: String,
	phoneNumber: Number,
	name: String,
	dateSent: {
		type: Date,
		default: new Date().toUTCString(),
	},
	read: {
		type: Boolean,
		default: false,
	},
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
