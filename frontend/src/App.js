import { useEffect } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import EntryService from './services/EntryService';
import { AddEntry, Bracket, Vote } from './components';

const App = () => {
	const currentUser = true;

	useEffect(() => {
		(async () => {
			const res = await EntryService.getAll();
			console.log(res);
		})();
	});

	return (
		<div>
			<nav className = 'navbar navbar-expand navbar-dark bg-dark'>
				<a href = '/tutorials' className = 'navbar-brand'>
					Vote on the Outfits
				</a>
				<div className = 'navbar-nav mr-auto'>
					{currentUser ? (
						<>
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
					{/* <Route exact path='/register' component={Register} />
					<Route exact path='/tutorials' component={TutorialsList} />
					<Route exact path='/add' component={AddTutorial} />
					<Route path='/tutorials/:id' component={Tutorial} />
					<Route exact path='/adduser' component={AddUser} />
					<Route exact path='/users' component={UserList} />
					<Route exact path='/users/uninsured' component={Uninsured} />
					<Route exact path='/users/insured' component={Insured} />
					<Route path='/users/:id' component={User} />
					<Route path='/profile' component={Profile} />
					<Route path={['/', '/login']} component={Login} /> */}
				</Switch>
			</div>
		</div>
	);
};

export default App;
