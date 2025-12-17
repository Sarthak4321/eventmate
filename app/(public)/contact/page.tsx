"use client";

export default function ContactPage() {
  return (
    <main className="pt-32 pb-32 bg-[#F7F7FB]">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block mb-4 px-4 py-1 text-xs rounded-full bg-white border">
          Get in touch
        </span>

        <h1 className="text-4xl md:text-5xl font-semibold">
          We’d love to hear from you
        </h1>

        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
          Whether you’re planning an event, a vendor looking to join,
          or just have a question — reach out anytime.
        </p>
      </section>

      {/* CONTENT */}
      <section className="mt-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* FORM */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Send us a message
          </h2>

          <form className="mt-6 space-y-4">
            <input
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border outline-none"
            />
            <input
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl border outline-none"
            />
            <textarea
              placeholder="Tell us how we can help"
              rows={5}
              className="w-full px-4 py-3 rounded-xl border outline-none resize-none"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white font-medium hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* INFO */}
        <div>
          <h2 className="text-2xl font-semibold">
            Contact information
          </h2>

          <p className="mt-4 text-gray-600">
            Prefer email or just want quick info?
          </p>

          <div className="mt-8 space-y-4 text-gray-600">
            <p>
              📧 Email: <span className="text-black">support@eventmate.in</span>
            </p>
            <p>
              📍 Location: India
            </p>
            <p>
              ⏱️ Response time: Within 24 hours
            </p>
          </div>

          <div className="mt-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl h-[220px]" />
        </div>

      </section>

    </main>
  );
}
