import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import AuthService from '../services/AuthService';
import { emailRegex } from '../constants/regex';

const Login = props => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const { register, handleSubmit, errors, setError } = useForm({
		username: '', email: '', password: ''
	});

	const handleLogin = async data => {

		if (!data.username && !data.email) {
			setError('username', {
				type: 'bothEmpty', message: 'Either Username or Email is required'
			});
			setError('email', {
				type: 'bothEmpty', message: 'Either Username or Email is required'
			});
			return;
		}
		setMessage('');
		setLoading(true);

		try {
			const res = await AuthService.login(data);
			if ([400, 401, 404].includes(res.status)) {
				setMessage(res.data.message);
				setLoading(false);
				return;
			} else {
				props.history.push('/tutorials');
				window.location.reload();
			}
		} catch (e) {
			const resMessage = e.response.data.message.toString() || 'An error has occured';
			setLoading(false);
			setMessage(resMessage);
		}
	};

	return (
		<div className='col-md-12'>
			<div className='card card-container'>

				<form onSubmit={handleSubmit(handleLogin)}>

					<div className='form-group'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							className='form-control'
							id='username'
							ref={register()}
							defaultValue=''
							name='username' />
						{errors.username?.type && errors.username?.message}
					</div>

					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							className='form-control'
							id='email'
							ref={register({ pattern: emailRegex })}
							defaultValue=''
							name='email' />
						{errors.email?.type === 'bothEmpty' && errors.email?.message}
						{errors.email?.type === 'pattern' && 'Has to be a valid email'}
					</div>

					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							className='form-control'
							id='password'
							ref={register({ required: true, min: 8 })}
							defaultValue=''
							name='password' />
						{errors.password?.type === 'required' && 'Your input is required'}
						{errors.multipleErrorInput?.type === 'min' && 'Must be at least 8 characters'}
					</div>

					<div className='form-group'>
						<button
							className='btn btn-primary btn-block'
							disabled={loading}
							type='submit'>
							{loading ? (
								<span className='spinner-border spinner-border-sm'></span>
							) : (
								<span>Login</span>
							)}
						</button>
					</div>

					{message && (
						<div className='form-group'>
							<div className='alert alert-danger' role='alert'>
								{message}
							</div>
						</div>
					)}

				</form>
			</div>
		</div>
	);
};

export default Login;
