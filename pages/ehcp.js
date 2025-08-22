import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function EHCP() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-900 py-12 px-4">
      <Head>
        <title>Tade Autism Centre - EHCP & Educational Support</title>
        <meta
          name="description"
          content="Guidance and resources for families applying for EHCPs in the UK, including step-by-step support, letter templates, and SEND resources."
        />
      </Head>

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

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6 fade-in-2">
          EHCP & Educational Support
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-8 text-lg fade-in-2">
          We support families in understanding and applying for Education, Health and Care Plans (EHCPs).
          Our tools and guidance help you confidently advocate for your child throughout the process.
        </p>

        {/* Resource List */}
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto fade-in-3">
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-800">
            <li><strong>Step-by-step EHCP application guide:</strong> Know exactly what to expect and how to prepare.</li>
            <li><strong>Letter templates & checklists:</strong> Ready-to-use resources to strengthen your application.</li>
            <li><strong>Section 41 school directory:</strong> Explore approved special schools with the right provisions.</li>
            <li><strong>Local authority contact list:</strong> Connect quickly with your borough’s SEND support teams.</li>
          </ul>
        </div>

        {/* Downloadable Toolkit */}
        <div className="mt-10 bg-orange-100 border-l-4 border-orange-500 p-6 rounded-xl text-center max-w-3xl mx-auto fade-in-4">
          <h2 className="text-xl font-semibold text-orange-700 mb-2">📥 Download Our EHCP Toolkit (Free PDF)</h2>
          <p className="mb-4">Includes checklists, sample letters, and planning worksheets to guide you step-by-step.</p>
          <a
            href="/downloads/ehcp-toolkit.pdf"
            className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition font-medium"
          >
            Download the Toolkit →
          </a>
        </div>

        {/* Timeline Section */}
        <div className="mt-16 max-w-4xl mx-auto fade-in-5">
          <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">🗂 EHCP Process Timeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{ step: 'Week 0', label: 'Request Submitted' }, { step: 'Week 6', label: 'Assessment Decision' }, { step: 'Week 12', label: 'Draft Plan' }, { step: 'Week 20', label: 'Final EHCP Issued' }].map(({ step, label }) => (
              <div key={step} className="bg-white p-4 rounded shadow hover:scale-105 transition-transform duration-300">
                <p className="text-blue-800 font-bold">{step}</p>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 bg-white shadow rounded-xl p-6 text-center max-w-3xl mx-auto fade-in-6">
          <blockquote className="italic text-blue-800 text-lg mb-4">
            “Thanks to Tade Autism Centre, we received an EHCP for our son within 20 weeks. Their support made the process feel less overwhelming.”
          </blockquote>
          <p className="font-semibold">– Aisha, Parent from South London</p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto fade-in-7">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">❓ Common EHCP Questions</h3>
          <div className="space-y-4 text-gray-800 text-lg">
            <div>
              <strong>How long does it take to get an EHCP?</strong>
              <p>The full process takes up to 20 weeks from request to final plan.</p>
            </div>
            <div>
              <strong>Can I request an EHCP myself?</strong>
              <p>Yes. Parents and carers have the legal right to request an assessment directly from the local authority.</p>
            </div>
            <div>
              <strong>What if my application is rejected?</strong>
              <p>We can support you with appeals, evidence collection, and communication with SEND services.</p>
            </div>
          </div>
        </div>

        {/* Who We Help */}
        <div className="mt-16 bg-blue-100 border-l-4 border-blue-500 p-6 rounded-xl max-w-3xl mx-auto fade-in-8">
          <h4 className="text-xl font-semibold text-blue-800 mb-2">👪 Who We Help</h4>
          <p className="text-gray-800 text-lg">
            Whether you're a first-time parent applying for an EHCP, or navigating appeals, our team supports families across England at every step.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-12 fade-in-9">
          <h3 className="text-xl font-bold mb-2 text-blue-800">📞 Book a Free EHCP Support Call</h3>
          <p className="mb-4 text-lg">Need help starting or reviewing your EHCP application? Our team is here to guide you.</p>
          <a
            href="/contact"
            className="inline-block bg-blue-700 text-white font-semibold px-6 py-3 rounded hover:bg-blue-800 transition"
          >
            Book a 15-min Call →
          </a>
        </div>
      </div>
    </div>
  );
}
