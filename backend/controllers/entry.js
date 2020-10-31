const Entry = require('../models/entry');

const getAllEntries = async (req, res) => {
	try {
		const entries = await Entry.find();
		res.send(entries);
	} catch (e) {
		res.status(500).send(e);
	}
};

const createEntry = async (req, res) => {
	try {
		const entry = new Entry(req.body);
		await entry.save();
		res.status(201).send(entry);
	} catch (e) {
		res.status(400).send(e);
	}
};

const voteOnEntry = async (req, res) => {
	try {
		const entry = await Entry.findByIdAndUpdate(
			req.params.id, req.body, { useFindAndModify: false }
		);
		res.send({ message: `Entry ${entry.id} was updated successfully.` });
	} catch (e) {
		res.status(404).send(e);
	}
};

module.exports = {
	getAllEntries,
	createEntry,
	voteOnEntry
};
