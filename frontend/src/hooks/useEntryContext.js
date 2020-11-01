import { useContext } from 'react';

import { EntryContext } from '../context/EntryContext';
import EntryService from '../services/EntryService';

const useEntryContext = () => {
	const [context, setContext] = useContext(EntryContext);

	const setEntries = entries =>
		setContext({ ...context, entries });

	const voteOnEntry = async entry => {
		try {
			await EntryService.update(entry);
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

	const deleteEntry = async entry => {
		try {
			await EntryService.deleteEntry(entry);
		} catch (e) {
			throw new Error(e);
		}
	};

	const deleteAll = async () => {
		try {
			await EntryService.deleteAll();
		} catch (e) {
			throw new Error(e);
		}
	};
	return {
		entries: context.entries,
		setEntries,
		addEntry,
		voteOnEntry,
		deleteEntry,
		deleteAll
	};
};

export default useEntryContext;
