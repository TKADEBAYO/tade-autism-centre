// pages/api/assessments/submit.js
import { connectToDatabase } from '../../../lib/mongodb';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// --- Schema ---
const AssessmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    concerns: { type: String, required: true },
    parentEmail: { type: String },
    parentPhone: { type: String },
    preferredDate: { type: String },
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: 'assessments' }
);

// Prevent model recompile in dev/hot-reload
const Assessment =
  mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();

    const { name, age, concerns, parentEmail, parentPhone, preferredDate } = req.body;

    // ✅ Validation
    if (!name || !age || !concerns) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // ✅ Save to MongoDB
    const newDoc = await Assessment.create({
      name,
      age,
      concerns,
      parentEmail,
      parentPhone,
      preferredDate,
    });

    // ✅ Send confirmation email if parentEmail exists
    if (parentEmail) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // STARTTLS
        auth: {
          user: process.env.EMAIL_SERVER_USER,     // e.g. tkmaxxs123@gmail.com
          pass: process.env.EMAIL_SERVER_PASSWORD, // Gmail App Password
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: parentEmail,
        subject: 'Assessment Submitted - Tade Autism Centre',
        html: `
          <h2>✅ Thank you for your submission</h2>
          <p>Dear Parent/Carer,</p>
          <p>We have received your assessment request:</p>
          <ul>
            <li><strong>Child's Name:</strong> ${name}</li>
            <li><strong>Age:</strong> ${age}</li>
            <li><strong>Concerns:</strong> ${concerns}</li>
            <li><strong>Preferred Contact Date:</strong> ${preferredDate || 'Not provided'}</li>
          </ul>
          <p>Our team will contact you soon.</p>
          <p>Kind regards,</p>
          <p><strong>Tade Autism Centre</strong></p>
        `,
      });
    }

    // ✅ Response
    res.status(200).json({ success: true, data: newDoc });
  } catch (error) {
    console.error('❌ Assessment submit error:', error.message);
    res.status(500).json({ error: 'Failed to save assessment.' });
  }
}
