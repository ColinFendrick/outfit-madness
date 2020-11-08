const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const verifyOldPassword = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId);

		const oldPasswordIsValid = bcrypt.compareSync(
			req.body.oldPassword, user.password
		);

		if (!oldPasswordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: 'Invalid Password'
			});
		}

		next();
	} catch (e) {
		res.status(500).send({
			message: 'No old password provided.'
		});
	}
};

module.exports = {
	verifyOldPassword
};
