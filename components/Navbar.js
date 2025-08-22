import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const menuRef = useRef();

  const navLinks = [
    { href: '/assessments', label: 'Assessments' },
    { href: '/directory', label: 'Directory' },
    { href: '/ehcp', label: 'EHCP' },
    { href: '/adults', label: 'Adults' },
    { href: '/daycentres', label: 'Day Centres' },
    { href: '/admin', label: 'Admin' },
    { href: '/login', label: 'Login' },
  ];

  const linkClass = (path) =>
    router.pathname === path
      ? 'text-orange-600 font-semibold relative after:block after:h-[2px] after:bg-orange-600 after:mt-1'
      : 'hover:text-orange-500 transition-colors relative after:block after:h-[2px] after:bg-orange-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left';

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Close on Esc key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Detect scroll for sticky effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/Tade_Autism_Centre.png"
            alt="Tade Autism Centre Logo"
            width={40}
            height={40}
            className="rounded-full group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-bold text-xl text-orange-600 group-hover:text-orange-700 transition-colors">
            Tade Autism Centre
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          {/* CTA Button */}
          <Link
            href="/subscribe"
            className="ml-4 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition-transform hover:scale-105"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none text-3xl text-gray-700"
        >
          {isOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end md:hidden">
          <div
            ref={menuRef}
            className="bg-white shadow-lg w-64 h-full flex flex-col items-start py-6 px-6 animate-slideIn"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkClass(link.href)} text-lg py-2`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA Button inside mobile menu */}
            <Link
              href="/subscribe"
              className="mt-4 w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold shadow"
              onClick={() => setIsOpen(false)}
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>
    </nav>
  );
}
