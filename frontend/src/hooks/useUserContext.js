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

	return {
		currentUser, setCurrentUser, getAndSetUser, logOut, headersReady
	};
};

export default useUserContext;
