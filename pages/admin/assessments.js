import { useEffect, useState } from "react";
import Head from "next/head";
import { getAuth } from "firebase/auth";
import { app } from "../../lib/firebaseConfig";
import Link from "next/link";
import Image from "next/image";

export default function AdminAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (!user) {
          setError("❌ You must be logged in as admin to view assessments.");
          setLoading(false);
          return;
        }

        const token = await user.getIdToken();

        const res = await fetch("/api/assessments/submit", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setAssessments(data.data);
        } else {
          setError(data.error || "Failed to fetch assessments");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Failed to load assessments.");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div
      className={`min-h-screen text-gray-900 py-12 px-4 relative transition-opacity duration-1000 ease-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: "url('/assessments-bg.png')", // same bg as family form
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="relative z-10 pt-32 max-w-6xl mx-auto">
        <Head>
          <title>Admin - View Assessments</title>
        </Head>

        {/* Logo */}
        <div className="flex justify-center mb-6 fade-in-1">
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/Tade_Autism_Centre.png"
              alt="Tade Autism Centre Logo"
              width={100}
              height={100}
              className="rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm fade-in-2">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-800 fade-in-3">
            📋 Submitted Assessments
          </h1>

          {loading && <p className="text-gray-700 text-center">Loading assessments...</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {!loading && !error && assessments.length === 0 && (
            <p className="text-gray-700 text-center">No assessments submitted yet.</p>
          )}

          {!loading && !error && assessments.length > 0 && (
            <div className="overflow-x-auto fade-in-4">
              <table className="w-full border border-gray-200 rounded-lg text-sm">
                <thead className="bg-blue-100 text-blue-900">
                  <tr>
                    <th className="p-3 border">Child's Name</th>
                    <th className="p-3 border">Age</th>
                    <th className="p-3 border">Concerns</th>
                    <th className="p-3 border">Parent Email</th>
                    <th className="p-3 border">Phone</th>
                    <th className="p-3 border">Preferred Date</th>
                    <th className="p-3 border">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((a) => (
                    <tr key={a._id} className="hover:bg-gray-50">
                      <td className="p-3 border">{a.name}</td>
                      <td className="p-3 border">{a.age}</td>
                      <td className="p-3 border">{a.concerns}</td>
                      <td className="p-3 border">{a.parentEmail}</td>
                      <td className="p-3 border">{a.parentPhone}</td>
                      <td className="p-3 border">{a.preferredDate || "—"}</td>
                      <td className="p-3 border">
                        {new Date(a.submittedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Back button */}
          <div className="text-center mt-6">
            <Link
              href="/admin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
            >
              ← Back to Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
