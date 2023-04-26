import { FC, ReactElement, ReactNode, useReducer } from 'react';
import { entriesReducer, EntriesContext } from './';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '@/interfaces';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'En progreso: Mollit et ut ea ullamco aliquip adipisicing Lorem culpa sint veniam cupidatat quis ipsum.',
            status: 'in-progress',
            createdAt: Date.now()-1000000,
        },
        {
            _id: uuidv4(),
            description: 'Terminadas: Aliqua id et commodo in ut in laboris fugiat do ad consectetur cillum velit id.',
            status: 'finished',
            createdAt: Date.now()- 100000,
        },
    ],
}

export const EntriesProvider: FC = ({children}: any) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = (description: string) => {

        const newEntry: Entry = {
            _id: uuidv4(),
            description: description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({type: '[Entry] Add Entry', payload: newEntry});
    }

    const updateEntry = (entry: Entry) => {
        dispatch({type: '[Entry] Entry-Updated', payload: entry});
    }

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