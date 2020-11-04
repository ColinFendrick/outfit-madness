import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';

import { useUserContext, useLocalContext } from '../../hooks';
import { emailRegex } from '../../constants/regex';

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

	const clearForm = () => {
		reset({ user });
		setState({ submitted: false, error: '' });
	};

	const onSubmit = async data => {
		checkHeadersBefore({
			method: updateCurrentUser,
			errorMethod: error => setState({ ...state, error }),
			cb: user => {
				setCurrentUser(user);
				localStorage.setItem('user', JSON.stringify(user));
				toggleModal()();
			}
		})({ ...data, _id: currentUser.id });
	};

	return (
		<>
			<ModalHeader toggle={() => toggleModal()()}>
				Updating {user.name}
			</ModalHeader>
			{state.error ? (
				<ModalBody>
					<div>
						<h2>{state.error}</h2>
						<button className='btn btn-success' onClick={clearForm}>
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
						</div>

					</ModalBody>

					<ModalFooter>
						<button className='btn btn-success' type='submit'>
							Save
						</button>

						<button className='btn btn-warning' onClick={clearForm}>
							Clear
						</button>
					</ModalFooter>

				</form>
			)}
		</>
	);
};

export default EditUserModal;
