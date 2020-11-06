const Entry = require('../models/entry.model');

const getAllEntries = async (req, res) => {
	try {
		const entries = await Entry.find();
		res.send(entries);
	} catch (e) {
		res.status(500).send(e);
	}
};

const getEntry = async (req, res) => {
	try {
		const entry = await Entry.findById(req.params.id);

		if (!entry) return res.status(404).send({ message: 'Cannot find entry ' });

		res.send(entry);
	} catch (e) {
		res.status(500).send(e);
	}
};

const editEntry = async (req, res) => {
	try {
		const entry = await Entry.findByIdAndUpdate(
			req.params.id, req.body, { useFindAndModify: false }
		);

		if (!entry) return res.status(404).send({ message: 'Cannot find entry ' });

		res.send({ message: `Entry ${entry.id} was updated successfully.` });
	} catch (e) {
		res.status(404).send(e);
	}
};

// admin
const createEntry = async (req, res) => {
	try {
		const entry = new Entry(req.body);
		await entry.save();
		res.send(entry);
	} catch (e) {
		res.status(400).send(e);
	}
};

const deleteEntry = async (req, res) => {
	try {
		const entry = await Entry.findOneAndDelete({
			_id: req.params.id
		});

		if (!entry) res.status(404).send({ message: 'Entry not found' });

		res.send(entry);
	} catch (e) {
		res.status(400).send(e);
	}
};

const deleteAllEntries = async (req, res) => {
	try {
		await Entry.deleteMany();
		res.send({ message: 'All entries have been successfully deleteed' });
	} catch (e) {
		res.status(500).send(e);
	}
};

const deleteBracket = async (req, res) => {
	try {
		await Entry.deleteMany({ bracket: req.params.bracket });
		res.send({ message: `Delete all entries under ${req.params.bracket} ` });
	} catch (e) {
		res.status(500).send(e);
	}
};

module.exports = {
	getAllEntries,
	getEntry,
	editEntry,

	// admin:
	createEntry,
	deleteEntry,
	deleteAllEntries,
	deleteBracket
};
