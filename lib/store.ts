import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, subDays } from 'date-fns';

// --- TYPES ---

export type LeadStatus = "New" | "Contacted" | "Quoted" | "Won" | "Lost";

export interface Lead {
    id: string;
    name: string;
    eventType: string; // e.g. "Wedding Photography"
    date: string; // ISO string
    guests: number;
    budget: string;
    location: string;
    status: LeadStatus;
    recievedAt: string; // ISO string
    phone: string;
    email: string;
    notes?: string;
    quoteId?: string; // If a quote was sent
}

export interface QuoteTemplate {
    id: string;
    name: string;
    category: string;
    price: number; // Stored as number for math
    priceParams: string; // "base price", "per day", etc
    inclusions: string[];
    lastUsed: string; // ISO
}

export interface Offer {
    id: string;
    title: string;
    type: "discount" | "last_minute" | "weekday";
    value: string;
    condition: string;
    status: "active" | "inactive";
}

export interface CalendarEvent {
    id: string;
    date: string; // ISO
    title: string;
    type: "booked" | "inquiry" | "blocked";
    time?: string;
    leadId?: string; // Link to lead if applicable
}

export interface PortfolioItem {
    id: string;
    type: "image" | "video";
    url: string;
    category: string;
    likes: number;
}

export interface VendorProfile {
    businessName: string;
    ownerName: string;
    email: string;
    phone: string;
    category: string;
    location: string;
    about: string;
    services: string[];
}

interface VendorState {
    // DATA
    profile: VendorProfile;
    leads: Lead[];
    quotes: QuoteTemplate[];
    offers: Offer[];
    calendarEvents: CalendarEvent[];
    portfolio: PortfolioItem[];

    // ACTIONS
    // Profile
    updateProfile: (profile: VendorProfile) => void;

    // Leads
    updateLeadStatus: (id: string, status: LeadStatus) => void;
    addLead: (lead: Lead) => void;

    // Quotes
    addQuote: (quote: QuoteTemplate) => void;
    deleteQuote: (id: string) => void;

    // Offers
    toggleOfferStatus: (id: string) => void;
    addOffer: (offer: Offer) => void;
    deleteOffer: (id: string) => void;

    // Calendar
    addCalendarEvent: (event: CalendarEvent) => void;

    // Portfolio
    addPortfolioItem: (item: PortfolioItem) => void;
    deletePortfolioItem: (id: string) => void;
}

// --- INITIAL MOCK DATA ---

const INITIAL_PROFILE: VendorProfile = {
    businessName: "LensQueue Photography",
    ownerName: "Aditya Roy",
    email: "contact@lensqueue.com",
    phone: "+91 98765 00000",
    category: "Photography & Videography",
    location: "Mumbai, Maharashtra",
    about: "Premium wedding photography services specializing in candid and cinematic styles.",
    services: ["Candid Photography", "Wedding Cinema", "Pre-Wedding Shoots", "Drone Coverage", "Albums"]
};

const INITIAL_LEADS: Lead[] = [
    {
        id: "1",
        name: "Ananya Sharma",
        eventType: "Wedding Photography",
        date: addDays(new Date(), 14).toISOString(),
        guests: 350,
        budget: "150000",
        location: "Udaipur",
        status: "New",
        recievedAt: subDays(new Date(), 0).toISOString(),
        phone: "+91 98765 43210",
        email: "ananya.s@gmail.com",
    },
    {
        id: "2",
        name: "Rohit Verma",
        eventType: "Corporate Event",
        date: addDays(new Date(), 5).toISOString(),
        guests: 120,
        budget: "80000",
        location: "Delhi NCR",
        status: "Contacted",
        recievedAt: subDays(new Date(), 1).toISOString(),
        phone: "+91 98123 45678",
        email: "rohit.v@corp.com",
    },
    {
        id: "3",
        name: "Priya & Rahul",
        eventType: "Pre-Wedding Shoot",
        date: addDays(new Date(), 25).toISOString(),
        guests: 0,
        budget: "40000",
        location: "Mumbai",
        status: "Quoted",
        recievedAt: subDays(new Date(), 2).toISOString(),
        phone: "+91 99988 77766",
        email: "priya.rahul@gmail.com",
    },
    {
        id: "4",
        name: "Vikram Malhotra",
        eventType: "Store Launch",
        date: addDays(new Date(), 2).toISOString(),
        guests: 50,
        budget: "25000",
        location: "Bangalore",
        status: "Won",
        recievedAt: subDays(new Date(), 5).toISOString(),
        phone: "+91 88888 77777",
        email: "vikram@brand.com",
    },
];

const INITIAL_QUOTES: QuoteTemplate[] = [
    {
        id: "1",
        name: "Wedding Premium Package",
        category: "Photography",
        price: 150000,
        priceParams: "base price",
        inclusions: ["Candid Photography", "Cinematic Video", "Drone Coverage", "300 Edited Photos", "Album"],
        lastUsed: subDays(new Date(), 2).toISOString(),
    },
    {
        id: "2",
        name: "Standard Birthday",
        category: "Photography",
        price: 25000,
        priceParams: "per day",
        inclusions: ["4 Hours Coverage", "Unlimited Soft Copies", "Highlights Video"],
        lastUsed: subDays(new Date(), 7).toISOString(),
    },
];

const INITIAL_OFFERS: Offer[] = [
    {
        id: "1",
        title: "Weekday Wedding Special",
        type: "weekday",
        value: "15% OFF",
        condition: "Valid for Mon-Thu bookings",
        status: "active",
    },
    {
        id: "2",
        title: "Last Minute Deal",
        type: "last_minute",
        value: "Flat ₹5,000 OFF",
        condition: "Bookings within 7 days",
        status: "active",
    },
];

const INITIAL_PORTFOLIO: PortfolioItem[] = [
    { id: "1", type: "image", url: "bg-red-100", category: "Wedding", likes: 45 },
    { id: "2", type: "image", url: "bg-blue-100", category: "Pre-Wedding", likes: 112 },
    { id: "3", type: "video", url: "bg-gray-800", category: "Teaser", likes: 89 },
];

// --- STORE ---

export const useVendorStore = create<VendorState>()(
    persist(
        (set) => ({
            profile: INITIAL_PROFILE,
            leads: INITIAL_LEADS,
            quotes: INITIAL_QUOTES,
            offers: INITIAL_OFFERS,
            calendarEvents: [],
            portfolio: INITIAL_PORTFOLIO,

            // ACTIONS
            updateProfile: (profile) => set({ profile }),

            updateLeadStatus: (id, status) => set((state) => ({
                leads: state.leads.map(l => l.id === id ? { ...l, status } : l)
            })),

            addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),

            addQuote: (quote) => set((state) => ({ quotes: [quote, ...state.quotes] })),
            deleteQuote: (id) => set((state) => ({ quotes: state.quotes.filter(q => q.id !== id) })),

            toggleOfferStatus: (id) => set((state) => ({
                offers: state.offers.map(o => o.id === id ? { ...o, status: o.status === "active" ? "inactive" : "active" } : o)
            })),
            addOffer: (offer) => set((state) => ({ offers: [offer, ...state.offers] })),
            deleteOffer: (id) => set((state) => ({ offers: state.offers.filter(o => o.id !== id) })),

            addCalendarEvent: (event) => set((state) => ({ calendarEvents: [...state.calendarEvents, event] })),

            addPortfolioItem: (item) => set((state) => ({ portfolio: [item, ...state.portfolio] })),
            deletePortfolioItem: (id) => set((state) => ({ portfolio: state.portfolio.filter(p => p.id !== id) })),

        }),
        {
            name: 'eventmate-vendor-storage',
        }
    )
);
