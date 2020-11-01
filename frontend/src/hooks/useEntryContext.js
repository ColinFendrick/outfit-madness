import { useContext } from 'react';

import { EntryContext } from '../context/EntryContext';
import EntryService from '../services/EntryService';

const useEntryContext = () => {
	const [context, setContext] = useContext(EntryContext);

	const setEntries = entries =>
		setContext({ ...context, entries });


	const voteOnEntry = async entry => {
		try {
			const res = await EntryService.update(entry);
			console.log(res);
		} catch (e) {
			throw new Error(e);
		}
	};

	const addEntry = async entry => {
		try {
			const res = await EntryService.add(entry);
			return res;
		} catch (e) {
			throw new Error(e);
		}
	};

	return {
		entries: context.entries,
		setEntries,
		addEntry,
		voteOnEntry
	};
};

export default useEntryContext;
