import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import AuthService from '../services/AuthService';
import { brackets } from '../constants/brackets';

const useUserContext = () => {
	const [{ currentUser, headersReady }, setCurrentUser] = useContext(UserContext);
	const history = useHistory();

	const getAndSetUser = async () => {
		const user = await AuthService.getLocalUser();

		if (user) {
			setCurrentUser(user);
		} else {
			if (history.location.pathname !== '/login') {
				history.push('/login');
				window.location.reload();
			}
		}
	};

	const getUserById = async user => {
		try {
			const res = await AuthService.getUserById(user);

			if (res) {
				setCurrentUser(res);
				localStorage.setItem('user', JSON.stringify(res.data));
			}
		} catch (e) {
			throw new Error(e);
		}
	};

	const logOut = async () => {
		await AuthService.logout();
		window.location.reload();
	};

	const checkHeadersBefore = ({ method, errorMethod, cb }) => async (data = null) => {
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

	const moveToNextVote = async () => {
		const { voting: { currentSeed, bracket }, id } = currentUser;

		const handleVote = checkHeadersBefore({
			method: AuthService.updateCurrentUser,
			cb: user => {
				setCurrentUser(user);
				localStorage.setItem('user', JSON.stringify(user));
			}
		});

		if (currentSeed[0] !== 8) {
			handleVote({
				_id: id,
				voting: {
					bracket,
					currentSeed: [currentSeed[0] + 1, currentSeed[1] - 1]
				}
			});
		} else if (bracket !== brackets[3]) {
			const currentBracketIx = brackets.findIndex(el => el === bracket);
			handleVote({
				_id: id,
				voting:{
					currentSeed: [1, 16],
					bracket: brackets[currentBracketIx + 1]
				}
			});
		} else {
			handleVote({
				_id: id,
				voting: {
					currentSeed: [],
					bracket: brackets.slice(-1)[0]
				}
			});
		}
	};

	return {
		currentUser,
		setCurrentUser,
		getAndSetUser,
		getUserById,
		logOut,
		headersReady,
		checkHeadersBefore,
		moveToNextVote,
		updateCurrentUser: AuthService.updateCurrentUser
	};
};

export default useUserContext;
