import { useEffect } from 'react';

import EntryService from '../services/EntryService';
import useEntryContext from '../hooks/useEntryContext';
import useLocalContext from '../hooks/useLocalContext';

const Vote = () => {
	const { entries, setEntries } = useEntryContext();
	const { votingState } = useLocalContext();

	useEffect(() => {
		(async () => {
			const res = await EntryService.getAll();
			setEntries(res.data);
		})();
	}, []);

	const findCurrentPair = () => {
		const findEntry = pos => entry => (
			entry.seed === votingState.currentSeed[pos] && entry.bracket === votingState.bracket
		);

		return [entries.find(findEntry(0)), entries.find(findEntry(1))];
	};

	return (
		<div>
			{findCurrentPair()?.map(entry => (
				entry && <div key={entry._id}>
					{entry.name} - {entry.bracket}: {entry.seed}
				</div>
			))}
		</div>
	);
};

export default Vote;
