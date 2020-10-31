const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	imageURL: {
		type: String,
		required: true
	},
	votes: {
		type: Number,
		default: 0,
		required: true
	}
}, {  timestamps: true });

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
