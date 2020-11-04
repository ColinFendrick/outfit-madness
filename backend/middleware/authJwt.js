const jwt = require('jsonwebtoken');

const admin = require('../.admin');
const User = require('../models/user.model');

const verifyToken = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({
			message: 'No token provided'
		});
	}

	jwt.verify(token, admin.secretKey, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: 'Unauthorized'
			});
		}
		req.userId = decoded.id;
		next();
	});
};

const isTokenSameAsTarget = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId);

		if (`${user._id}` !== req.params.id) {
			return res.status(403).send({
				message: 'You do not have permission to change another user\'s information'
			});
		}

		next();
	} catch (e) {
		res.status(500).send({
			message: 'Error occured in updating user votes. Please reload and try again.'
		});
	}
};

module.exports = {
	verifyToken,
	isTokenSameAsTarget
};
