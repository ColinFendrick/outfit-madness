import { useState, createContext } from 'react';

import brackets from '../enums/brackets';

const LocalContext = createContext([{}, () => {}]);

const LocalProvider = props => {
	const [state, setState] = useState({ voting: {
		currentSeed: [1, 16], bracket: brackets[0]
	}});

	return (
		<LocalContext.Provider value={[state, setState]}>
			{props.children}
		</LocalContext.Provider>
	);
};

export { LocalContext, LocalProvider };
