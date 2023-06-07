
import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;

    // if (!mongoose.isValidObjectId(id)) {
    //     return res.status(400).json({ message: 'ID no válido' });
    // }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return getEntry(req, res);
        case 'DELETE':
            return deleteEntry(req, res);
        default:
            return res.status(400).json({ message: 'End Point no válido ' + req.method });

    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    await db.connect();

    const entry = await Entry.findById(id);

    await db.disconnect();

    if (!entry) {
        return res.status(404).json({ message: 'Entrada no encontrada con este ID: ' + id });
    }

    return res.status(200).json(entry);

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(404).json({ message: 'Entrada no encontrada con este ID: ' + id });
    }

    const {
        title = entryToUpdate.title,
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;


    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { title, description, status }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json(updatedEntry!);

    } catch (error: any) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: error.errors.status });
    }


}


const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;

    await db.connect();
    
    try {
        const entryToDelete = await Entry.findByIdAndRemove(id);
        res.status(200).json(entryToDelete!);
        await db.disconnect();

    } catch (error: any) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: error.errors.status });
    }

}

