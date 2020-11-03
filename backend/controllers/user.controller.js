const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const admin = require('../.admin');

const createUser = async (req, res, next) => {
	const role = admin.adminUsers.includes(req.body.email) ? 'admin' : 'user';
	try {
		const user = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			role
		});
		await user.save();
		res.status(200).send({ message: `User ${user.username} created` });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
};

const authenticateUser = async (req, res) => {
	try {
		const user = req.body.username ?
			await User.findOne({ username: req.body.username }) :
			await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).send({
				message: 'User Not found'
			});
		}

		const passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: 'Invalid Password'
			});
		}

		const accessToken = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: 86400 });

		res.send({
			id: user._id,
			username: user.username,
			email: user.email,
			role: user.role,
			accessToken
		});

	} catch (e) {
		res.status(400).send(e);
	}
};

// admin:
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		// .select({
		// 	'username': 1, 'email': 1, password: 0, '_id': 1
		// });
		res.send(users);
	} catch (e) {
		res.status(500).send(e);
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findOneAndDelete({
			_id : req.params.id
		});

		if (!user) res.status(404).send({ message: `Cannot find user ${req.params.id}` });

		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
};

const deleteAllUsers = async (req, res) => {
	try {
		await User.deleteMany();
		res.send({ message: 'All users have been deleted' });
	} catch (e) {
		res.status(400).send(e);
	}
};
module.exports = {
	createUser,
	authenticateUser,

	// admin:
	getAllUsers,
	deleteUser,
	deleteAllUsers
};
