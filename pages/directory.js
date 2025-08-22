import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Directory() {
  const [specialists, setSpecialists] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/specialists/list')
      .then((res) => res.json())
      .then((data) => {
        setSpecialists(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);
    const results = specialists.filter((s) =>
      s.name?.toLowerCase().includes(q) ||
      s.type?.toLowerCase().includes(q) ||
      s.location?.toLowerCase().includes(q)
    );
    setFiltered(results);
  };

  return (
    <>
      <Head>
        <title>Tade Autism Centre - Specialist Directory</title>
        <meta
          name="description"
          content="Search for autism specialists near you by name, type or location."
        />
      </Head>

      <div
  className="min-h-screen py-12 px-4 text-gray-900 relative bg-fixed bg-cover bg-center"
  style={{ backgroundImage: "url('/directory-bg.png')" }}
>
  {/* Polished Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80 backdrop-blur-sm"></div>


        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8 fade-in-1">
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

          <div className="max-w-5xl mx-auto text-center fade-in-2">
            <h1 className="text-4xl font-bold mb-4 text-blue-900 drop-shadow">
              Find a Specialist
            </h1>
            <p className="mb-10 text-gray-800 text-lg bg-white/60 inline-block px-4 py-2 rounded-xl backdrop-blur-sm shadow">
              Browse autism specialists by name, expertise, or location. We’ll help you connect with the right support.
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-8 flex justify-center fade-in-3">
            <input
              type="text"
              placeholder="Search by name, type or location"
              value={query}
              onChange={handleSearch}
              className="w-full max-w-xl px-4 py-3 rounded-xl border border-white/60 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur-sm placeholder-gray-500 text-gray-900"
              aria-label="Search specialists"
            />
          </div>

          {/* Results */}
          <div className="fade-in-4">
            {loading ? (
              <div className="text-center text-gray-600 text-lg">Loading specialists...</div>
            ) : filtered.length > 0 ? (
              <>
                <p className="mb-4 text-center text-sm text-gray-700">
                  Showing {filtered.length} result{filtered.length !== 1 && 's'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((s, idx) => (
                    <div
                      key={idx}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg fade-in-card"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <h2 className="text-xl font-semibold text-blue-800">{s.name}</h2>
                      <p className="text-sm text-gray-700 mt-1">
                        {s.type} — {s.location}
                      </p>
                      <div className="mt-4 text-sm space-y-1 text-gray-800">
                        <p><strong>Email:</strong> {s.contact?.email || 'N/A'}</p>
                        <p><strong>Phone:</strong> {s.contact?.phone || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center mt-12">
                <p className="text-lg text-gray-600">
                  😕 No specialists found matching your search.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Try different keywords or check your spelling.
                </p>
              </div>
            )}
          </div>

          {/* Back to top */}
          <div className="mt-16 text-center fade-in-5">
            <a
              href="#top"
              className="text-blue-700 underline text-sm hover:text-blue-900"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
