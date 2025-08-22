import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.connection.collection('specialists');
    const specialists = await collection.find().toArray();
    res.status(200).json(specialists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load specialists.' });
  }
}
