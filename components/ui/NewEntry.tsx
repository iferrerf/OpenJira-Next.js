import { Box, Button, TextField } from '@mui/material'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';


export const NewEntry = () => {

    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const { addNewEntry } = useContext(EntriesContext);

    const [inputValueTitle, setInputValueTitle] = useState('');
    const [inputValueDesc, setInputValueDesc] = useState('');

    const [touched, setTouched] = useState(false);

    const onTextFieldChangeTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValueTitle(event.target.value);
    }

    const onTextFieldChangeDesc = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValueDesc(event.target.value);
    }


    const onSave = () => {
        setTouched(!touched);
        if (inputValueTitle.trim().length <= 0 || inputValueDesc.trim().length <= 0) return;
        
        addNewEntry(inputValueTitle, inputValueDesc);
        setIsAddingEntry(false);
        setInputValueTitle('');
        setInputValueDesc('');
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
                                helperText={touched && inputValueTitle.trim().length <= 0 && 'Ingrese un titulo'}
                                error={touched && inputValueTitle.trim().length <= 0}
                                value={inputValueTitle}
                                onChange={onTextFieldChangeTitle}
                                onBlur={() => setTouched(touched)}
                            />

                            <TextField
                                fullWidth
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                multiline
                                label='Descripcion'
                                helperText={touched && inputValueDesc.trim().length <= 0 && 'Ingrese una tarea'}
                                error={touched && inputValueDesc.trim().length <= 0}
                                value={inputValueDesc}
                                onChange={onTextFieldChangeDesc}
                                onBlur={() => setTouched(touched)}
                            />

                            <Box justifyContent='space-between' marginBottom={1} display='flex'>

                                <Button
                                    variant='outlined'
                                    onClick={() => { setTouched(false), setIsAddingEntry(false), setInputValueTitle(''), setInputValueDesc('') }}
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
                            color='primary'
                            onClick={() => { setIsAddingEntry(true), setTouched(false) }}
                        >Agregar Tarea
                        </Button>

                    )
                }

            </Box>

        </>
    )
};
