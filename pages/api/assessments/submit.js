import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { name, age, concerns } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.connection.collection('assessments');
    await collection.insertOne({ name, age, concerns, submittedAt: new Date() });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save assessment.' });
  }
}
