import { useEffect, useState } from "react";
import Head from "next/head";

export default function Contact() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

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
          <meta
            name="description"
            content="Contact Tade Autism Centre to learn more about our programmes, services, and support options."
          />
        </Head>

        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 fade-in-1">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center fade-in-2">
            📩 Contact Us
          </h1>
          <p className="text-center mb-6 text-gray-600 fade-in-3">
            Have questions about our day centres, programmes, or services? Fill in the form
            below and our team will be in touch.
          </p>

          <form className="space-y-4 fade-in-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold fade-in-5"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
