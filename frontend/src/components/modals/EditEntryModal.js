import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';

import useLocalContext from '../../hooks/useLocalContext';
import useEntryContext from '../../hooks/useEntryContext';
import { brackets } from '../../constants/brackets';

const defaultValues = { name: '', imageURL: '', bracket: brackets[0], seed: 1 };

const EditEntryModal = ({ entry = defaultValues, reload }) => {
	const { toggleModal } = useLocalContext();
	const { editEntry, addEntry } = useEntryContext();
	const [state, setState] = useState({ submitted: false, error: '' });
	const { register, handleSubmit, errors, reset } = useForm(entry);

	const clearForm = () => {
		reset({ entry });
		setState({ submitted: false, error: '' });
	};

	const onSubmit = async data => {
		try {
			if (entry._id) {
				await editEntry({ ...data, _id: entry._id });
			} else {
				await addEntry(data);
			}
			await reload();
			toggleModal()();
		} catch (e) {
			setState({ error: e.message });
		}
	};

	return (
		<>
			<ModalHeader toggle={() => toggleModal()()}> {entry._id ? `Edit ${entry.name}` : 'Add Entry'}</ModalHeader>
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

							<label htmlFor='name'>Name</label>
							<input
								type='text'
								className='form-control'
								id='name'
								required
								ref={register({ required: true })}
								defaultValue={entry['name']}
								name='name'
							/>
							{errors.name && 'Name of entry is required'}

							<label htmlFor='imageURL'>Image URL</label>
							<input
								type='text'
								className='form-control'
								id='imageURL'
								required
								ref={register({ required: true })}
								defaultValue={entry['imageURL']}
								name='imageURL'
							/>
							{errors.imageURL && 'Must provide a path to the hosted image'}

							<label htmlFor='seed'>Seed</label>
							<input
								type='number'
								className='form-control'
								id='seed'
								required
								ref={register({ required: true, min: 1, max: 16 })}
								defaultValue={entry['seed']}
								name='seed'
							/>
							{errors.seed?.type === 'required' && 'This field cannot be blank'}
							{(errors.seed?.type === 'min' || errors.seed?.type === 'max') && 'Must be a number between 1 and 16'}

							<section>
								<label htmlFor='bracket'>Bracket</label>
								<div className='form-check'>
									<input
										name='bracket'
										type='radio'
										value={brackets[0]}
										ref={register({ required: true })}
										defaultChecked={entry['bracket'] === brackets[0]}
									/>
									1990s-2000s Celebrities
								</div>

								<div className='form-check'>
									<input
										name='bracket'
										type='radio'
										value={[brackets[1]]}
										ref={register({ required: true })}
										defaultChecked={entry['bracket'] === brackets[1]}
									/>
									Contemporary Celebrities
								</div>

								<div className='form-check'>
									<input
										name='bracket'
										type='radio'
										value={brackets[2]}
										ref={register({ required: true })}
										defaultChecked={entry['bracket'] === brackets[2]}
									/>
									Rap/RB Musicians
								</div>

								<div className='form-check'>
									<input
										name='bracket'
										type='radio'
										value={brackets[3]}
										ref={register({ required: true })}
										defaultChecked={entry['bracket'] === brackets[3]}
									/>
									Athletes
								</div>
							</section>

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

export default EditEntryModal;
