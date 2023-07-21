const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const messageSchema = new mongoose.Schema({
	id: {
		type: String,
		default: uuid(),
	},
	content: String,
	senderID: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
