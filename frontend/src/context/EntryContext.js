import { useState, createContext } from 'react';

const EntryContext = createContext([{}, () => {}]);

const EntryProvider = props => {

	const [state, setState] = useState({ entries: []});
	return (
		<EntryContext.Provider value={[state, setState]}>
			{props.children}
		</EntryContext.Provider>
	);
};

export { EntryContext, EntryProvider };
