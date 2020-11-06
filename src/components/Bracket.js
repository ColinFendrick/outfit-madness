import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { useEntryContext, useUserContext, useLocalContext } from '../hooks';
import { EditEntryModal } from './modals';
import { brackets, bracketEnums } from '../constants/brackets';
import { Table } from '.';

const Bracket = () => {
	const {
		entries,
		setEntries,
		getAllEntries,
		deleteEntry,
		deleteAllEntries,
		deleteBracket
	} = useEntryContext();
	const { headersReady, checkHeadersBefore, currentUser } = useUserContext();
	const { toggleModal } = useLocalContext();
	const [sort, setSort] = useState({ field: null, dir: true });
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

	const updateSort = field =>
		setSort({
			field,
			dir: sort.field === field ? !sort.dir : true
		});

	const sortFunc = (a, b) => {
		if (!sort.field) return 0;

		if (sort.dir) {
			if (a[sort.field] > b[sort.field]) return 1;
			else return -1;
		} else {
			if (a[sort.field] > b[sort.field]) return -1;
			else return 1;
		}
	};

	const fields = ['name', 'seed', 'bracket', 'votes'];

	const headers = fields.map((field, ix) => (
		<th onClick={() => updateSort(field)} key={`${field}-header-${ix}`}>
			{`${field.charAt(0).toUpperCase()}${field.slice(1)}`}{' '}
			<FontAwesomeIcon
				icon={sort.field === field && !sort.dir ? faCaretDown : faCaretUp} style={{ color: sort.field === field ? '#ddd' : '#dddddd4d' }}
			/>
		</th>
	));

	const rows = entry => fields.map(field => (
		<td
			key={`${field}-${entry[field]}-${entry._id}`}
			onClick={() => isAdmin ? toggleModal(<EditEntryModal entry={entry} reload={reload} />)() : {}}
		>
			{field === 'bracket' ? bracketEnums[entry[field]] : entry[field]}
		</td>
	));

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
							<input type='checkbox' className='custom-control-input' id='inSeparateTables' onClick={() => toggleSeparateTables(!inSeparateTables)}/>
							<label className='custom-control-label' htmlFor='inSeparateTables'>{inSeparateTables ? 'View as One Table' : 'View Brackets Separately'}</label>
						</div>
					</div>

					{inSeparateTables ?
						brackets.map(bracket => (
							<Table
								headers={headers}
								isAdmin={isAdmin}
								setError={setError}
								sortFunc={sortFunc}
								toggleModal={toggleModal}
								deleteEntry={deleteEntry}
								reload={reload}
								rows={rows}
								entries={entries.filter(entry => bracket === entry.bracket)}
								deleteEntries={() => deleteBracket(bracket)}
								key={`${bracket}-table`}
							/>
						)) : (
							<Table
								headers={headers}
								isAdmin={isAdmin}
								deleteEntries={deleteAllEntries}
								setError={setError}
								sortFunc={sortFunc}
								entries={entries}
								toggleModal={toggleModal}
								deleteEntry={deleteEntry}
								reload={reload}
								rows={rows}
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
