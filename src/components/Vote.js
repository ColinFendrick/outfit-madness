import { useState, useEffect } from 'react';
import { Container, Col } from 'reactstrap';

import { useEntryContext, useUserContext } from '../hooks';
import { bracketEnums } from '../constants/brackets';

const Vote = () => {
	const {
		entries,
		setEntries,
		getAllEntries,
		getEntryById,
		editEntry
	} = useEntryContext();
	const {
		headersReady,
		checkHeadersBefore,
		moveToNextVote,
		currentUser
	} = useUserContext();
	const [state, setState] = useState({ error: '' });

	useEffect(() => {
		checkHeadersBefore({
			method: getAllEntries,
			errorMethod: error => setState({ error }),
			cb: setEntries
		})();
	}, [headersReady]); // eslint-disable-line

	const handleVote = checkHeadersBefore({
		method: getEntryById,
		errorMethod: error => setState({ error }),
		cb: async data => { // This takes the getEntryById data and uses it to add one to the vote
			await editEntry({ _id: data._id, votes: data.votes + 1 });
			moveToNextVote();
		}
	});

	const findCurrentPair = () => {
		if (!currentUser?.voting) return [];

		const { voting } = currentUser;

		const findEntry = pos => entry => (
			entry.seed === voting.currentSeed[pos] && entry.bracket === voting.bracket
		);

		const [first, second] = [entries.find(findEntry(0)), entries.find(findEntry(1))];
		return (first || second) ? [first, second] : [];
	};

	return (
		<Container className='d-flex flex-column'>
			{state.error ? (
				<div>
					<h2>{state.error}</h2>
				</div>
			) : (
				<>

					<div>
						<h3>
							Current Position: {currentUser?.voting.bracket && bracketEnums[currentUser.voting.bracket]}: {currentUser?.voting.currentSeed[0]} vs {currentUser?.voting.currentSeed[1]}
						</h3>
					</div>

					<div className='d-flex'>
						{findCurrentPair().map(entry => (
							entry && (
								<Col
									key={entry._id}
									className='d-flex flex-column align-items-center justify-content-center vote-option'
									onClick={() => handleVote(entry)}
								>
									<img src={entry.imageURL} alt='Tim Duncan' />
									<span>{entry.name}: {entry.seed} seed in {bracketEnums[entry.bracket]}</span>
								</Col>
							)
						))}
					</div>

				</>
			)}
		</Container>
	);
};

export default Vote;
