
import { db } from '@/database';
import Entry from '@/models/Entry';
import type { NextApiRequest, NextApiResponse } from 'next'
import { EntryModel, IEntry } from '@/models';


type Data =
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getEntries(res);
        case 'POST':
            return postEntry(req, res);

        default:
            return res.status(400).json({ message: 'End Point no existe' });
    }

}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description = '', title = '' } = req.body;

    if (title === '') {
        return res.status(400).json({ message: 'El titulo es requerido' });
    }

    if (description === '') {
        return res.status(400).json({ message: 'La descripción es requerida' });
    }

    const newEntry = new EntryModel({
        title,
        description,
        createdAt: Date.now(),
    });

    try {

        await db.connect();
        await newEntry.save();
        await db.disconnect();

        return res.status(201).json(newEntry);

    } catch (error) {
        await db.disconnect();
        console.log(error)
        return res.status(500).json({ message: 'Error al crear la entrada, revisar la consola del servidor' });

    }

}

const getEntries = async (res: NextApiResponse<Data>) => {

    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();

    return res.status(200).json(entries);
}