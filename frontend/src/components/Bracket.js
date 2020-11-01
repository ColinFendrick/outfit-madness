import { useEffect } from 'react';

import EntryService from '../services/EntryService';
import useEntryContext from '../hooks/useEntryContext';

const Bracket = () => {
	const { entries, setEntries } = useEntryContext();

	useEffect(() => {
		(async () => {
			const res = await EntryService.getAll();
			setEntries(res.data);
		})();
	}, []);

	return (
		<div>
      Bracket
			{entries && entries.map(entry => (
				<div key={entry._id}>
					{entry.name} - {entry.bracket}: {entry.seed}
				</div>
			))}
		</div>
	);
};

export default Bracket;
