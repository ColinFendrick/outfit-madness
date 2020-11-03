const User = require('../models/user.model');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
	if (!req.body.username) {
		return res.status(400).send({
			message: 'Username is required'
		});
	}

	if (!req.body.email) {
		return res.status(400).send({
			message: 'Email is required'
		});
	}

	if (!req.body.password) {
		return res.status(400).send({
			message: 'Password is required'
		});
	}

	try {
		const userByUsername = await User.findOne({
			where: {
				username: req.body.username
			}
		});

		if (userByUsername) {
			return res.status(400).send({
				message: 'Failed: Username is already in use'
			});
		}

		const userByEmail = await User.findOne({
			where: {
				email: req.body.email
			}
		});

		if (userByEmail) {
			return res.status(400).send({
				message: 'Failed: Email is already in use'
			});
		}

		next();
	} catch (e) {
		res.status(500).send({
			message: `Something when wrong trying to verify fresh username/email: ${e}`
		});
	}
};

module.exports = {
	checkDuplicateUsernameOrEmail
};
