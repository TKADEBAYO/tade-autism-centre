import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function TermsOfService() {
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
          src="/hero-bg.png" // 👈 replace with /terms-bg.png if you want a dedicated background
          alt="Terms of Service Background"
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
        {/* 👆 pb-20 prevents overlap with footer */}
        <Head>
          <title>Terms of Service - Tade Autism Centre</title>
          <meta
            name="description"
            content="Read the Terms of Service for Tade Autism Centre. Learn about the rules, conditions, and limitations of using our services."
          />
          <meta
            name="keywords"
            content="terms of service, autism support, Tade Autism Centre terms, legal, autism UK"
          />
        </Head>

        {/* Frosted Glass Text Box */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 leading-relaxed fade-in-1 mb-16">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-orange-600 mb-4 text-center">
            Terms of Service
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Effective Date: {new Date().toLocaleDateString()}
          </p>

          {/* Intro */}
          <p className="mb-6 fade-in-2">
            Welcome to <strong>Tade Autism Centre</strong>. By accessing or using our
            website, resources, and services, you agree to the following Terms of
            Service. Please read them carefully before using our site.
          </p>

          {/* Sections */}
          <section className="mb-8 fade-in-3">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              1. Use of Our Services
            </h2>
            <p>
              Our services are provided to support autistic individuals, carers, and
              families. You agree to use our resources for lawful purposes only and not
              in any way that could harm our organisation or other users.
            </p>
          </section>

          <section className="mb-8 fade-in-4">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              2. Accounts and Access
            </h2>
            <p>
              If you create an account with us, you are responsible for keeping your
              login credentials secure. Any activity under your account is your
              responsibility. We reserve the right to suspend or terminate accounts that
              breach our policies.
            </p>
          </section>

          <section className="mb-8 fade-in-5">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              3. Subscriptions and Payments
            </h2>
            <p>
              Subscription plans (monthly or annual) grant access to premium resources.
              Payments are processed securely via third-party providers. By subscribing,
              you agree to recurring billing unless cancelled prior to renewal.
            </p>
          </section>

          <section className="mb-8 fade-in-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              4. Intellectual Property
            </h2>
            <p>
              All content on this site, including guides, logos, designs, and resources,
              is owned by Tade Autism Centre. You may not copy, distribute, or reproduce
              our materials without permission.
            </p>
          </section>

          <section className="mb-8 fade-in-7">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              5. Limitation of Liability
            </h2>
            <p>
              Our resources are provided for educational and support purposes only. We
              are not liable for any direct, indirect, or incidental damages arising from
              the use of our website or services.
            </p>
          </section>

          <section className="mb-8 fade-in-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              6. Termination
            </h2>
            <p>
              We may suspend or terminate access to our services immediately, without
              notice, for conduct that we reasonably believe violates these Terms or is
              harmful to other users or our organisation.
            </p>
          </section>

          <section className="mb-8 fade-in-9">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Changes
              will be posted on this page with an updated effective date. Continued use
              of our services after updates means you accept the revised terms.
            </p>
          </section>

          {/* Closing */}
          <div className="bg-orange-50/80 backdrop-blur-sm p-4 rounded-lg text-sm text-gray-700 mt-10 fade-in-10">
            <p>
              If you have any questions about these Terms, please contact us at{" "}
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
