import http from '../http-common';

const healthCheck = () => http.get('/');

const getAll = () => http.get('/entries');

const update = data => http.put(`/entries/${data._id}`, data);

const add = data => http.post('/entries', data);

const deleteEntry = data => http.delete(`/entries/${data._id}`);

const deleteAll = () => http.delete('/entries');

const service = {
	healthCheck,
	getAll,
	add,
	update,
	deleteEntry,
	deleteAll
};

export default service;
