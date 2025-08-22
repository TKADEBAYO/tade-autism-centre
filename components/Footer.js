import { FaFacebook, FaInstagram, FaStore } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="text-center text-sm py-10 bg-black mt-8 border-t border-gray-800 text-white">
      <p className="font-medium">© 2025 Tade Autism Centre</p>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mt-4">
        {/* TadeStore */}
        <a
          href="https://www.tadestore.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <div className="bg-yellow-500 rounded-full p-3 mb-1 hover:scale-110 transition">
            <FaStore className="text-2xl text-white" />
          </div>
          <span className="text-xs">TadeStore</span>
        </a>

        {/* Stan Store */}
        <a
          href="https://www.stan.store/folukt3"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <div className="bg-purple-600 rounded-full p-3 mb-1 hover:scale-110 transition">
            <FiPackage className="text-2xl text-white" />
          </div>
          <span className="text-xs">Stan Store</span>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/tadeautismcentre"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <div className="bg-blue-600 rounded-full p-3 mb-1 hover:scale-110 transition">
            <FaFacebook className="text-2xl text-white" />
          </div>
          <span className="text-xs">Facebook</span>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/tadeautismcentre"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <div className="bg-pink-500 rounded-full p-3 mb-1 hover:scale-110 transition">
            <FaInstagram className="text-2xl text-white" />
          </div>
          <span className="text-xs">Instagram</span>
        </a>
      </div>

      {/* Contact Info */}
      <div className="mt-6 text-gray-400 text-sm">
        <p>
          Email:{" "}
          <a
            href="mailto:info@tadeautismcentre.org"
            className="text-blue-400 hover:underline"
          >
            info@tadeautismcentre.org
          </a>
        </p>
        <p>
          Phone:{" "}
          <a
            href="tel:+447737413749"
            className="text-blue-400 hover:underline"
          >
            +44 7737 413749
          </a>
        </p>
      </div>

      {/* Legal Links */}
      <div className="flex justify-center gap-6 mt-4 text-xs text-gray-500">
        <a href="/privacy-policy" className="hover:text-gray-300">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-gray-300">
          Terms of Service
        </a>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-6 text-blue-400 text-xs hover:underline"
      >
        ↑ Back to Top
      </button>
    </footer>
  );
}
