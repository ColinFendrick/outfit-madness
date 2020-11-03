const User = require('../models/user.model');

const confirmAdmin = async (req, res, next) => {
	console.log('confirmadmin', req.userId);

	try {
		const user = await User.findById(req.userId);

		if (user.role !== 'admin') {
			return res.status(403).send({
				message: 'You do not have the required permissions to perform this operation.'
			});
		}
		next();
	} catch (error) {
		res.status(500).send({
			message: 'Failed to find your user credentials. Try logging out and logging in.'
		});
	}
};

module.exports = {
	confirmAdmin
};
