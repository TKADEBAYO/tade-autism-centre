import { connectToDatabase } from '../../../lib/mongodb';
import validator from 'validator';
import { getAuth } from 'firebase-admin/auth';
import adminApp from '../../../lib/firebaseAdmin'; // we’ll create this for Firebase Admin

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  // 🔹 1. Authenticate Admin
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No auth token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = await getAuth(adminApp).verifyIdToken(token);

    // Check if user has admin role
    if (!decoded.admin) {
      return res.status(403).json({ error: 'Not authorised' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // 🔹 2. Extract and Validate Data
  const { name, type, location, contact } = req.body;

  if (!name || !type || !location || !contact || !contact.email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!validator.isEmail(contact.email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (contact.phone && !validator.isMobilePhone(contact.phone, 'any')) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  // Optional: restrict length to avoid huge inputs
  if (name.length > 100 || location.length > 200) {
    return res.status(400).json({ error: 'Input too long' });
  }

  // 🔹 3. Insert Into Database
  try {
    const db = await connectToDatabase();
    const collection = db.connection.collection('specialists');

    await collection.insertOne({
      name,
      type,
      location,
      contact,
      createdAt: new Date()
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add specialist.' });
  }
}
