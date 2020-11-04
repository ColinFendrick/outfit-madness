import { useState, useEffect } from 'react';

import useUserContext from '../hooks/useUserContext';
import useLocalContext from '../hooks/useLocalContext';
import { EditUserModal } from './modals';


const Profile = () => {
	const { currentUser, getAndSetUser } = useUserContext();
	const { toggleModal } = useLocalContext();
	const [error] = useState('');

	useEffect(
		() => void getAndSetUser(),
		[] // eslint-disable-line
	);

	return (
		<>
			{error ? (
				<div>
					<h2>{error}</h2>
				</div>
			) : (
				<div>
					{currentUser?.username}

					<button className='btn btn-warning'
						onClick={() => toggleModal(<EditUserModal user={currentUser} />)()}
					>
            Edit
					</button>
				</div>
			)}
		</>
	);
};

export default Profile;
