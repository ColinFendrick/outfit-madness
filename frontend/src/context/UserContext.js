import { useState, createContext, useEffect } from 'react';

import http from '../http-common';

const UserContext = createContext([{}, () => {}]);

const UserProvider = props => {
	const [currentUser, setCurrentUser] = useState(null);
	const [headersReady, setHeadersReady] = useState(false);

	useEffect(
		() => {
			if (currentUser?.accessToken) {
				http.defaults.headers.common['x-access-token'] = currentUser.accessToken;
				setHeadersReady(true);
			}
		},
		[currentUser]
	);

	return (
		<UserContext.Provider value={[
			{ currentUser, headersReady },
			setCurrentUser
		]}>
			{props.children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
