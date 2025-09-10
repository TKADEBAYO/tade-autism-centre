// pages/api/register.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, centre, details } = req.body;

  if (!name || !email || !centre) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // 1️⃣ Send to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "folukt3@gmail.com",
      subject: `📋 New Registration of Interest from ${name}`,
      html: `
        <h3>New Registration Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Centre of Interest:</strong> ${centre}</p>
        <p><strong>Details:</strong> ${details || "None"}</p>
      `,
    });

    // 2️⃣ Auto-confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "✅ Registration Received - Tade Autism Centre",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for registering your interest with <strong>Tade Autism Centre</strong>.  
        We’ve received your details and will be in touch shortly.</p>
        <hr />
        <p><strong>Your Submission:</strong></p>
        <ul>
          <li>Email: ${email}</li>
          <li>Phone: ${phone || "N/A"}</li>
          <li>Centre: ${centre}</li>
          <li>Details: ${details || "None"}</li>
        </ul>
        <hr />
        <p>Warm regards,<br/>The Tade Autism Centre Team</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Register form error:", error.message);
    return res.status(500).json({ error: "Failed to send registration" });
  }
}
