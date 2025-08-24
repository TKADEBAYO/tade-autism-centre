import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LeadCapture from '../components/LeadCapture';
import { useState, useEffect } from 'react';

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen relative text-gray-900 p-6 transition-opacity duration-1000 ease-out ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt="Tade Autism Centre Background"
          layout="fill"
          objectFit="cover"
          priority
          quality={90}
          className="z-0"
        />
        <div className="absolute inset-0 bg-blue-50/70 backdrop-blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32"> {/* 👈 Push content down below Navbar */}
        {/* SEO Head */}
        <Head>
          <title>Tade Autism Centre - Home</title>
          <meta
            name="description"
            content="Support, therapy, and assessments for autistic individuals and their families. Based in London."
          />
          <meta property="og:title" content="Tade Autism Centre" />
          <meta
            property="og:description"
            content="Empowering autistic families with EHCP support, day centres, therapies and more."
          />
          <meta property="og:image" content="/logo.png" />
        </Head>

        {/* Lead Capture Popup */}
        <LeadCapture />

        {/* Hero Section */}
        <section className="text-center py-10">
          <div className="flex justify-center mb-4 fade-in-1">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/Tade_Autism_Centre.png"
                alt="Tade Autism Centre Logo"
                width={150}
                height={150}
                priority
                className="rounded-full shadow-lg"
              />
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-blue-800 fade-in-2">
            Welcome to Tade Autism Centre
          </h1>
          <p className="max-w-xl mx-auto text-lg fade-in-3">
            We empower families, carers, and autistic individuals with expert assessments,
            therapy resources, adult day centres, and EHCP guidance.
          </p>
        </section>

        {/* Quick Navigation Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <Link href="/assessments" className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition fade-in-4">
            <h2 className="font-semibold text-xl text-blue-700 mb-2">🧠 Child Assessments</h2>
            <p className="text-gray-700">
              Access developmental screenings and expert evaluations tailored to your child’s needs.
            </p>
          </Link>
          <Link href="/daycentres" className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition fade-in-5">
            <h2 className="font-semibold text-xl text-blue-700 mb-2">🏢 Specialist Day Centres</h2>
            <p className="text-gray-700">
              Creative and supportive spaces for adults: art, literacy, tech skills, and more.
            </p>
          </Link>
          <Link href="/ehcp" className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition fade-in-6">
            <h2 className="font-semibold text-xl text-blue-700 mb-2">📚 EHCP & Education Support</h2>
            <p className="text-gray-700">
              Get guidance, letter templates, and a Section 41 school directory to secure an EHCP for your child.
            </p>
          </Link>
        </section>

        {/* Testimonial */}
        <section className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto text-center my-12 fade-in-7">
          <blockquote className="italic text-blue-800 text-lg mb-4">
            “The Tade Centre helped me understand the EHCP process and get the right support for my son. I’m forever grateful.”
          </blockquote>
          <p className="font-semibold">– Sarah, Mum from Barnet</p>
        </section>

        {/* Why Choose Us */}
        <section className="my-16 max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg fade-in-8">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
            Why Choose Tade Autism Centre?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-800 mt-6">
            <div className="fade-in-9">
              <h3 className="font-semibold mb-2">👩‍⚕️ Trusted Experts</h3>
              <p>Led by a passionate team of autism specialists, therapists, and parent advocates.</p>
            </div>
            <div className="fade-in-10">
              <h3 className="font-semibold mb-2">🌱 Holistic Support</h3>
              <p>We go beyond diagnosis – empowering families, carers, and autistic adults through every life stage.</p>
            </div>
            <div className="fade-in-11">
              <h3 className="font-semibold mb-2">📍 Community-Focused</h3>
              <p>Based in London and proudly supporting families across Barnet and beyond.</p>
            </div>
          </div>
        </section>

        {/* News & Updates */}
        <section className="my-16 max-w-4xl mx-auto fade-in-12">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">📰 Latest News</h2>
          <ul className="space-y-4 text-left text-gray-800">
            <li>📅 <strong>August 2025:</strong> New art therapy sessions launched at Barnet Day Centre!</li>
            <li>🎙️ <strong>Webinar:</strong> “Understanding EHCP Timelines” – Watch the replay <Link href="/events" className="text-blue-600 underline">here</Link></li>
            <li>🌍 <strong>Partnership:</strong> Tade Centre is now listed with the National Autism Network.</li>
          </ul>
        </section>

        {/* Support Section */}
        <section className="text-center my-12 fade-in-13">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Support Our Mission</h2>
          <p className="mb-6 text-lg max-w-xl mx-auto">
            Your support helps us reach more families. Shop, share, or follow to help empower autism care in our communities.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://www.tadestore.com"
              target="_blank"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded shadow transition"
            >
              Visit TadeStore
            </a>
            <a
              href="https://www.stan.store/folukt3"
              target="_blank"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded shadow transition"
            >
              Visit Stan Store
            </a>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center my-16 fade-in-14">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">Need Personal Support?</h3>
          <p className="mb-4 text-lg">Book a free 15-minute call or message us about assessments, EHCPs or therapy.</p>
          <Link
            href="/contact"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded transition font-semibold"
          >
            Contact Us Today
          </Link>
        </section>

        {/* Newsletter Signup */}
        <section className="text-center my-16 fade-in-15">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">📬 Stay Updated</h2>
          <p className="mb-4 text-lg">Sign up for new resources, events, and autism support tips delivered monthly.</p>
          <form className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded border border-gray-300 w-full sm:w-auto flex-1 bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-300 transition"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
