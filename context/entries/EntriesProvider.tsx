import { FC, ReactElement, ReactNode, useEffect, useReducer } from 'react';
import { entriesReducer, EntriesContext } from './';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '@/interfaces';
import { entriesAPI } from '@/apis';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [

    ],
}

export const EntriesProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = async (description: string) => {

        try {

            const { data } = await entriesAPI.post<Entry>('/entries', {description});

            dispatch({ type: '[Entry] Add Entry', payload: data });

        } catch (error) {
            console.log(error)
        }
    }

    const updateEntry = async ({_id, description, status} : Entry) => {
        try {
            const { data } = await entriesAPI.put<Entry>(`/entries/${_id}`, {description, status});
            dispatch({ type: '[Entry] Entry-Updated', payload: data });

        } catch (error) {
            console.log({error})
        }
    }


    const refreshEntries = async () => {
        const { data } = await entriesAPI.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    }, []);


    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}; 