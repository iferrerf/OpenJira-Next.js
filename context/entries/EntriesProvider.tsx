import { FC, useEffect, useReducer, useState } from 'react';
import { entriesReducer, EntriesContext } from './';
import { Entry } from '@/interfaces';
import { entriesAPI } from '@/apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const { enqueueSnackbar } = useSnackbar();

    const [isLoaded, setIsLoaded] = useState(false);

    const addNewEntry = async (title:string, description: string) => {
        try {

            const { data } = await entriesAPI.post<Entry>('/entries', { title, description });

            console.log(data)

            dispatch({ type: '[Entry] Add Entry', payload: data });

        } catch (error) {
            console.log(error)
        }
    }

    const updateEntry = async ({ _id, description, title, status }: Entry, showSnackbar = false) => {
        try {

            const { data } = await entriesAPI.put<Entry>(`/entries/${_id}`, {title, description, status });

            dispatch({ type: '[Entry] Entry-Updated', payload: data });

            if (showSnackbar) {
                enqueueSnackbar('Entrada Actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }

        } catch (error) {
            console.log({ error })
        }
    }


    const getEntries = async () => {
        const { data } = await entriesAPI.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data });
    }

    const deleteEntry = async (id: string) => {
        try {
            const { data } = await entriesAPI.delete<Entry>(`/entries/${id}`);
            dispatch({ type: '[Entry] Delete-Entry', payload: data });

        } catch (error) {
            console.log({ error })
        }
    }


    useEffect(() => {
        getEntries();
        setIsLoaded(true);
    }, [isLoaded]);


    return (
        <EntriesContext.Provider value={{
            ...state,

            addNewEntry,
            updateEntry,
            deleteEntry,
            getEntries,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}; 