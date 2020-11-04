import { useState, useEffect } from 'react';

import { useUserContext, useLocalContext } from '../hooks';
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
					<h4>Username:</h4>
					<div>{currentUser?.username}</div>
					<br />

					<h4>Email:</h4>
					<div>{currentUser?.email}</div>
					<br />

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
