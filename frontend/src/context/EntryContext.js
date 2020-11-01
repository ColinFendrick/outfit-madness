import React, { useState } from 'react';

const EntryContext = React.createContext([{}, () => {}]);

const EntryProvider = props => {

	const [state, setState] = useState({ entries: []});
	return (
		<EntryContext.Provider value={[state, setState]}>
			{props.children}
		</EntryContext.Provider>
	);
};

export { EntryContext, EntryProvider };
