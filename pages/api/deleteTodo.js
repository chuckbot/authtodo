import { table, getMinifiedRecord } from './utils/Airtable';

export default async (req, res) => {
    const { id } = req.body;

    try {
        const deleteRecords = await table.destroy([id]);
        res.statusCode = 200;
        res.json(getMinifiedRecord(deleteRecords[0]));
    } catch {
        console.log(err);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
};