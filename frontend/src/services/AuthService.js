import http from '../http-common';

const register = ({
	username,
	email,
	password
}) => http.post('/register', {
	username,
	email,
	password
});

const login = async ({
	username,
	email,
	password
}) => {
	try {
		const res = await http.post('/authenticate', {
			username,
			email,
			password
		});
		if (res.data.accessToken) {
			localStorage.setItem('user', JSON.stringify(res.data));
		}
		return res;
	} catch (e) {
		return e;
	}
};

const logout = () => localStorage.removeItem('user');

const getLocalUser = () => JSON.parse(localStorage.getItem('user'));

const getUserById = data => http.get(`/users/${data._id}`);

const updateCurrentUser = data => http.put(`/users/${data._id}`, data);

// admin:
const getAllUsers = () => http.get('/admin/users');

const deleteUser = data => http.delete(`/admin/users/${data._id}`);

const auth = {
	register,
	login,
	logout,
	getLocalUser,
	getUserById,
	updateCurrentUser,

	// admin:
	getAllUsers,
	deleteUser
};

export default auth;
