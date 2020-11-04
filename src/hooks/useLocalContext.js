import { useContext } from 'react';

import { LocalContext } from '../context/LocalContext';

const useLocalContext = () => {
	const [context, setContext] = useContext(LocalContext);

	const toggleModal = (children = null) => ctxOverrides => setContext({
		...context,
		ui: {
			...context.ui,
			modalChildren: children
		},
		...ctxOverrides
	});

	return {
		uiState: context.ui,
		toggleModal
	};
};

export default useLocalContext;
