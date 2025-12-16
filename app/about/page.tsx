"use client";

export default function AboutPage() {
  return (
    <main className="pt-32 pb-32 bg-white text-gray-900">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block mb-4 px-4 py-1 text-xs rounded-full bg-gray-100">
          About EventMate
        </span>

        <h1 className="text-4xl md:text-5xl font-semibold max-w-3xl mx-auto">
          We make event planning simpler,
          smarter, and more human.
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          EventMate is built to connect people with trusted event
          professionals — without commissions, confusion, or stress.
        </p>
      </section>

      {/* STORY */}
      <section className="mt-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-semibold">
            Why EventMate exists
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Planning an event shouldn’t feel overwhelming.
            Yet for most people, finding reliable vendors,
            comparing options, and managing bookings becomes stressful.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            EventMate was created to change that — a platform
            where users discover verified vendors, and vendors
            grow their business without unfair platform cuts.
          </p>
        </div>

        <div className="rounded-3xl h-[360px] bg-gradient-to-br from-indigo-500 to-purple-600" />
      </section>

      {/* VALUES */}
      <section className="mt-32 bg-[#F7F7FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">
            What we stand for
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Trust First",
                desc: "Verified vendors, real profiles, transparent communication.",
              },
              {
                title: "Zero Commission",
                desc: "We don’t take unfair cuts from vendors or customers.",
              },
              {
                title: "Human Support",
                desc: "We’re here to help — before, during, and after your event.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mt-32 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
        {[
          { value: "1,200+", label: "Verified Vendors" },
          { value: "50,000+", label: "Events Supported" },
          { value: "0%", label: "Commission Model" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl font-semibold text-[#6D5DF6]">
              {stat.value}
            </p>
            <p className="mt-2 text-gray-600">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

    </main>
  );
}
