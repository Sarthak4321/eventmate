// lib/services.ts
export type ServiceStatus = "active" | "coming_soon";

export const SERVICES = [
  {
    title: "Weddings",
    slug: "weddings",
    desc: "Plan your dream wedding with our curated vendors",
    image: "/hero/wedding-venue.jpg",
    status: "active" as ServiceStatus,
  },
  {
    title: "Birthdays",
    slug: "birthdays",
    desc: "Make every birthday a memorable celebration",
    image: "/hero/birthday.png",
    status: "active" as ServiceStatus,
  },
  {
    title: "Corporate Events",
    slug: "corporate-events",
    desc: "Professional planning for conferences and meets",
    image: "/hero/corporate.png",
    status: "active" as ServiceStatus,
  },
  {
    title: "Family Functions",
    slug: "family-functions",
    desc: "Warm gatherings for your loved ones",
    image: "/hero/family.png",
    status: "active" as ServiceStatus,
  },
  {
    title: "Launch Events",
    slug: "launch-events",
    desc: "Grand launches for your next big thing",
    image: "/hero/launch.png",
    status: "active" as ServiceStatus,
  },
  {
    title: "Celebrations",
    slug: "celebrations",
    desc: "Celebrate life's special moments in style",
    image: "/hero/celebration.png",
    status: "active" as ServiceStatus,
  },
  // Coming Soon
  {
    title: "Loans",
    slug: "loans",
    desc: "Financial support for your big events",
    image: "/hero/loans-placeholder.jpg", // Placeholder
    status: "coming_soon" as ServiceStatus,
  },
  {
    title: "Travel",
    slug: "travel",
    desc: "Hassle-free travel arrangements for guests",
    image: "/hero/travel-placeholder.jpg",
    status: "coming_soon" as ServiceStatus,
  },
  {
    title: "Gifting",
    slug: "gifting",
    desc: "Curated gifts for every occasion",
    image: "/hero/gifting-placeholder.jpg",
    status: "coming_soon" as ServiceStatus,
  },
  {
    title: "Honeymoons",
    slug: "honeymoons",
    desc: "Romantic getaways for the perfect start",
    image: "/hero/honeymoon-placeholder.jpg",
    status: "coming_soon" as ServiceStatus,
  },
  {
    title: "Experiences",
    slug: "experiences",
    desc: "Unique experiences to remember forever",
    image: "/hero/experience-placeholder.jpg",
    status: "coming_soon" as ServiceStatus,
  },
];
