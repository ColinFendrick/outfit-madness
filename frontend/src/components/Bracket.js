import { useEffect } from 'react';
import { Table } from 'reactstrap';

import EntryService from '../services/EntryService';
import useEntryContext from '../hooks/useEntryContext';
import useLocalContext from '../hooks/useLocalContext';
import { EditEntryModal } from './modals';

const Bracket = () => {
	const { entries, setEntries, deleteEntry, deleteAll } = useEntryContext();
	const { toggleModal } = useLocalContext();

	useEffect(() => {
		(async () => {
			const res = await EntryService.getAll();
			setEntries(res.data);
		})();
	}, []); // eslint-disable-line

	const reload = async () => {
		const res = await EntryService.getAll();
		setEntries(res.data);
	};

	const methodAndReload = method => async (entry = null) => {
		await method(entry);
		await reload();
	};

	return (
		<div>
      Bracket
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Seed</th>
						<th>Bracket</th>
						<th>Votes</th>
						<th>
							<button className='btn btn-danger' onClick={methodAndReload(deleteAll)}>
								Delete All Entries
							</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{entries && entries.map(entry => (
						<tr key={entry._id}>
							<td>{entry.name}</td>
							<td>{entry.seed}</td>
							<td>{entry.bracket}</td>
							<td>{entry.votes}</td>
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
		</div>
	);
};

export default Bracket;
