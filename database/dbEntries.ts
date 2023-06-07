import { isValidObjectId } from "mongoose";
import { db } from "./";
import { Entry, IEntry } from "@/models";


export const getEntryId = async (id: string): Promise<IEntry | null> => {

    if (!isValidObjectId(id)) return null;

    await db.connect();
    const entry = await Entry.findById(id).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(entry));
}

export const getEntryIds = async(): Promise <(IEntry & Required<{ _id: string; }>)[]> => {

    await db.connect();
    const ids= await Entry.find().select('_id').lean();
    await db.disconnect();

    return ids;

}