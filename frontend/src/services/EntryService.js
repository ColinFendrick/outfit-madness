import http from '../http-common';

const healthCheck = () => http.get('/');

const getAll = () => http.get('/entries');

const getById = data => http.get(`/entries/${data._id}`);

const update = data => http.put(`/entries/${data._id}`, data);

const add = data => http.post('/admin/entries', data);

const deleteEntry = data => http.delete(`/admin/entries/${data._id}`);

const deleteAllEntries = () => http.delete('/admin/entries');

const deleteBracket = bracket => http.delete(`/admin/entries/bracket/${bracket}`);

const service = {
	healthCheck,
	getAll,
	getById,
	update,

	// admin:
	add,
	deleteEntry,
	deleteAllEntries,
	deleteBracket
};

export default service;
