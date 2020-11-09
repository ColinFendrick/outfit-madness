
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';

import { useUserContext, useLocalContext } from '../../hooks';

import { brackets, bracketEnums } from '../../constants/brackets';

const EditUserModal = ({ user }) => {
	const { toggleModal } = useLocalContext();
	const {
		currentUser,
		checkHeadersBefore,
		setCurrentUser,
		updateCurrentUser,
		logOut
	} = useUserContext();
	const [state, setState] = useState({ submitted: false, error: '' });
	const { register, handleSubmit, errors, setError, reset, watch } = useForm(user);

	const resetForm = () => {
		reset({ user });
		setState({ submitted: false, error: '' });
	};

	const onSubmit = async ({ validateNewPassword, ...data }) => {
		if (data.newPassword && data.newPassword !== validateNewPassword) {
			return setError('newPassword', {
				type: 'mismatch', message: 'New Passwords do not match'
			});
		}
		const updatedData = { ...data };
		if (data?.voting?.currentSeed) { // TODO:  I don't love this...
			updatedData.voting.currentSeed = data.voting.currentSeed.split(' ').map(str => parseInt(str));
		}

		if (data.username) updatedData.username = data.username.toLowerCase();

		checkHeadersBefore({
			method: updateCurrentUser,
			errorMethod: error => setState({ ...state, error }),
			cb: user => {
				if (data.newPassword !== '') {
					return logOut();
				} else {
					setCurrentUser(user);
					localStorage.setItem('user', JSON.stringify(user));
					toggleModal()();
				}

			}
		})({ ...updatedData, _id: currentUser.id });
	};

	const watchNewPassword = watch('newPassword');


	return (
		<>
			<ModalHeader toggle={() => toggleModal()()}>
				Updating {user.username}
			</ModalHeader>
			{state.error ? (
				<ModalBody>
					<div>
						<h2>{state.error}</h2>
						<button className='btn btn-success' type='button' onClick={resetForm}>
							Try Again
						</button>
					</div>
				</ModalBody>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalBody>
						<div className='submit-form'>

							<label htmlFor='username'>Name</label>
							<input
								type='text'
								className='form-control'
								id='username'
								required
								ref={register({ required: true })}
								defaultValue={user['username']}
								name='username'
								autoComplete='username'
							/>
							{errors.username && 'Username cannot be blank'}
							<br />

							<label htmlFor='oldPassword'>Old Password</label>
							<input
								type='password'
								className='form-control'
								id='oldPassword'
								required
								ref={register({ required: true })}
								name='oldPassword'
								autoComplete='new-password'
							/>
							{errors.oldPassword && 'Please input your old password'}
							<br />

							<label htmlFor='newPassword'>New Password</label>
							<input
								type='password'
								className='form-control'
								id='newPassword'
								ref={register()}
								name='newPassword'
								autoComplete='new-password'
							/>
							{errors.newPassword && errors.newPassword.message}
							<br />

							<label htmlFor='validateNewPassword' className={`${!watchNewPassword ? 'disabled-label' : ''}`}>
								Please Re-Enter New Password
							</label>
							<input
								type='password'
								className='form-control'
								id='validateNewPassword'
								name='validateNewPassword'
								autoComplete='new-password'
								disabled={!watchNewPassword}
								ref={register()}
							/>
							<br />

							{currentUser?.role === 'admin' && (
								<>
									<label htmlFor='voting.currentSeed'>Current Seed</label>
									<select name='voting.currentSeed' ref={register}>
										<option value='1 16'>1 :: 16</option>
										<option value='2 15'>2 :: 15</option>
										<option value='3 14'>3 :: 14</option>
										<option value='4 13'>4 :: 13</option>
										<option value='5 12'>5 :: 12</option>
										<option value='6 11'>6 :: 11</option>
										<option value='7 10'>7 :: 10</option>
										<option value='8 9'>8 :: 9</option>
									</select>
									<br />

									<label htmlFor='voting.bracket'>Bracket</label>
									<select
										name='voting.bracket'
										defaultValue={currentUser?.voting?.bracket}
										ref={register}
									>
										{brackets.map(bracket => (
											<option
												key={`${bracket}-editmodal`}
												value={bracket}
											>
												{bracketEnums[bracket]}
											</option>
										))}
									</select>
									<br />
								</>
							)}
						</div>

					</ModalBody>

					<ModalFooter>
						<button className='btn btn-success' type='submit'>
							Save
						</button>

						<button className='btn btn-warning' onClick={resetForm} type='button'>
							Reset Changes
						</button>
					</ModalFooter>

				</form>
			)}
		</>
	);
};

export default EditUserModal;
