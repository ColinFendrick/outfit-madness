import { useState, createContext } from 'react';

import brackets from '../constants/brackets';

const LocalContext = createContext([{}, () => {}]);

const LocalProvider = props => {
	const [state, setState] = useState({
		ui: {
			modalChildren: null
		},
		voting: {
			currentSeed: [1, 16], bracket: brackets[0]
		}
	});

	return (
		<LocalContext.Provider value={[state, setState]}>
			{props.children}
		</LocalContext.Provider>
	);
};

export { LocalContext, LocalProvider };
