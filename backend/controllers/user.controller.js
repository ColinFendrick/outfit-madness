const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const admin = require('../.admin');

const sendUserAndToken = user => (req, res) => {
	const accessToken = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: 86400 });

	res.send({
		id: user._id,
		username: user.username,
		email: user.email,
		role: user.role,
		voting: user.voting,
		accessToken
	});
};

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

		sendUserAndToken(user)(req, res);
	} catch (e) {
		res.status(400).send(e);
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) return res.status(404).send({ message: `Cannot find user ${req.params.id}` });

		sendUserAndToken(user)(req, res);
	} catch (e) {
		res.status(400).send(e);
	}
};

const updateUser = async (req, res) => {
	let body = {};
	try {
		if (req.body.password) {
			body['password'] = bcrypt.hashSync(req.body.password, 8);
		}
		body = {
			...req.body,
			...body
		};

		const user = await User.findByIdAndUpdate(
			req.params.id, body, { new: true }
		);

		if (!user) return res.status(404).send({ message: `Cannot find user ${user.name}` });
		console.log(user);
		sendUserAndToken(user)(req, res);
	} catch (e) {
		res.status(400).send(e);
	}
};

// admin:
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		if (!users || !users.length) return res.status(404).send({ message: 'No users found' });

		res.send(users);
	} catch (e) {
		res.status(400).send(e);
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findOneAndDelete({
			_id : req.params.id
		});

		if (!user) return res.status(404).send({ message: `Cannot find user ${req.params.id}` });

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
	getUser,
	updateUser,

	// admin:
	getAllUsers,
	deleteUser,
	deleteAllUsers
};
