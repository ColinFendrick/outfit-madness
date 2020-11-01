import { useState, useEffect } from 'react';

import EntryService from '../services/EntryService';
import useEntryContext from '../hooks/useEntryContext';
import useLocalContext from '../hooks/useLocalContext';

const Vote = () => {
	const { entries, setEntries, voteOnEntry } = useEntryContext();
	const { votingState, moveToNextVote } = useLocalContext();
	const [state, setState] = useState({ error: '' });

	useEffect(() => {
		(async () => {
			const res = await EntryService.getAll();
			setEntries(res.data);
		})();
	}, []); //eslint-disable-line

	const handleVote = async ({ _id, votes }) => {
		try {
			voteOnEntry({ _id, votes: votes + 1 });
			moveToNextVote();
		} catch (e) {
			setState({ error: e.message });
		}
	};


	const findCurrentPair = () => {
		const findEntry = pos => entry => (
			entry.seed === votingState.currentSeed[pos] && entry.bracket === votingState.bracket
		);

		return [entries.find(findEntry(0)), entries.find(findEntry(1))];
	};

	return (
		<div>
			{state.error ? (
				<div>
					<h2>{state.error}</h2>
				</div>
			) : (
				findCurrentPair()?.map(entry => (
					entry && (
						<div key={entry._id} onClick={() => handleVote(entry)}>
							{entry.name} - {entry.bracket}: {entry.seed}
						</div>
					)
				))
			)}
		</div>
	);
};

export default Vote;
