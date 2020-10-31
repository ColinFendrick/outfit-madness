import http from '../http-common';

const healthCheck = () => http.get('/');

const getAll = () => http.get('/entries');

const service = {
	healthCheck,
	getAll
};

export default service;
