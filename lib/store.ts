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
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    category: "",
    location: "",
    about: "",
    services: []
};

const INITIAL_LEADS: Lead[] = [];

const INITIAL_QUOTES: QuoteTemplate[] = [];

const INITIAL_OFFERS: Offer[] = [];

const INITIAL_PORTFOLIO: PortfolioItem[] = [];

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
