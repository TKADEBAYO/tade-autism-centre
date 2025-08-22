import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAuth } from 'firebase/auth';
import app from '../lib/firebaseConfig';

export default function Admin() {
  const specialistTypes = ['SALT', 'OT', 'Therapist', 'Psychologist', 'Support Worker'];

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    contact: { email: '', phone: '' },
    notes: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const validateField = (value) => value.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      !validateField(formData.name) ||
      !validateField(formData.type) ||
      !validateField(formData.location) ||
      !validateField(formData.contact.email) ||
      !validateField(formData.contact.phone)
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!window.confirm('Are you sure you want to add this specialist?')) return;

    setLoading(true);

    try {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in as an admin to add specialists.');
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch('/api/specialists/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess('✅ Specialist added successfully!');
        setFormData({
          name: '',
          type: '',
          location: '',
          contact: { email: '', phone: '' },
          notes: ''
        });
        setTimeout(() => setSuccess(''), 4000);
      } else {
        const errorText = await res.text();
        setError(`Submission failed: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen relative py-12 px-4 text-gray-900 transition-opacity duration-1000 ease-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: "url('/admin-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative z-10">
        <Head>
          <title>Tade Autism Centre - Admin Panel</title>
        </Head>

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

        {/* Form */}
        <div className={`max-w-xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md ${fadeIn ? 'fade-in-2' : ''}`}>
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-800 fade-in-3">
            Add New Specialist
          </h1>

          {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center fade-in-4">{success}</p>}
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center fade-in-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={fadeIn ? 'fade-in-5' : ''}>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className={fadeIn ? 'fade-in-6' : ''}>
              <label htmlFor="type" className="block text-sm font-medium mb-1">Specialist Type *</label>
              <select
                id="type"
                className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Select a type</option>
                {specialistTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className={fadeIn ? 'fade-in-7' : ''}>
              <label htmlFor="location" className="block text-sm font-medium mb-1">Location *</label>
              <input
                id="location"
                type="text"
                placeholder="e.g., London"
                className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className={fadeIn ? 'fade-in-8' : ''}>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Contact Email *</label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                value={formData.contact.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value }
                })}
                required
              />
            </div>

            <div className={fadeIn ? 'fade-in-9' : ''}>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Contact Phone *</label>
              <input
                id="phone"
                type="tel"
                placeholder="Phone number"
                className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                value={formData.contact.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value }
                })}
                required
              />
            </div>

            <div className={fadeIn ? 'fade-in-10' : ''}>
              <label htmlFor="notes" className="block text-sm font-medium mb-1">Additional Notes</label>
              <textarea
                id="notes"
                placeholder="Any comments, specialisation, or availability"
                className="w-full p-3 border border-gray-300 rounded bg-white/70 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            <div className={fadeIn ? 'fade-in-11' : ''}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex justify-center items-center"
              >
                {loading && <span className="loader mr-2 border-t-2 border-white w-4 h-4 rounded-full animate-spin"></span>}
                {loading ? 'Submitting...' : 'Add Specialist'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .loader {
          border: 2px solid transparent;
          border-top: 2px solid white;
        }
      `}</style>
    </div>
  );
}
