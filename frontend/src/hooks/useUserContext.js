import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import AuthService from '../services/AuthService';

const useUserContext = () => {
	const [{ currentUser, headersReady }, setCurrentUser] = useContext(UserContext);
	const history = useHistory();

	const getAndSetUser = async () => {
		const user = await AuthService.getCurrentUser();

		if (user) {
			setCurrentUser(user);
		} else {
			if (history.location.pathname !== '/login') {
				history.push('/login');
				window.location.reload();
			}
		}
	};

	const logOut = async () => {
		await AuthService.logout();
		window.location.reload();
	};

	const checkHeaders = ({ method, errorMethod, cb }) => async (data = null) => {
		if (headersReady) {
			try {
				const res = await method(data);
				if (cb) {
					cb(res?.data);
				} else {
					return res;
				}
			} catch (e) {
				if (errorMethod) {
					errorMethod(e.message);
				} else {
					throw new Error(e);
				}
			}
		}
	};

	return {
		currentUser,
		setCurrentUser,
		getAndSetUser,
		logOut,
		headersReady,
		checkHeaders
	};
};

export default useUserContext;
