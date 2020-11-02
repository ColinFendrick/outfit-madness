import { Switch, Link, Route } from 'react-router-dom';

import { AddEntry, Bracket, Vote } from './components';
import { ModalContainer } from './containers';
import useLocalContext from './hooks/useLocalContext';

const App = () => {
	const { uiState } = useLocalContext();
	const currentUser = true;

	return (
		<>
			<div>
				<nav className = 'navbar navbar-expand navbar-dark bg-dark'>
					<a href = '/tutorials' className = 'navbar-brand'>
					Vote on the Outfits
					</a>
					<div className = 'navbar-nav mr-auto'>
						{currentUser ? (
							<>
								<li className = 'nav-item'>
									<Link to ={'/vote'} className = 'nav-link'>
									Go Vote!
									</Link>
								</li>

								<li className = 'nav-item'>
									<Link to = {'/add'} className = 'nav-link'>
									Add Entry
									</Link>
								</li>

								<li className = 'nav-item'>
									<Link to ={'/bracket'} className = 'nav-link'>
									View Bracket
									</Link>
								</li>

								<li className = 'nav-item'>
									<Link to ={'/profile'} className = 'nav-link'>
									Profile
									</Link>
								</li>

							</>
						) : (
							<>
								<li className = 'nav-item'>
									<Link to ={'/login'} className = 'nav-link'>
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

				<div className = 'container mt-3' >
					<Switch>
						<Route path='/bracket' component={Bracket} />
						<Route path='/vote' component={Vote} />
						<Route path='/add' component={AddEntry} />
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
