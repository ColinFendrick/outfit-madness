import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import AuthService from '../services/AuthService';
import { emailRegex } from '../constants/regex';

const Register = ({ history }) => {
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState('');
	const { register, handleSubmit, errors } = useForm({
		username: '', password: '', email: ''
	});

	const handleRegister = async data => {
		setMessage('');
		setSuccessful(false);

		try {
			const res = await AuthService.register(data);
			setMessage(res.data.message);
			setSuccessful(true);

			const user = res.data.user;
			setTimeout(async () => {
				if (!user.username || !user.email) {
					setMessage('Username or email data is corrupted. Try logging in below with your credentials.');
					setSuccessful(false);
				}

				try {
					const login = await AuthService.login(user);
					if ([400, 401, 404].includes(login.status)) {
						setMessage('Invalid username or information supplied. Try logging in below with your credentials.');
						setSuccessful(false);
					}

					history.push('/vote');
					window.location.reload();
				} catch (e) {
					setMessage('Could not log in automatically. Try logging in below with your credentials.');
					setSuccessful(false);
				}
			}, 2500);
		} catch (e) {
			setMessage(e.message || 'Something went wrong!');
			setSuccessful(false);
		}
	};

	return (
		<div className='col-md-8'>
			<div className='card card-container'>
				<h2>Register:</h2>
				<form onSubmit={handleSubmit(handleRegister)}>
					{!successful && (
						<div>
							<div className='form-group'>
								<label htmlFor='username'>Username</label>
								<input
									type='text'
									className='form-control'
									name='username'
									id='username'
									ref={register({ required: true, minLength: 3, maxLength: 20 })}
								/>
								{errors.username?.type === 'required' && 'Username is required'}
								{errors.username?.type === 'minLength' && 'Must be at least 3 characters'}
								{errors.usernamne?.type === 'maxLength' && 'Too long!'}
							</div>

							<div className='form-group'>
								<label htmlFor='email'>Email</label>
								<input
									type='email'
									className='form-control'
									name='email'
									id='email'
									ref={register({ required: true, pattern: emailRegex })}
								/>
								{errors.email?.type === 'required' && 'Email is required'}
								{errors.email?.type === 'pattern' && 'Has to be a valid email'}
							</div>

							<div className='form-group'>
								<label htmlFor='passsword'>Password</label>
								<input
									type='password'
									className='form-control'
									name='password'
									id='password'
									ref={register({ required: true, min: 8 })}
								/>
								{errors.password?.type === 'required' && 'Your input is required'}
								{errors.password?.type === 'min' && 'Must be at least 8 characters'}
							</div>

							<div className='form-group'>
								<button
									type='submit'
									className='btn btn-primary btn-block'>Sign Up</button>
							</div>

							<div>
								<small>
									<Link to={'/login'} className='unstyled-link'>Already registered? Click here to log in.</Link>
								</small>
							</div>
						</div>
					)}

					{message && (
						<div className='form-group'>
							<div
								className={successful ? 'alert alert-success' : 'alert alert-danger'}
								role='alert'
							>
								{message}
							</div>

							{successful && <Link to={'/login'}>
								Login
							</Link>
							}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default Register;
