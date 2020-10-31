import http from '../http-common';

const healthCheck = () => http.get('/');

const getAll = () => http.get('/entries');

const update = (id, data) => http.put(`/entries/${id}`, data);

const service = {
	healthCheck,
	getAll,
	update
};

export default service;
