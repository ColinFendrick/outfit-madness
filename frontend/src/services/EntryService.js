import http from '../http-common';

const healthCheck = () => http.get('/');

const getAll = () => http.get('/entries');

const update = data => http.put(`/entries/${data._id}`, data);

const add = data => http.post('/entries', data);

const service = {
	healthCheck,
	getAll,
	add,
	update
};

export default service;
