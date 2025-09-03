import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../lib/firebaseConfig"; // ✅ named export

export default function Login() {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Restrict login to specific admins only
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Only allow these emails
      const allowedAdmins = ["folukt3@gmail.com"];

      if (!allowedAdmins.includes(user.email)) {
        setError("❌ You are not authorised to access the admin panel.");
        setLoading(false);
        return;
      }

      // ✅ Success → redirect
      window.location.href = "/assessments";
    } catch (err) {
      console.error("Login Error:", err.code, err.message);
      setLoading(false);

      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("❌ Invalid email or password.");
      } else if (err.code === "auth/user-not-found") {
        setError("❌ No account found with this email.");
      } else {
        setError("❌ Login failed. Please try again.");
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 relative bg-scroll bg-cover bg-center transition-opacity duration-1000 ease-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: "url('/login-bg.png')" }}
    >
      <Head>
        <title>Tade Autism Centre - Admin Login</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="description"
          content="Admin login page for Tade Autism Centre."
        />
      </Head>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full pt-32">
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
            <p className="text-red-600 text-center text-sm mb-4 fade-in-3">
              {error}
            </p>
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
                className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
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
                className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right text-sm">
              <a
                href="/reset-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 w-full rounded transition disabled:opacity-50 hover:animate-pulse"
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
