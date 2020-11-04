import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { useEntryContext, useUserContext, useLocalContext } from '../hooks';
import { EditEntryModal } from './modals';
import { bracketEnums } from '../constants/brackets';

const Bracket = () => {
	const {
		entries,
		setEntries,
		getAllEntries,
		deleteEntry,
		deleteAll
	} = useEntryContext();
	const { headersReady, checkHeadersBefore, currentUser } = useUserContext();
	const { toggleModal } = useLocalContext();
	const [sort, setSort] = useState({ field: null, dir: true });
	const [error, setError] = useState('');

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
      Bracket
			{error ? (
				<div>
					<h2>{error}</h2>
				</div>
			) : (
				<>
					<Table dark striped hover className='sortable'>
						<thead>
							<tr>
								{headers}

								{isAdmin && (
									<th>
										<button
											className='btn btn-danger'
											onClick={checkHeadersBefore({ method: deleteAll, errorMethod: setError, cb: reload })}
										>
										Delete All Entries
										</button>
									</th>
								)}

							</tr>
						</thead>
						<tbody>
							{entries && entries.sort(sortFunc).map(entry => (
								<tr key={entry._id}>
									{rows(entry)}

									{isAdmin && (
										<td>
											<button className='btn btn-warning'
												onClick={() => toggleModal(<EditEntryModal entry={entry} reload={reload} />)()}
											>
											Edit
											</button>
											<button className='btn btn-danger'
												onClick={() => checkHeadersBefore({
													method: deleteEntry, errorMethod: setError, cb: reload
												})(entry)}
											>
											Delete
											</button>
										</td>
									)}

								</tr>
							))}
						</tbody>
					</Table>

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
