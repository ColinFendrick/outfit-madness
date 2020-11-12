import { useState, createContext } from 'react';

const LocalContext = createContext([{}, () => {}]);

const LocalProvider = props => {
	const [state, setState] = useState({
		ui: {
			modalChildren: null
		}
	});

	return (
		<LocalContext.Provider value={[state, setState]}>
			{props.children}
		</LocalContext.Provider>
	);
};

export { LocalContext, LocalProvider };
