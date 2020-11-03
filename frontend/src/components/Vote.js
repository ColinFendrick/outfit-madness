import { useState, useEffect } from 'react';
import { Container, Col } from 'reactstrap';

import useEntryContext from '../hooks/useEntryContext';
import useLocalContext from '../hooks/useLocalContext';
import useUserContext from '../hooks/useUserContext';

const Vote = () => {
	const {
		entries,
		setEntries,
		getAllEntries,
		getEntryById,
		editEntry
	} = useEntryContext();
	const { headersReady } = useUserContext();
	const { votingState, moveToNextVote } = useLocalContext();
	const [state, setState] = useState({ error: '' });

	useEffect(() => {
		(async () => {
			if (headersReady) {
				try {
					const res = await getAllEntries();
					setEntries(res.data);
				} catch (e) {
					setState({ error: e.message });
				}
			}
		})();
	}, [headersReady]); // eslint-disable-line

	const handleVote = async entry => {
		if (headersReady) {
			try {
				const { data: { votes }} = await getEntryById(entry);
				await editEntry({ _id: entry._id, votes: votes + 1 });
				moveToNextVote();
			} catch (e) {
				setState({ error: e.message });
			}
		}
	};


	const findCurrentPair = () => {
		const findEntry = pos => entry => (
			entry.seed === votingState.currentSeed[pos] && entry.bracket === votingState.bracket
		);

		const [first, second] = [entries.find(findEntry(0)), entries.find(findEntry(1))];
		return (first || second) ? [first, second] : [];
	};

	return (
		<Container className='d-flex'>
			{state.error ? (
				<div>
					<h2>{state.error}</h2>
				</div>
			) : (
				findCurrentPair().map(entry => (
					entry && (
						<Col
							key={entry._id}
							className='d-flex flex-column align-items-center justify-content-center vote-option'
							onClick={() => handleVote(entry)}
						>
							<img src='https://theundefeated.com/wp-content/uploads/2016/07/gettyimages-56887299_master.jpg' alt='Tim Duncan' />
							<span>{entry.name} - {entry.bracket}: {entry.seed}</span>
						</Col>
					)
				))
			)}
		</Container>
	);
};

export default Vote;
