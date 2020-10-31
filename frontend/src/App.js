import {
	Switch,
	Link,
} from 'react-router-dom';

const App = () => {
	const currentUser = true;

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
								<Link to = {'/tutorials'} className = 'nav-link'>
									Tutorials
								</Link>
							</li>
							<li className = 'nav-item'>
								<Link to = {'/add'} className = 'nav-link'>
									Add
								</Link>
							</li>
							<li className = 'nav-item'>
								<Link to ={'/adduser'} className = 'nav-link'>
									Add a User
								</Link>
							</li>
							<li className = 'nav-item'>
								<Link to ={'/users'} className = 'nav-link'>
									All Users
								</Link>
							</li>
							<li className = 'nav-item'>
								<Link to ={'/users/uninsured'} className = 'nav-link'>
									Uninsured
								</Link>
							</li>
							<li className = 'nav-item'>
								<Link to ={'/users/insured'} className = 'nav-link'>
									Insured
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
