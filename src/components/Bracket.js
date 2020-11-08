import { useEffect, useState } from 'react';

import { useEntryContext, useUserContext, useLocalContext } from '../hooks';
import { EditEntryModal } from './modals';
import { brackets } from '../constants/brackets';
import { Table } from '.';

const Bracket = () => {
	const {
		entries,
		setEntries,
		getAllEntries,
		deleteAllEntries,
		deleteBracket
	} = useEntryContext();
	const { headersReady, checkHeadersBefore, currentUser } = useUserContext();
	const { toggleModal } = useLocalContext();
	const [error, setError] = useState('');
	const [inSeparateTables, toggleSeparateTables] = useState(false);

	const reload = checkHeadersBefore({
		method: getAllEntries,
		errorMethod: setError,
		cb: setEntries
	});

	useEffect(
		() => reload(),
		[headersReady] // eslint-disable-line
	);


	const isAdmin = currentUser?.role === 'admin';

	return (
		<div>
			{error ? (
				<div>
					<h2>{error}</h2>
				</div>
			) : (
				<>

					<div className='d-flex justify-content-end'>
						<div className='custom-control custom-switch'>
							<input
								type='checkbox'
								className='custom-control-input'
								id='inSeparateTables'
								onClick={() => toggleSeparateTables(!inSeparateTables)}
							/>
							<label className='custom-control-label' htmlFor='inSeparateTables'>
								{inSeparateTables ? 'View as One Table' : 'View Brackets Separately'}
							</label>
						</div>
					</div>

					{inSeparateTables ?
						brackets.map(bracket => (
							<Table
								setError={setError}
								reload={reload}
								entries={entries.filter(entry => bracket === entry.bracket)}
								deleteEntries={() => deleteBracket(bracket)}
								isSegregated={true}
								key={`${bracket}-table`}

							/>
						)) : (
							<Table
								setError={setError}
								reload={reload}
								entries={entries}
								isSegregated={false}
								deleteEntries={deleteAllEntries}
							/>
						)}

					{isAdmin && (
						<section>
							<button className='btn btn-success' onClick={() => toggleModal(<EditEntryModal reload={reload} />)()}>
								Add Entry
							</button>
						</section>
					)}
				</>
			)}
		</div>
	);
};

export default Bracket;
