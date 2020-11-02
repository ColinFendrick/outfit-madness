import http from '../http-common';

const healthCheck = () => http.get('/');

const getAll = () => http.get('/entries');

const getById = data => http.get(`/entries/${data._id}`);

const update = data => http.put(`/entries/${data._id}`, data);

const add = data => http.post('/entries', data);

const deleteEntry = data => http.delete(`/entries/${data._id}`);

const deleteAll = () => http.delete('/entries');

const service = {
	healthCheck,
	getAll,
	getById,
	add,
	update,
	deleteEntry,
	deleteAll
};

export default service;
