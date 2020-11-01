import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useEntryContext from '../hooks/useEntryContext';
import brackets from '../enums/brackets';

const Add = () => {
	const defaultValues = { name: '111', imageURL: '', bracket: brackets[0], seed: 1 };
	const { addEntry } = useEntryContext();
	const [state, setState] = useState({ submitted: false, error: '' });
	const { register, handleSubmit, errors, reset, getValues } = useForm(defaultValues);


	const clearForm = () => {
		reset({ defaultValues });
		setState({ submitted: false, error: '' });
	};

	const onSubmit = async data => {
		try {
			await addEntry(data);
			reset();
			setState({ submitted: true, error: '' });
		} catch (e) {
			setState({ error: e.message, submitted: true });
		}
	};

	return (
		<div className='submit-form'>
			{state.submitted && !state.error ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className='btn btn-success' onClick={clearForm}>
            Add
					</button>
				</div>
			) : state.submitted && state.error ? (
				<div>
					<h2>{state.error}</h2>
					<button className='btn btn-success' onClick={clearForm}>
            Try Again
					</button>
				</div>
			) : (
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='form-group'>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								className='form-control'
								id='name'
								required
								ref={register({ required: true })}
								defaultValue={getValues('name')}
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
								defaultValue=''
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
								defaultValue={defaultValues['seed']}
								name='seed'
							/>
							{errors.seed?.type === 'required' && 'This field cannot be blank'}
							{(errors.seed?.type === 'min' || errors.seed?.type === 'max') && 'Must be a number between 1 and 16'}

							<br />


							<section>
								<label htmlFor='bracket'>Bracket</label>
								<div className='form-check'>
									<input
										name='bracket'
										type='radio'
										value={brackets[0]}
										ref={register({ required: true })}
										defaultChecked={defaultValues['bracket'] === brackets[0]}
									/>
									1990s-2000s Celebrities
								</div>

								<div className='form-check'>
									<input
										name='bracket'
										type='radio'
										value={[brackets[1]]}
										ref={register({ required: true })}
										defaultChecked={defaultValues['bracket'] === brackets[1]}
									/>
									Contemporary Celebrities
								</div>

								<div className='form-check'>
									<input
										name='bracket'
										type='radio'
										value={brackets[2]}
										ref={register({ required: true })}
										defaultChecked={defaultValues['bracket'] === brackets[2]}
									/>
									Rap/RB Musicians
								</div>

								<div className='form-check'>
									<input
										name='bracket'
										type='radio'
										value={brackets[3]}
										ref={register({ required: true })}
										defaultChecked={defaultValues['bracket'] === brackets[3]}
									/>
									Athletes
								</div>
							</section>


						</div>

						<button type='submit' className='btn btn-success'>
							Submit
						</button>
						{' '}
						<button type='button' className='btn btn-warning' onClick={clearForm}>
							Clear Form
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Add;
