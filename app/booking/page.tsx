"use client";

import { useState } from "react";

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    // simulate API
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  }

  return (
    <main className="pt-32 pb-32 bg-[#F7F7FB] min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Book your vendor
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Share your requirements — vendors will contact you directly.
            No middlemen. No commission.
          </p>
        </div>

        {/* CARD */}
        <div className="mt-16 bg-white rounded-3xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.2)] p-10">

          {submitted ? (
            /* SUCCESS STATE */
            <div className="text-center py-20">
              <h2 className="text-3xl font-semibold">
                🎉 Request Sent Successfully!
              </h2>
              <p className="mt-4 text-gray-600">
                Vendors will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* BASIC INFO */}
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  required
                  placeholder="Your Full Name"
                  className="input"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="input"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  required
                  placeholder="Phone Number"
                  className="input"
                />
                <select required className="input">
                  <option value="">Event Type</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                  <option>Other</option>
                </select>
              </div>

              {/* EVENT DETAILS */}
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  required
                  type="date"
                  className="input"
                />
                <input
                  required
                  placeholder="Event Location / City"
                  className="input"
                />
              </div>

              <select className="input">
                <option>Estimated Budget</option>
                <option>Below ₹50,000</option>
                <option>₹50,000 – ₹1,00,000</option>
                <option>₹1,00,000+</option>
              </select>

              <textarea
                rows={4}
                placeholder="Tell us about your event (guests, theme, timing, etc.)"
                className="input resize-none"
              />

              {/* TRUST COPY */}
              <p className="text-sm text-gray-500">
                🔒 Your contact details are shared only with relevant vendors.
                No spam. No platform commission.
              </p>

              {/* CTA */}
              <button
                disabled={loading}
                className="w-full py-4 rounded-full bg-black text-white font-medium text-lg hover:opacity-90 transition"
              >
                {loading ? "Submitting..." : "Submit Booking Request"}
              </button>

            </form>
          )}
        </div>

        {/* WHAT HAPPENS NEXT */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "1. Submit request",
              desc: "Tell us what you need",
            },
            {
              title: "2. Vendors respond",
              desc: "Get quotes & availability",
            },
            {
              title: "3. Book directly",
              desc: "Finalize without commission",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="bg-white rounded-2xl p-6 shadow"
            >
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
