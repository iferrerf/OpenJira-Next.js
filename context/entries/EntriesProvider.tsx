import { useEffect, useReducer } from 'react';
import { entriesReducer, EntriesContext } from './';
import { Entry } from '@/interfaces';
import { entriesAPI } from '@/apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [

    ],
}

export const EntriesProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {
        try {

            const { data } = await entriesAPI.post<Entry>('/entries', { description });

            dispatch({ type: '[Entry] Add Entry', payload: data });

        } catch (error) {
            console.log(error)
        }
    }

    const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
        try {

            const { data } = await entriesAPI.put<Entry>(`/entries/${_id}`, { description, status });

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


    const refreshEntries = async () => {
        const { data } = await entriesAPI.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data });
    }

    const deleteEntry = async (id: string) => {
        try {
            const { data } = await entriesAPI.delete<Entry>(`/entries/${id}`);
            console.log(data)
            dispatch({ type: '[Entry] Delete-Entry', payload: data });

        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        refreshEntries();
    }, []);


    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}; 