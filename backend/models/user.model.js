const mongoose = require('mongoose');

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
	}
});

// hash user password before saving into database
// userSchema.pre('save', function (next) {
// 	this.password = bcrypt.hashSync(this.password, 8);
// 	next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
