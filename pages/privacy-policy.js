import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function PrivacyPolicy() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen relative text-gray-900 transition-opacity duration-1000 ease-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png" // 👈 replace with /privacy-bg.png if you add one
          alt="Privacy Policy Background"
          layout="fill"
          objectFit="cover"
          priority
          quality={90}
          className="z-0"
        />
        <div className="absolute inset-0 bg-gray-100/70 backdrop-blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 px-6 pb-20"> 
        {/* 👆 Added pb-20 to push content up above footer */}
        <Head>
          <title>Privacy Policy - Tade Autism Centre</title>
          <meta
            name="description"
            content="Learn how Tade Autism Centre collects, uses, and protects your personal information. Read our full privacy policy here."
          />
          <meta
            name="keywords"
            content="privacy policy, autism support, Tade Autism Centre data protection, GDPR, autism UK"
          />
        </Head>

        {/* Frosted Glass Text Box */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 leading-relaxed fade-in-1 mb-16">
          {/* 👆 Added mb-16 so box never collides with footer */}

          {/* Header */}
          <h1 className="text-4xl font-extrabold text-orange-600 mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Effective Date: {new Date().toLocaleDateString()}
          </p>

          {/* Intro */}
          <p className="mb-6 fade-in-2">
            At <strong>Tade Autism Centre</strong>, we value your trust. We are committed
            to protecting your privacy and ensuring your personal data is handled with
            transparency, integrity, and care. This Privacy Policy explains what data we
            collect, how we use it, and the rights you have regarding your information.
          </p>

          {/* Sections */}
          <section className="mb-8 fade-in-3">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Name, email address, and phone number</li>
              <li>Details provided in forms (assessments, consultations, or subscriptions)</li>
              <li>
                Technical data such as IP address and browser type (for security and
                analytics)
              </li>
            </ul>
          </section>

          <section className="mb-8 fade-in-4">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Providing autism assessments, resources, and tailored support</li>
              <li>Improving our services and website experience</li>
              <li>
                Sending updates, newsletters, and relevant information (with your consent)
              </li>
              <li>Responding to enquiries and support requests</li>
            </ul>
          </section>

          <section className="mb-8 fade-in-5">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              3. Data Security
            </h2>
            <p>
              We take strong precautions to protect your data. This includes using secure
              servers, encrypted communications (SSL), and restricted staff access to
              sensitive information.
            </p>
          </section>

          <section className="mb-8 fade-in-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              4. Sharing Your Data
            </h2>
            <p>
              We do <strong>not</strong> sell or trade your personal data. However, we may
              share it with trusted third-party providers (such as payment processors or
              email services) who support our operations, under strict confidentiality.
            </p>
          </section>

          <section className="mb-8 fade-in-7">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">5. Your Rights</h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access and request a copy of the data we hold about you</li>
              <li>Correct or update inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:info@tadeautismcentre.org"
                className="text-blue-600 underline"
              >
                info@tadeautismcentre.org
              </a>
              .
            </p>
          </section>

          <section className="mb-8 fade-in-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              6. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy occasionally to reflect changes in law or
              our practices. Please revisit this page periodically for updates.
            </p>
          </section>

          {/* Closing */}
          <div className="bg-orange-50/80 backdrop-blur-sm p-4 rounded-lg text-sm text-gray-700 mt-10 fade-in-9">
            <p>
              For any questions about this Privacy Policy or how we handle your data,
              please reach out to us at{" "}
              <a
                href="mailto:info@tadeautismcentre.org"
                className="text-blue-600 underline"
              >
                info@tadeautismcentre.org
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
