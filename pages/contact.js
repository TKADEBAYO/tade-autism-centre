import { useEffect, useState } from "react";
import Head from "next/head";

export default function Contact() {
  const [fadeIn, setFadeIn] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending message.");
    }
  };

  return (
    <div
      className={`min-h-screen relative text-gray-900 transition-opacity duration-1000 ease-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/daycentres-bg.png"
          alt="Day Centres Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-50/70 backdrop-blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 px-6">
        <Head>
          <title>Contact Us - Tade Autism Centre</title>
        </Head>

        <div className="max-w-3xl mx-auto bg-white/90 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            📩 Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-center">{status}</p>}
        </div>
      </div>
    </div>
  );
}
