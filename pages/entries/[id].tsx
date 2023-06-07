import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton, Avatar, colors, useTheme } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { dbEntries } from '@/database';
import { Layout } from '@/components/layouts';
import { EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowBack } from '@mui/icons-material';
import { IEntry } from '@/models';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];


interface Props {
    entry: IEntry;
}

export const EntryPage: FC<Props> = ({ entry }) => {

    console.log({ entryyyyy: entry });

    const router = useRouter();

    const [inputValueTitle, setInputValueTitle] = useState(entry.title || '');
    const [inputValueDescription, setInputValueDescription] = useState(entry.description || '');

    const createdAt = entry.createdAt === undefined ? Date.now().toString : dateFunctions.getFormattedDistanceToNow(entry.createdAt || 0);

    const [status, setStatus] = useState<EntryStatus>('pending');

    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValueDescription.length <= 0 && touched, [inputValueDescription, touched])

    const { updateEntry, deleteEntry } = useContext(EntriesContext);

    const theme = useTheme();
    const avatarColor = theme.palette.primary.main;

    if (!entry || !entry.title || !entry.description) {
        return <div>Cargando entradas...</div>
    }

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

        const updatedEntry: IEntry = {
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
                                    sx={{ backgroundColor: avatarColor, cursor: 'pointer' }}
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


// export const getStaticPaths: GetStaticPaths = async () => {
//     const EntryIds = await dbEntries.getEntryIds();
  
//     const formattedEntryIds = EntryIds.map((entry) => ({
//       params: {
//         id: entry._id.toString(),
//       },
//     }));
  
//     return {
//       paths: formattedEntryIds,
//       fallback: 'blocking',
//     };
//   };


// // Implementa la función getStaticProps para obtener los datos necesarios en tiempo de compilación
// export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
//     const { id } = params as { id: string };

//     // Obtén la entrada correspondiente al ID desde tu base de datos
//     const entry = await dbEntries.getEntryId(id);

//     if (!entry) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };
//     }

//     // Devuelve los datos obtenidos como props para tu componente de página
//     return {
//         props: {
//             entry,
//         },
//     };
// };

export default EntryPage;
