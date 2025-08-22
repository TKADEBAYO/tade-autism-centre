import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../lib/firebaseConfig';

export default function Login() {
  const auth = getAuth(firebaseApp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      window.location.href = '/assessments';
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError('❌ Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-scroll bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.png')" }} // 👈 Save the generated image in /public
    >
      <Head>
        <title>Tade Autism Centre - Admin Login</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="description"
          content="Admin login page for Tade Autism Centre."
        />
      </Head>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Logo */}
        <div className="mb-6 fade-in-1">
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

        {/* Login Box */}
        <div className="bg-white/90 backdrop-blur-sm max-w-md w-full rounded-xl shadow-lg p-6 fade-in-2">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6 fade-in-3">
            Admin Login
          </h1>

          {error && (
            <p className="text-red-600 text-center text-sm mb-4 fade-in-3">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4 fade-in-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right text-sm">
              <a href="/reset-password" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 w-full rounded transition disabled:opacity-50 hover:animate-pulse"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
