import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
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
      replyTo: email,
      subject: `📩 New Adult Services Enquiry from ${name}`,
      html: `
        <h3>New Adult Services Contact</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 2️⃣ Auto-confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "✅ Thanks for contacting Tade Autism Centre (Adult Services)",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to <strong>Tade Autism Centre</strong> regarding our adult services.  
        We’ve received your enquiry and one of our team will respond shortly.</p>
        <hr />
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p>Warm regards,<br/>The Tade Autism Centre Team</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Adults contact error:", error.message);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
