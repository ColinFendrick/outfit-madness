const mongoose = require('mongoose');

const brackets = require('../enums/brackets');

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
	},
	bracket: {
		type: String,
		enum: brackets
	},
	seed: {
		type: Number,
		validate(value) {
			if (value < 1 || value > 16) {
				throw new Error('Seed must be between one and sixteen');
			}
		}
	}
}, {  timestamps: true });

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
