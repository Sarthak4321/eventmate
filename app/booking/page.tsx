"use client";

export default function BookingPage() {
  return (
    <main className="pt-32 pb-32 bg-[#F7F7FB]">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-4xl font-semibold">
          Book your vendor
        </h1>
        <p className="mt-4 text-gray-600">
          Share your requirements and get confirmed quickly.
        </p>

        <div className="mt-10 bg-white rounded-3xl p-10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.35)] space-y-5">
          <input className="w-full px-4 py-3 border rounded-xl" placeholder="Your Name" />
          <input className="w-full px-4 py-3 border rounded-xl" placeholder="Email" />
          <input className="w-full px-4 py-3 border rounded-xl" placeholder="Event Date" />
          <textarea className="w-full px-4 py-3 border rounded-xl" placeholder="Event details" />

          <button className="w-full py-4 rounded-full bg-black text-white">
            Submit Booking Request
          </button>
        </div>

      </div>
    </main>
  );
}
