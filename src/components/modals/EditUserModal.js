import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';

import { useUserContext, useLocalContext } from '../../hooks';
import { emailRegex } from '../../constants/regex';
import { brackets, bracketEnums } from '../../constants/brackets';

const EditUserModal = ({ user }) => {
	const { toggleModal } = useLocalContext();
	const {
		currentUser,
		checkHeadersBefore,
		setCurrentUser,
		updateCurrentUser
	} = useUserContext();
	const [state, setState] = useState({ submitted: false, error: '' });
	const { register, handleSubmit, errors, reset } = useForm(user);

	const resetForm = () => {
		reset({ user });
		setState({ submitted: false, error: '' });
	};

	const onSubmit = async data => {
		const updatedData = { ...data };
		if (data?.voting?.currentSeed) { // TODO:  I don't love this...
			updatedData.voting.currentSeed = data.voting.currentSeed.split(' ').map(str => parseInt(str));
		}

		if (data.username) updatedData.username = data.username.toLowerCase();
		if (data.email) updatedData.email = data.email.toLowerCase();

		checkHeadersBefore({
			method: updateCurrentUser,
			errorMethod: error => setState({ ...state, error }),
			cb: user => {
				setCurrentUser(user);
				localStorage.setItem('user', JSON.stringify(user));
				toggleModal()();
			}
		})({ ...updatedData, _id: currentUser.id });
	};

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
							/>
							{errors.username && 'Username cannot be blank'}
							<br />

							<label htmlFor='email'>Email</label>
							<input
								type='text'
								className='form-control'
								id='email'
								required
								defaultValue={user['email']}
								name='email'
								ref={register({ required: true, pattern: emailRegex })}
							/>
							{errors.email?.type === 'required' && 'Email is required'}
							{errors.email?.type === 'pattern' && 'Has to be a valid email'}
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
