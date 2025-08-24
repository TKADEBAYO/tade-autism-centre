import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'tac_lead_seen_at';

export default function LeadCapture({ delayMs = 8000, repeatDays = 7, debug = false }) {
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', consent: false, company: '' });
  const firstFieldRef = useRef(null);

  // Show popup after delay, unless recently dismissed
  useEffect(() => {
    const last = localStorage.getItem(STORAGE_KEY);
    const seenRecently =
      last && Date.now() - Number(last) < repeatDays * 24 * 60 * 60 * 1000;

    if (!debug && seenRecently) return; // 🔥 Debug bypass if needed

    const timer = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs, repeatDays, debug]);

  useEffect(() => {
    if (!show) return;
    firstFieldRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setShow(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show]);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setShow(false);
  };

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.company) return; // bot trap
    if (!form.name || !form.email || !form.consent)
      return alert('Please complete all fields and consent.');
    try {
      setSubmitting(true);
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, source: 'popup' }),
      });
      if (!res.ok) throw new Error('Failed');
      setSuccess(true);
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (err) {
      alert('Sorry, something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-start z-50 p-4 overflow-y-auto animate-fadeIn"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 max-w-sm w-full text-left animate-popIn mt-24">
        {!success ? (
          <>
            <h2 className="text-2xl font-bold mb-2 text-orange-600">Get Your Free Autism Resource Pack</h2>
            <p className="text-sm mb-4 text-gray-600">Guides, checklists, and therapy tips—delivered to your inbox.</p>
            <form className="space-y-3" onSubmit={onSubmit}>
              {/* Honeypot for bots */}
              <input
                name="company"
                value={form.company}
                onChange={onChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <input
                ref={firstFieldRef}
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={onChange}
                  className="mt-1"
                />
                <span>
                  I agree to receive email updates from Tade Autism Centre. See our{' '}
                  <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>.
                </span>
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="bg-orange-600 text-white w-full py-3 rounded-lg hover:bg-orange-700 disabled:opacity-60 transition"
              >
                {submitting ? 'Sending…' : 'Get My Pack'}
              </button>
              <button
                type="button"
                onClick={close}
                className="block w-full text-center text-xs text-gray-500 underline"
              >
                No thanks
              </button>
            </form>
          </>
        ) : (
          <div className="text-center animate-fadeIn">
            <h3 className="text-xl font-semibold">You're all set ✅</h3>
            <p className="text-gray-600 mt-2">
              Check your inbox for the resource pack. Thanks for supporting our mission!
            </p>
            <button onClick={close} className="mt-4 text-blue-600 underline text-sm">Close</button>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-popIn {
          animation: popIn 0.35s ease forwards;
        }
      `}</style>
    </div>
  );
}
