import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function DayCentres() {
  return (
    <div
      className="min-h-screen text-gray-900 relative bg-scroll bg-cover bg-center"
      style={{ backgroundImage: "url('/daycentres-bg.png')" }} // background scrolls with page
    >
      <Head>
        <title>Tade Autism Centre - Day Centres</title>
      </Head>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* Content */}
      <div className="relative z-10 pt-32 px-4"> {/* 👈 Add pt-32 so it clears navbar */}
        {/* Logo Section */}
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

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-6 drop-shadow fade-in-2">
            Tade Autism Day Centres
          </h1>
          <p className="text-center max-w-2xl mx-auto mb-10 text-lg text-gray-800 bg-white/60 p-4 rounded-xl backdrop-blur-sm shadow fade-in-3">
            Our adult day centres provide a vibrant and supportive environment
            where each individual chooses how they want to spend their day.
            These structured yet flexible sessions are designed to build life
            skills, foster creativity, and support independence.
          </p>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 fade-in-4">
            {[
              {
                title: "🎨 Art & Creative Expression",
                desc: "Painting, crafting, and expressive art activities led by inclusive facilitators."
              },
              {
                title: "💻 Literacy & Computer Skills",
                desc: "Basic literacy support and guided computer workshops for communication and tech confidence."
              },
              {
                title: "💰 Money Management",
                desc: "Learn budgeting, safe spending, and practical financial planning for everyday life."
              },
              {
                title: "🍳 Independent Living Skills",
                desc: "From cooking to personal care routines, these sessions build confidence at home and in the community."
              },
              {
                title: "🎶 Dance & Music Therapy",
                desc: "Movement and rhythm sessions that promote wellbeing, self-expression, and joy."
              }
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-sm p-5 rounded-xl shadow hover:scale-105 transition fade-in-5"
              >
                <h2 className="font-bold text-lg mb-2 text-blue-800">{service.title}</h2>
                <p className="text-gray-700">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* One-to-one coaching */}
          <div className="mt-12 text-center bg-white/70 backdrop-blur-sm rounded-xl shadow p-6 fade-in-6">
            <h3 className="text-3xl font-bold mb-2 text-blue-900">🧭 One-to-One Coaching</h3>
            <p className="max-w-xl mx-auto mb-6 text-lg text-gray-800">
              We offer 1-to-1 coaching sessions for both parents and autistic adults covering life planning, transitions, and personal empowerment.
            </p>
            <a
              href="/contact"
              className="inline-block bg-orange-600 text-white font-semibold px-6 py-3 rounded hover:bg-orange-700 transition"
            >
              Contact Us to Learn More
            </a>
          </div>

          {/* Locations */}
          <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-xl shadow p-6 fade-in-7">
            <h3 className="text-2xl font-bold text-blue-900 mb-3 text-center">📍 Centre Locations</h3>
            <ul className="text-center text-lg space-y-2 text-gray-700">
              <li><strong>North London Centre</strong> – Finchley Road, Barnet</li>
              <li><strong>East London Hub</strong> – Stratford High Street</li>
              <li><strong>Virtual Sessions</strong> – Available for remote learners UK-wide</li>
            </ul>
          </div>

          {/* Timetable snapshot */}
          <div className="mt-16 text-center bg-white/70 backdrop-blur-sm rounded-xl shadow p-6 fade-in-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">🗓 Weekly Snapshot</h3>
            <p className="max-w-2xl mx-auto mb-6 text-lg text-gray-800">
              Our flexible weekly timetable ensures there’s something for everyone. Clients can attend full or half days.
            </p>
            <div className="bg-white/80 rounded-xl shadow p-4 inline-block text-left text-sm text-gray-700">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Monday:</strong> Art & Cooking Skills</li>
                <li><strong>Tuesday:</strong> Literacy, Money Management</li>
                <li><strong>Wednesday:</strong> Independent Living, Music Therapy</li>
                <li><strong>Thursday:</strong> Computing, Goal Setting</li>
                <li><strong>Friday:</strong> Life Skills Review, Social Games</li>
              </ul>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-16 text-center bg-white/70 backdrop-blur-sm rounded-xl shadow p-6 max-w-3xl mx-auto fade-in-9">
            <blockquote className="italic text-blue-800 text-lg mb-4">
              “The Tade Centre changed my daughter’s life. She found joy in the music sessions and now helps with cooking at home.”
            </blockquote>
            <p className="font-semibold text-gray-700">– Maria O., Parent</p>
          </div>

          {/* Register Interest */}
          <div className="mt-16 text-center bg-white/70 backdrop-blur-sm rounded-xl shadow p-6 fade-in-10">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">📋 Ready to Register?</h3>
            <p className="mb-4 text-gray-800">
              Complete our quick form and we’ll reach out to arrange a visit or virtual intro call.
            </p>
            <a
              href="/register"
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded shadow-md transition"
            >
              Register Your Interest →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
