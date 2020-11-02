import { useContext } from 'react';

import { EntryContext } from '../context/EntryContext';
import EntryService from '../services/EntryService';

const useEntryContext = () => {
	const [context, setContext] = useContext(EntryContext);

	const setEntries = entries =>
		setContext({ ...context, entries });

	const getAllEntries = async () => {
		try {
			const res = await EntryService.getAll();
			return res;
		} catch (e) {
			throw new Error(e);
		}
	};

	const getEntryById = async entry => {
		try {
			const res = await EntryService.getById(entry);
			return res;
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

	const editEntry = async entry => {
		try {
			const { data } = await EntryService.getById(entry);
			const res = await EntryService.update({ ...data, ...entry });
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
		getAllEntries,
		getEntryById,
		addEntry,
		editEntry,
		deleteEntry,
		deleteAll
	};
};

export default useEntryContext;
