import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Assessments() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    concerns: '',
    parentEmail: '',
    parentPhone: '',
    preferredDate: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/assessments/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen text-gray-900 py-12 px-4 relative"
      style={{
        backgroundImage: "url('/assessments-bg.png')", // 👈 place file in /public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="relative z-10">
        <Head>
          <title>Tade Autism Centre - Assessments</title>
        </Head>

        {/* Logo */}
        <div className="flex justify-center mb-6 fade-in-1">
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

        {/* Form Card */}
        <div className="max-w-xl mx-auto bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm fade-in-2">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-800 fade-in-3">
            Child Assessment Form
          </h1>

          {submitted ? (
            <div className="text-green-700 space-y-4 text-center fade-in-4">
              <p className="text-lg font-medium">✅ Thank you! Your assessment has been submitted.</p>
              <p><strong>Child's Name:</strong> {formData.name}</p>
              <p><strong>Age:</strong> {formData.age}</p>
              <p><strong>Concerns:</strong> {formData.concerns}</p>
              <p><strong>Parent Email:</strong> {formData.parentEmail}</p>
              <p><strong>Phone:</strong> {formData.parentPhone}</p>
              <p><strong>Preferred Contact Date:</strong> {formData.preferredDate}</p>
            </div>
          ) : (
            <>
              <p className="text-gray-700 text-center mb-6 fade-in-3">
                Fill out this short form to help us understand your child’s needs. Our specialists will review the details and contact you for a personalised follow-up.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 fade-in-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Child's Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white"
                    required
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Child's Age</label>
                  <input
                    type="number"
                    placeholder="Enter age"
                    className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white"
                    required
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Concerns</label>
                  <textarea
                    placeholder="e.g., speech delay, sensory issues"
                    className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white"
                    rows={4}
                    required
                    onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Parent/Carer Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white"
                    required
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+44..."
                    className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white"
                    required
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Contact Date</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white"
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded w-full transition hover:scale-105"
                >
                  Submit Assessment
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
