// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database';
import { EntryModel } from '@/models';


type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'No tiene acceso a este servicio' });
  }

  await db.connect();

  try {

    await EntryModel.deleteMany();
    await EntryModel.insertMany(seedData.entries);
    res.status(200).json({ message: 'Datos insertados correctamente' });

  } catch (error) {
    res.statusMessage = "Error al insertar los datos";
  }

  await db.disconnect();





}
