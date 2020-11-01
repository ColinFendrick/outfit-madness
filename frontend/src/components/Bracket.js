import { useEffect } from 'react';
import { Table } from 'reactstrap';

import EntryService from '../services/EntryService';
import useEntryContext from '../hooks/useEntryContext';

const Bracket = () => {
	const { entries, setEntries, deleteEntry, deleteAll } = useEntryContext();

	useEffect(() => {
		(async () => {
			const res = await EntryService.getAll();
			setEntries(res.data);
		})();
	}, []); // eslint-disable-line

	const deleteAndReload = method => async (entry = null) => {
		await method(entry);
		const res = await EntryService.getAll();
		setEntries(res.data);
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
							<button className='btn btn-danger' onClick={deleteAndReload(deleteAll)}>
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
								<button className='btn btn-danger' onClick={() => deleteAndReload(deleteEntry)(entry)}>
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
