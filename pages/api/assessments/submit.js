import { connectToDatabase } from '../../../lib/mongodb';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// Define schema once
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

// Prevent recompilation in dev hot reload
const Assessment =
  mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    await connectToDatabase();

    const { name, age, concerns, parentEmail, parentPhone, preferredDate } = req.body;

    if (!name || !age || !concerns) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to MongoDB
    await Assessment.create({
      name,
      age,
      concerns,
      parentEmail,
      parentPhone,
      preferredDate,
    });

    // --- ✉️ Send confirmation email ---
    if (parentEmail) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: true, // true for port 465
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: parentEmail,
        subject: "Assessment Submitted - Tade Autism Centre",
        html: `
          <h2>Thank you for submitting your child's assessment</h2>
          <p>Dear Parent/Carer,</p>
          <p>We have received your request for an autism assessment.</p>
          <p><strong>Child's Name:</strong> ${name}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Concerns:</strong> ${concerns}</p>
          <p><strong>Preferred Contact Date:</strong> ${preferredDate || 'Not provided'}</p>
          <br/>
          <p>Our team will review the details and contact you soon.</p>
          <p>Kind regards,</p>
          <p><strong>Tade Autism Centre</strong></p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Assessment submit error:', error);
    res.status(500).json({ error: 'Failed to save assessment.' });
  }
}
