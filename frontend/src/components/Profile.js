import { useState, useEffect } from 'react';

import { useUserContext, useLocalContext } from '../hooks';
import { EditUserModal } from './modals';
import { bracketEnums } from '../constants/brackets';

const Profile = () => {
	const { currentUser, getAndSetUser, logOut } = useUserContext();
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

					{currentUser?.role === 'admin' && (
						<>
							<h4>Current Voting Position</h4>
							<div>Matchup: {currentUser.voting.currentSeed[0]} vs. {currentUser.voting.currentSeed[1]}</div>
							<div>Bracket: {bracketEnums[currentUser.voting.bracket]}</div>
							<br />
						</>
					)}
					<button className='btn btn-warning'
						onClick={() => toggleModal(<EditUserModal user={currentUser} />)()}
					>
            Edit
					</button>
					<br />
					<br />
					<button className='btn btn-danger' onClick={logOut}>
            Logout
					</button>
				</div>
			)}
		</>
	);
};

export default Profile;
