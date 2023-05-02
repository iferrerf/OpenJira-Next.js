import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { dbEntries } from '@/database';
import { Layout } from '@/components/layouts';
import { Entry, EntryStatus } from '@/interfaces';
import { EntriesContext, EntriesProvider } from '@/context/entries';
import { dateFunctions } from '@/utils';
import Link from 'next/link';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];


interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({entry}) => {

    const [inputValue, setInputValue] = useState(entry.description);
    
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    
    const [touched, setTouched] = useState(false);
    
    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])
    
    const {updateEntry, deleteEntry} = useContext(EntriesContext);

    const onInpuetValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {

        if (inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status : status,
            description: inputValue
        }

        updateEntry(updatedEntry, true);

    }

    const onDelete = () => {
        deleteEntry(entry._id);

    }


    return (
        <Layout title={inputValue.substring(0,20) + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6} >
                    <Card>

                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada hace: ${dateFunctions.getFormattedDistanceToNow(entry.createdAt)}`}
                        />

                        <CardContent>

                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={inputValue}
                                onChange={onInpuetValueChange}
                                onBlur={() => setTouched(true)} 
                                helperText={isNotValid && 'Ingrese un valor'}
                                error={isNotValid}
                                />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChange}
                                >
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length == 0}
                            > Guardar

                            </Button>
                        </CardActions>

                    </Card>
                </Grid>

                <Link href={'/'}>
                <IconButton
                size='large'
                sx={{
                    position:'fixed',
                    bottom: 50,
                    right: 50,
                    backgroundColor: 'red',
                    color: 'white',
                }}
                onClick={onDelete}>
                    <DeleteOutlineOutlinedIcon/>
                </IconButton>
                </Link>

            </Grid>

        </Layout>
    );
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const {id} = params as { id: string};

    const entry = await dbEntries.getEntryId(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
             entry
        }
    }
}


export default EntryPage;
