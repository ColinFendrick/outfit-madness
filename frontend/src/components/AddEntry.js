import { useState } from 'react';

import useEntryContext from '../hooks/useEntryContext';

const Add = () => {
	const emptyEntry = { name: '', imageURL: '' };
	const { addEntry } = useEntryContext();
	const [state, setState] = useState({ entry: emptyEntry, submitted: false });

	const handleInputChange = event => {
		const {
			name,
			value
		} = event.target;

		setState({ ...state, entry: { ...state.entry, [name]: value }});
	};

	const newEntry = () => setState({ ...state, entry: emptyEntry, submitted: false });

	const handleSubmit = async () => {
		try {
			await addEntry(state.entry);
			setState({ ...state, entry: emptyEntry, submitted: true });
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='submit-form'>
			{state.submitted ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className='btn btn-success' onClick={newEntry}>
            Add
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
