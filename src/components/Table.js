import { useState } from 'react';
import { Table as TableRS } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { useUserContext, useEntryContext, useLocalContext } from '../hooks';
import { EditEntryModal } from './modals';
import { bracketEnums } from '../constants/brackets';

const Table = ({
	deleteEntries,
	setError,
	entries,
	reload,
	isSegregated
}) => {
	const { deleteEntry } = useEntryContext();
	const { toggleModal } = useLocalContext();
	const { currentUser, checkHeadersBefore } = useUserContext();
	const [sort, setSort] = useState({ field: null, dir: true });

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

	const updateSort = field =>
		setSort({
			field,
			dir: sort.field === field ? !sort.dir : true
		});

	const isAdmin = currentUser?.role === 'admin';

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

	return (
		<TableRS dark striped hover className='sortable'>
			<thead>
				<tr>
					{headers}

					{isAdmin && (
						<th>
							<button
								className='btn btn-danger'
								onClick={checkHeadersBefore({ method: deleteEntries, errorMethod: setError, cb: reload })}
							>
								{isSegregated ? 'Delete All Entries in Table' : 'Delete All Entries'}
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
		</TableRS>
	);
};

export default Table;
