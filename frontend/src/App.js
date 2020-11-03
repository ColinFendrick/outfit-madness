import { useEffect } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import {
	Register,
	Login,
	Bracket,
	Vote
} from './components';
import { ModalContainer } from './containers';
import useLocalContext from './hooks/useLocalContext';
import useUserContext from './hooks/useUserContext';

const App = () => {
	const { currentUser, getAndSetUser, logOut } = useUserContext();
	const { uiState } = useLocalContext();

	useEffect(
		() => void getAndSetUser(),
		[] // eslint-disable-line
	);

	return (
		<>
			<div>
				<nav className='navbar navbar-expand navbar-dark bg-dark'>
					<a href='/vote' className='navbar-brand'>
						Vote on the Outfits
					</a>
					<div className='navbar-nav mr-auto'>
						{currentUser ? (
							<>

								<li className='nav-item'>
									<Link to={'/bracket'} className='nav-link'>
										View Bracket
									</Link>
								</li>

								<li className='nav-item'>
									<Link to={'/profile'} className='nav-link'>
										Profile
									</Link>
								</li>

								<button
									className='btn btn-outline-secondary'
									type='button'
									onClick={logOut}
								>Log out</button>

							</>
						) : (
							<>
								<li className='nav-item'>
									<Link to={'/login'} className='nav-link'>
										Login
									</Link>
								</li>

								<li className='nav-item'>
									<Link to={'/register'} className='nav-link'>
										Sign Up
									</Link>
								</li>
							</>
						)}
					</div>
				</nav>

				<div className='container mt-3'>
					<Switch>
						<Route exact path='/register' component={Register} />
						<Route path='/bracket' component={Bracket} />
						<Route path='/vote' component={Vote} />
						<Route path={['/', '/login']} component={Login} />
					</Switch>
				</div>
			</div>

			{uiState.modalChildren ? (
				<ModalContainer>
					{uiState.modalChildren}
				</ModalContainer>
			) : null}
		</>
	);
};

export default App;
