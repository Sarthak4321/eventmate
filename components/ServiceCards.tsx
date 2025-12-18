import Link from "next/link";
import { SERVICES } from "@/lib/services";

export function ServiceCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="
              group
              relative
              h-[260px]
              sm:h-[300px]
              rounded-3xl
              overflow-hidden
              focus:outline-none
              focus:ring-2
              focus:ring-black/40
            "
          >
            {/* Image */}
            <img
              src={service.image}
              alt={service.title}
              className="
                absolute inset-0 w-full h-full object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-105
              "
            />

            {/* Overlay */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/70
                via-black/30
                to-transparent
                transition
                group-hover:from-black/80
              "
            />

            {/* Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl sm:text-2xl font-semibold leading-tight">
                {service.title}
              </h3>

              <p className="mt-2 text-sm text-white/80 line-clamp-2">
                {service.desc}
              </p>

              <span
                className="
                  inline-flex items-center gap-1
                  mt-4 text-sm font-medium
                  opacity-0 translate-y-2
                  transition-all duration-300
                  group-hover:opacity-100
                  group-hover:translate-y-0
                "
              >
                Explore vendors →
              </span>
            </div>

            {/* Soft hover lift */}
            <div
              className="
                absolute inset-0 rounded-3xl
                transition-shadow duration-500
                group-hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]
              "
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
