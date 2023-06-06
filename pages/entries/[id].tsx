import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton, Avatar } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { dbEntries } from '@/database';
import { Layout } from '@/components/layouts';
import { Entry, EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowBack } from '@mui/icons-material';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];


interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

    const router = useRouter();

    const [inputValueTitle, setInputValueTitle] = useState('');
    const [inputValueDescription, setInputValueDescription] = useState('');

    const createdAt = entry.createdAt === undefined ? Date.now().toString : dateFunctions.getFormattedDistanceToNow(entry.createdAt)

    const [status, setStatus] = useState<EntryStatus>('pending');

    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValueDescription.length <= 0 && touched, [inputValueDescription, touched])

    const { updateEntry, deleteEntry } = useContext(EntriesContext);

    const onInputValueChangeTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValueTitle(event.target.value);
    }

    const onInputValueChangeDescription = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValueDescription(event.target.value);
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {

        if (inputValueDescription.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status: status,
            description: inputValueDescription,
            title: inputValueTitle
        }

        updateEntry(updatedEntry, true);

        router.push('/');

    }

    const onDelete = () => {
        deleteEntry(entry._id);

    }


    return (
        <Layout>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6} >
                    <Card>

                        <CardHeader
                            title={`Entrada:`}
                            titleTypographyProps={{ variant: 'h5' }}
                            subheader={`Creada hace: ${createdAt}`}
                            avatar={
                                <Avatar
                                    onClick={() => router.replace('/')}
                                    sx={{ backgroundColor: '#556cd6', cursor: 'pointer'}}
                                >
                                    <ArrowBack />
                                </Avatar>}
                        />

                        <CardContent>

                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Titulo'
                                autoFocus
                                multiline
                                label="Titulo"
                                value={inputValueTitle}
                                onChange={onInputValueChangeTitle}
                                onBlur={() => setTouched(true)}
                                helperText={isNotValid && 'Ingrese un valor'}
                                error={isNotValid}
                            />

                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Descripcion'
                                autoFocus
                                multiline
                                label="Descripcion"
                                value={inputValueDescription}
                                onChange={onInputValueChangeDescription}
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
                                sx={{ ml: 1 }}
                                onClick={onSave}
                                disabled={inputValueDescription.length == 0}
                            > Guardar
                            </Button>

                            <Link href={'/'}>
                                <IconButton
                                    size='large'
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#b71c1c',
                                            color: 'white',
                                        },
                                        margin: 1,
                                        backgroundColor: 'red',
                                        color: 'white',
                                    }}
                                    onClick={onDelete}>
                                    <DeleteOutlineOutlinedIcon />
                                </IconButton>
                            </Link>

                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryId(id);
    console.log({entry});

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
