import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const startCheckout = async (plan) => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error starting checkout.');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Tade Autism Centre - Subscribe</title>
        <meta
          name="description"
          content="Join Tade Autism Centre to access assessments, therapy resources, and more."
        />
      </Head>

      <div
        className={`min-h-screen text-gray-900 px-4 relative bg-fixed bg-cover bg-center transition-opacity duration-1000 ease-out ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: "url('/subscribe-bg.png')" }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/70"></div>

        {/* Content */}
        <div className="relative z-10 pt-32"> {/* 👈 padding to clear navbar */}
          {/* Logo */}
          <div className={`flex justify-center mb-6 ${fadeIn ? 'fade-in-1' : ''}`}>
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/Tade_Autism_Centre.png"
                alt="Tade Autism Centre Logo"
                width={120}
                height={120}
                className="rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>
          </div>

          <div className="max-w-3xl mx-auto text-center fade-in-2">
            <h1 className="text-4xl font-bold text-blue-900 mb-4 drop-shadow">
              Choose Your Plan
            </h1>
            <p className="text-lg mb-10 text-gray-800 bg-white/60 inline-block px-4 py-2 rounded-xl backdrop-blur-sm shadow">
              Unlock full access to assessments, resources, and personalized tools for parents and autistic individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Plan */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition duration-300 fade-in-3">
              <h2 className="text-2xl font-bold mb-2 text-blue-800">Monthly Plan</h2>
              <p className="mb-4 text-gray-700">Flexible monthly access for families & carers.</p>
              <span className="text-3xl font-bold mb-6 text-blue-900">£9.99/mo</span>
              <button
                onClick={() => startCheckout('monthly')}
                className={`w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Subscribe Monthly'}
              </button>
            </div>

            {/* Annual Plan */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-6 flex flex-col items-center border-2 border-green-500 hover:shadow-2xl hover:scale-105 transition duration-300 fade-in-4">
              <h2 className="text-2xl font-bold mb-2 text-green-700">Annual Plan</h2>
              <p className="mb-4 text-gray-700">Best value for year-round access & support.</p>
              <span className="text-3xl font-bold mb-6 text-green-800">£99/year</span>
              <button
                onClick={() => startCheckout('yearly')}
                className={`w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Subscribe Yearly'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
