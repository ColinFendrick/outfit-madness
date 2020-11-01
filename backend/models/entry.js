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
	},
	bracket: {
		type: String,
		enum: ['celebrities-2000', 'celebrities-contemporary', 'rap-rb-musicians', 'athletes']
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
