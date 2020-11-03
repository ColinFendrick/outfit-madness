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
		const response = await http.post('/authenticate', {
			username,
			email,
			password
		});
		if (response.data.accessToken) {
			localStorage.setItem('user', JSON.stringify(response.data));
		}
		return response;
	} catch (e) {
		return e;
	}
};

const logout = () => localStorage.removeItem('user');

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

// admin:
const getAllUsers = () => http.get('/admin/users');

const deleteUser = data => http.delete(`/admin/users/${data._id}`);

const auth = {
	register,
	login,
	logout,
	getCurrentUser,

	// admin:
	getAllUsers,
	deleteUser
};

export default auth;
