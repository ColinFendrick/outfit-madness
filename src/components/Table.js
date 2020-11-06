import { Table as TableRS } from 'reactstrap';

import { useUserContext } from '../hooks';
import { EditEntryModal } from './modals';

const Table = ({
	headers,
	isAdmin,
	deleteEntries,
	setError,
	sortFunc,
	entries,
	toggleModal,
	deleteEntry,
	reload,
	rows
}) => {
	const { checkHeadersBefore } = useUserContext();

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
		</TableRS>
	);
};

export default Table;
