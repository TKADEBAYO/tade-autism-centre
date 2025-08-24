import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Adults() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('✅ Message sent! We’ll reply soon.');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 4000);
  };

  return (
    <>
      <Head>
        <title>Tade Autism Centre - Adult Autism Support & Life Skills</title>
        <meta
          name="description"
          content="Life skills, 1-to-1 coaching, and employment support for autistic adults. Join our day centres, gain independence, and build confidence with Tade Autism Centre."
        />
        <meta
          name="keywords"
          content="autism adult support, autism life skills, autism coaching, autism employment help, adult autism UK, autistic adult day programmes, autism work skills UK, life coaching for autistic adults, supported employment autism UK"
        />
      </Head>

       {/* Background wrapper */}
      <div
        className="min-h-screen relative text-gray-900 px-4"
        style={{
          backgroundImage: "url('/autistic-adults-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

        {/* Page Content */}
        <div className="relative z-10 max-w-6xl mx-auto font-sans pt-32 md:pt-40">
          {/* 👆 Added pt-32 so logo/heading sit below fixed navbar */}

          {/* Logo */}
          <div className="flex justify-center mb-8 fade-in-1">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/Tade_Autism_Centre.png"
                alt="Tade Autism Centre Logo"
                width={120}
                height={120}
                className="rounded-full shadow-lg hover:scale-105 transition-transform"
                priority
              />
            </Link>
          </div>


          <h1 className="text-4xl font-bold text-center mb-6 text-blue-900 fade-in-2">
            Support for Autistic Adults
          </h1>
          <p className="text-center mb-8 text-lg max-w-2xl mx-auto fade-in-2">
            Our adult services focus on empowerment, life planning, and creating pathways to independence and wellbeing.
          </p>

          {/* Core Services */}
          <div className="bg-white/80 rounded-xl shadow p-6 space-y-4 text-gray-800 fade-in-3">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Specialist day centres:</strong> Structured programs in art, literacy, and independent living skills.</li>
              <li><strong>1-to-1 coaching:</strong> Work with mentors to build confidence, set goals, and plan for the future.</li>
              <li><strong>College & employment:</strong> Support with applications, job search, and workplace adjustments.</li>
              <li><strong>Financial literacy:</strong> Learn budgeting, spending, and money management for everyday life.</li>
            </ul>
          </div>

          {/* Skills Programmes */}
          <section className="mt-16 fade-in-3">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Our Skills Programmes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '🎨', title: 'Creative Arts', desc: 'Art therapy, music sessions, and creative expression workshops.' },
                { icon: '💻', title: 'Tech Skills', desc: 'Basic computer training, CV creation, and online safety.' },
                { icon: '🥗', title: 'Health & Wellbeing', desc: 'Fitness classes, healthy cooking, and stress management.' },
                { icon: '🤝', title: 'Community Engagement', desc: 'Volunteering opportunities and social outings.' }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-white/80 p-6 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition-transform fade-in-${i + 3}`}
                >
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    {item.icon} {item.title}
                  </h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <div className="mt-16 bg-white/80 p-6 rounded-lg shadow fade-in-4">
            <h2 className="text-xl font-bold mb-4 text-blue-800 text-center">📩 Get in Touch</h2>
            <p className="text-center mb-4">Ask us a question or request more details about our adult services.</p>
            {formStatus && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{formStatus}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border border-gray-300 rounded bg-white/80 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Testimonials */}
          <div className="mt-16 bg-white/80 p-6 rounded-lg shadow text-gray-800 fade-in-5">
            <h2 className="text-xl font-bold mb-4 text-blue-800">🌟 Testimonials</h2>
            <blockquote className="border-l-4 border-orange-500 pl-4 italic mb-4">
              “The coaching sessions helped me get my first job and manage anxiety at work. I finally feel seen.”
              <span className="block mt-2 font-medium">— Ade, Age 24</span>
            </blockquote>
            <blockquote className="border-l-4 border-orange-500 pl-4 italic">
              “My daughter joined the adult centre and now she’s planning to apply to college. We never thought this was possible.”
              <span className="block mt-2 font-medium">— Carer of Kemi, Age 21</span>
            </blockquote>
          </div>

          {/* WhatsApp Floating Button */}
          <a
            href="https://wa.me/447737413749"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 bg-green-600 p-4 rounded-full shadow-lg hover:bg-green-700 transition text-white text-2xl"
            aria-label="Chat with us on WhatsApp"
          >
            💬
          </a>
        </div>
      </div>
    </>
  );
}
