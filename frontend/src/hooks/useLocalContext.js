import { useContext } from 'react';

import { LocalContext } from '../context/LocalContext';
import brackets from '../enums/brackets';

const useLocalContext = () => {
	const [context, setContext] = useContext(LocalContext);

	const moveToNextVote = () => {
		if (context.voting.currentSeed[0] !== 8) {
			setContext({
				...context,
				voting: {
					...context.voting,
					currentSeed: [context.voting.currentSeed[0] + 1, context.voting.currentSeed[1] - 1]
				}
			});
		} else if (context.voting.brackets !== brackets[3]) {
			const currentBracketIx = brackets.findIndex(el => el === context.voting.bracket);
			setContext({
				...context,
				voting: {
					currentSeed: [1, 16],
					bracket: brackets[currentBracketIx + 1]
				}
			});
		} else {
			setContext({
				...context,
				voting: {
					currentSeed: [],
					bracket: ''
				}
			});
		}
	};

	const toggleModal = (children = null) => ctxOverrides => setContext({
		...context,
		ui: {
			...context.ui,
			modalChildren: children
		},
		...ctxOverrides
	});

	return {
		votingState: context.voting,
		uiState: context.ui,
		moveToNextVote,
		toggleModal
	};
};

export default useLocalContext;
