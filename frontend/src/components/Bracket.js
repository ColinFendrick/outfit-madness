import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import useEntryContext from '../hooks/useEntryContext';
import useLocalContext from '../hooks/useLocalContext';
import { EditEntryModal } from './modals';

const Bracket = () => {
	const {
		entries,
		setEntries,
		getAllEntries,
		deleteEntry,
		deleteAll
	} = useEntryContext();
	const { toggleModal } = useLocalContext();
	const [sort, setSort] = useState({ field: null, dir: true });

	const reload = async () => {
		const res = await getAllEntries();
		setEntries(res.data);
	};

	useEffect(() => reload(), []); // eslint-disable-line

	const methodAndReload = method => async (entry = null) => {
		await method(entry);
		reload();
	};

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
			{field}{' '}
			<FontAwesomeIcon
				icon={sort.field === field && !sort.dir ? faCaretDown : faCaretUp} style={{ color: sort.field === field ? '#ddd' : '#dddddd4d' }}
			/>
		</th>
	));

	const rows = entry => fields.map(field => (
		<td
			key={`${entry[field]}-${entry._id}`}
			onClick={() => toggleModal(<EditEntryModal entry={entry} reload={reload} />)()}
		>
			{entry[field]}
		</td>
	));

	return (
		<div>
      Bracket
			<Table dark striped hover className='sortable'>
				<thead>
					<tr>
						{headers}
						<th>
							<button className='btn btn-danger' onClick={methodAndReload(deleteAll)}>
								Delete All Entries
							</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{entries && entries.sort(sortFunc).map(entry => (
						<tr key={entry._id}>
							{rows(entry)}
							<td>
								<button className='btn btn-warning' onClick={() => toggleModal(<EditEntryModal entry={entry} reload={reload} />)()}>
									Edit
								</button>
								<button className='btn btn-danger' onClick={() => methodAndReload(deleteEntry)(entry)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<section>
				<button className='btn btn-success' onClick={() => toggleModal(<EditEntryModal reload={reload} />)()}>
					Add Entry
				</button>
			</section>
		</div>
	);
};

export default Bracket;
