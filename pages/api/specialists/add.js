import { connectToDatabase } from '../../../lib/mongodb';
import validator from 'validator';
import { getAuth } from 'firebase-admin/auth';
import adminApp from '../../../lib/firebaseAdmin'; // ✅ our Firebase Admin SDK

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

    // ✅ Restrict by email instead of claims
    const allowedAdmins = ["folukt3@gmail.com"]; // Add more later if needed
    if (!allowedAdmins.includes(decoded.email)) {
      return res.status(403).json({ error: 'Not authorised' });
    }
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: 'Invalid or expired token' });
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ error: 'Failed to add specialist.' });
  }
}
