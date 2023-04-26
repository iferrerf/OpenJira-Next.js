import { Box, Button, TextField } from '@mui/material'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';


export const NewEntry = () => {

    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const { addNewEntry } = useContext(EntriesContext);

    const [inputValue, setInputValue] = useState('');

    const [touched, setTouched] = useState(false);

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }


    const onSave = () => {
        if (inputValue.trim().length <= 0) return;

        addNewEntry(inputValue);
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    }


    return (
        <>
            <Box sx={{ marginBottom: 2, paddingX: 3 }}>
                {
                    isAddingEntry ? (
                        <>
                            <TextField
                                fullWidth
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                autoFocus
                                multiline
                                label='Nueva Entrada'
                                helperText={touched && inputValue.trim().length <= 0 && 'Ingrese una tarea'}
                                error={touched && inputValue.trim().length <= 0}
                                value={inputValue}
                                onChange={onTextFieldChange}
                                onBlur={() => setTouched(true)}
                            />

                            <Box display='flex' justifyContent='space-between' marginBottom={1}>

                                <Button
                                    variant='outlined'
                                    onClick={() => { setTouched(false), setIsAddingEntry(false) }}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    variant='outlined'
                                    color='success'
                                    endIcon={<ArchiveOutlinedIcon />}
                                    onClick={onSave}>
                                    Guardar
                                </Button>

                            </Box>
                        </>
                    ) : (

                        <Button
                            startIcon={<AddCircleOutlinedIcon />}
                            fullWidth
                            variant='outlined'
                            onClick={() => { setIsAddingEntry(true), setTouched(false) }}
                        >Agregar Tarea
                        </Button>

                    )
                }

            </Box>

        </>
    )
};
