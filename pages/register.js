import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
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
        <Image
          src="/daycentres-bg.png"
          alt="Tade Autism Centre Register Background"
          layout="fill"
          objectFit="cover"
          priority
          quality={90}
          className="z-0"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 px-6">
        <Head>
          <title>Register Your Interest - Tade Autism Centre</title>
          <meta
            name="description"
            content="Register your interest in Tade Autism Centre day centres and programmes. Our team will get in touch with you."
          />
        </Head>

        {/* Logo */}
        <div className="flex justify-center mb-6 fade-in-1">
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/Tade_Autism_Centre.png"
              alt="Tade Autism Centre Logo"
              width={130}
              height={130}
              className="rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>
        </div>

        {/* Card */}
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 fade-in-2">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            📋 Register Your Interest
          </h1>
          <p className="text-center mb-6 text-gray-700">
            Fill out this quick form to register your interest in visiting our
            day centres or joining a virtual session.
          </p>

          <form className="space-y-4 fade-in-3">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
            />
            <select
              className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
              required
            >
              <option value="">Select Centre of Interest</option>
              <option>North London Centre</option>
              <option>East London Hub</option>
              <option>Virtual Sessions</option>
            </select>
            <textarea
              placeholder="Any additional details (optional)"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
            >
              Register Interest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
