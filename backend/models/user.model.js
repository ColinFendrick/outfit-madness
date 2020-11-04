const mongoose = require('mongoose');
const brackets = require('../enums/brackets');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	role: {
		type: String,
		immutable: true
	},
	voting: {
		currentSeed: {
			type: [Number],
			default: [1, 16],
			validate(value) {
				if (value.length !== 2) {
					throw new Error('Your seed data has been corrupted');
				}
			}
		},
		bracket: {
			type: String,
			default: brackets[0],
			enum: brackets
		}
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
