import { useState } from 'react';

import useEntryContext from '../hooks/useEntryContext';

const Add = () => {
	const emptyEntry = { name: '', imageURL: '', bracket: 'athletes', seed: 1 };
	const { addEntry } = useEntryContext();
	const [state, setState] = useState({ entry: emptyEntry, submitted: false, error: '' });

	const handleInputChange = event => {
		const {
			name,
			value
		} = event.target;

		setState({ ...state, entry: { ...state.entry, [name]: value }});
	};

	const newEntry = () => setState({ ...state, entry: emptyEntry, submitted: false, error: '' });

	const handleSubmit = async () => {
		try {
			await addEntry(state.entry);
			setState({ ...state, entry: emptyEntry, submitted: true, error: '' });
		} catch (e) {
			setState({ ...state, error: e.message, submitted: true });
		}
	};

	return (
		<div className='submit-form'>
			{state.submitted && !state.error ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className='btn btn-success' onClick={newEntry}>
            Add
					</button>
				</div>
			) : state.submitted && state.error ? (
				<div>
					<h2>{state.error}</h2>
					<button className='btn btn-success' onClick={newEntry}>
            Try Again
					</button>
				</div>
			) : (
				<div>
					<div className='form-group'>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							className='form-control'
							id='name'
							required
							value={state.entry.name}
							onChange={handleInputChange}
							name='name'
						/>

						<label htmlFor='imageURL'>Image URL</label>
						<input
							type='text'
							className='form-control'
							id='imageURL'
							required
							value={state.entry.imageURL}
							onChange={handleInputChange}
							name='imageURL'
						/>

						<label htmlFor='seed'>Seed</label>
						<input
							type='number'
							className='form-control'
							id='seed'
							required
							value={state.entry.seed}
							onChange={handleInputChange}
							name='seed'
							min='1'
							max='16'
						/>

						<div className='form-check form-check-inline'>
							<label className='form-check-label'>
								<input
									className='form-check-input'
									type='radio'
									name='bracket'
									id='bracket-celeb-2000'
									value='celebrities-2000'
									onChange={handleInputChange}
									checked={state.entry.bracket === 'celebrities-2000'}
								/> 2000s Celebrities
							</label>
						</div>
						<div className='form-check form-check-inline'>
							<label className='form-check-label'>
								<input
									className='form-check-input'
									type='radio'
									name='bracket'
									id='bracket-celeb-contemp'
									value='celebrities-contemporary'
									onChange={handleInputChange}
									checked={state.entry.bracket === 'celebrities-contemporary'}
								/> Contemporary Celebrities
							</label>
						</div>
						<div className='form-check form-check-inline disabled'>
							<label className='form-check-label'>
								<input
									className='form-check-input'
									type='radio'
									name='bracket'
									id='bracket-music'
									value='rap-rb-musicians'
									onChange={handleInputChange}
									checked={state.entry.bracket === 'rap-rb-musicians'}
								/> Hip-Hop/R&B Musicians
							</label>
						</div>

						<div className='form-check form-check-inline disabled'>
							<label className='form-check-label'>
								<input
									className='form-check-input'
									type='radio'
									name='bracket'
									id='bracket-athletes'
									value='athletes'
									onChange={handleInputChange}
									checked={state.entry.bracket === 'athletes'}
								/> Athletes
							</label>
						</div>
					</div>

					<button onClick={handleSubmit} className='btn btn-success'>
            Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default Add;
