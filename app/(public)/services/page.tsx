"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Calendar,
    Wallet,
    CheckCircle2,
    Sparkles,
    ArrowRight,
    ShieldCheck,
    Heart,
    Camera,
    Music,
    ChefHat,
    Gift,
    Plane,
    Mic2,
    Users,
    Star,
    Zap
} from "lucide-react";
import Link from "next/link";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";



// --- Types & Data ---

type EventType = "Wedding" | "Birthday" | "Corporate" | "Other";
type BudgetRange = "₹1L - ₹5L" | "₹5L - ₹15L" | "₹15L - ₹30L" | "₹30L+" | "Custom";

interface ServiceStep {
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    priceRange: string;
    trustTag: string;
    slug: string;
    icon: React.ElementType;
}

interface Recommendation {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    rating: string;
    slug: string;
    icon: React.ElementType;
    minBudget?: number; // for logic
    luxury?: boolean;
}

const EVENTS: EventType[] = ["Wedding", "Birthday", "Corporate", "Other"];
const CITIES = ["Delhi", "Mumbai", "Bangalore", "Goa", "Jaipur", "Hyderabad"];
const BUDGETS: BudgetRange[] = ["₹1L - ₹5L", "₹5L - ₹15L", "₹15L - ₹30L", "₹30L+", "Custom"];

// --- SMART DATA ENGINE ---

const CORE_STEPS: Record<EventType, ServiceStep[]> = {
    "Wedding": [
        { id: "venue", stepNumber: 1, title: "Venue", description: "Defines your date, guest capacity & budget", priceRange: "From ₹1.5L", trustTag: "120+ verified venues", slug: "venues", icon: MapPin },
        { id: "catering", stepNumber: 2, title: "Catering", description: "The most important guest experience", priceRange: "₹800 - ₹2,500 / plate", trustTag: "Top Rated Chefs", slug: "catering", icon: ChefHat },
        { id: "decor", stepNumber: 3, title: "Decor & Themes", description: "Set the mood and visual style", priceRange: "₹50k - ₹5L+", trustTag: "Trendsetting Designs", slug: "decor", icon: Sparkles },
        { id: "photo", stepNumber: 4, title: "Photography", description: "Capture memories that last forever", priceRange: "₹45k - ₹2L", trustTag: "Award Winning Teams", slug: "photography", icon: Camera },
    ],
    "Birthday": [
        { id: "venue-bday", stepNumber: 1, title: "Party Venue", description: "Cafes, Halls, or Home Setup?", priceRange: "₹5k - ₹50k", trustTag: "Instant Booking", slug: "venues", icon: MapPin },
        { id: "decor-bday", stepNumber: 2, title: "Decor & Balloons", description: "Themed setups for the perfect vibe", priceRange: "From ₹3k", trustTag: "Custom Themes", slug: "decor", icon: Sparkles },
        { id: "cake", stepNumber: 3, title: "Cake & Treats", description: "Centerpiece of the celebration", priceRange: "₹1k - ₹10k", trustTag: "Freshly Baked", slug: "catering", icon: Gift },
    ],
    "Corporate": [
        { id: "venue-corp", stepNumber: 1, title: "Conference Venue", description: "Hotels or Convention Centers", priceRange: "₹50k+", trustTag: "GST Compliant", slug: "venues", icon: MapPin },
        { id: "av", stepNumber: 2, title: "AV & Tech", description: "Projectors, Sound, & Lighting", priceRange: "₹20k+", trustTag: "Technical Support", slug: "decor", icon: Mic2 },
        { id: "catering-corp", stepNumber: 3, title: "Corporate Catering", description: "Breakfast, Lunch, or High-Tea", priceRange: "₹500 / plate", trustTag: "Hygienic Standards", slug: "catering", icon: ChefHat },
    ],
    "Other": [
        { id: "venue-gen", stepNumber: 1, title: "Find a Space", description: "Start with where you want to host", priceRange: "Various Options", trustTag: "Verified Listings", slug: "venues", icon: MapPin },
        { id: "service-gen", stepNumber: 2, title: "Services", description: "Food, Photo, Decor & more", priceRange: "Custom Bundles", trustTag: "Vetted Vendors", slug: "all-services", icon: Sparkles },
    ],
};

const RECOMMENDATION_POOL: Record<EventType, Recommendation[]> = {
    "Wedding": [
        { id: "photo-lux", title: "Cinematic Wedding Film", subtitle: "For luxury weddings (300+ guests)", price: "₹1.5L - ₹3L", rating: "Netflix Quality", slug: "photography", icon: Camera, luxury: true },
        { id: "photo-std", title: "Candid Photography", subtitle: "Capture raw emotions beautifully", price: "₹65k - ₹1.2L", rating: "4.9 (150+ reviews)", slug: "photography", icon: Camera, luxury: false },
        { id: "makeup-lux", title: "Celebrity Makeup Artist", subtitle: "As seen in Vogue & Brides", price: "₹40k+", rating: "Exclusive", slug: "makeup", icon: Heart, luxury: true },
        { id: "makeup-std", title: "Bridal Makeup", subtitle: "HD & Airbrush Specialists", price: "₹15k - ₹30k", rating: "Top Rated", slug: "makeup", icon: Heart, luxury: false },
        { id: "choreog", title: "Sangeet Choreography", subtitle: "Get the family dancing", price: "₹20k package", rating: "Super Fun", slug: "entertainment", icon: Music, luxury: false },
    ],
    "Birthday": [
        { id: "magic", title: "Magician / Illusionist", subtitle: "Keeps kids engaged for 2+ hours", price: "₹8k - ₹15k", rating: "Highly Recommended", slug: "entertainment", icon: Zap, luxury: false },
        { id: "game", title: "Game Coordinator", subtitle: "Organized fun & prizes", price: "₹5k - ₹10k", rating: "Energetic Host", slug: "entertainment", icon: Users, luxury: false },
    ],
    "Corporate": [
        { id: "gifting", title: "Premium Gifting", subtitle: "Branded hampers & welcome kits", price: "₹1500 / kit", rating: "Bulk Deals", slug: "gifting", icon: Gift, luxury: true },
        { id: "standup", title: "Standup Comedian", subtitle: "Lighten the mood post-conference", price: "₹50k+", rating: "Corporate Friendly", slug: "entertainment", icon: Mic2, luxury: false },
    ],
    "Other": [],
};

const ADDONS: Record<EventType, Recommendation[]> = {
    "Wedding": [
        { id: "hm", title: "Honeymoon", subtitle: "Bali, Maldives Packages", price: "Deals available", rating: "", slug: "honeymoon", icon: Plane },
        { id: "inv", title: "E-Invites", subtitle: "Video & Web Invites", price: "From ₹3k", rating: "", slug: "invitations", icon: Calendar },
        { id: "loan", title: "Event Finance", subtitle: "0% EMI Options", price: "Instant Approval", rating: "", slug: "loans", icon: Wallet },
    ],
    "Birthday": [
        { id: "return", title: "Return Gifts", subtitle: "Personalized items", price: "From ₹150", rating: "", slug: "gifting", icon: Gift },
    ],
    "Corporate": [
        { id: "trans", title: "Transport", subtitle: "Cabs & Buses", price: "Custom Quotes", rating: "", slug: "transport", icon: Wallet },
    ],
    "Other": [],
};

// --- COMPONENTS ---

function ServiceStepCard({ step, index }: { step: ServiceStep; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group relative flex flex-col md:flex-row gap-6 bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-indigo-100 transition-all duration-300"
        >
            {/* Number Badge */}
            <div className="absolute -left-3 top-8 md:top-auto md:self-center bg-gray-900 text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded shadow-md z-10">
                STEP {step.stepNumber}
            </div>

            {/* Icon */}
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-indigo-50/80 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <step.icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
                <div className="flex md:items-center justify-between flex-col md:flex-row gap-2">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">{step.title}</h3>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-green-700 text-[10px] font-bold uppercase tracking-wide bg-green-50 px-2 py-1 rounded-full border border-green-100">
                            <CheckCircle2 className="w-3 h-3" />
                            {step.trustTag}
                        </span>
                    </div>
                </div>

                <p className="text-gray-500 font-medium leading-relaxed">{step.description}</p>

                <div className="pt-2 flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-md border border-gray-100 font-medium text-gray-600">
                        <Wallet className="w-3.5 h-3.5" /> {step.priceRange}
                    </span>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-4 md:mt-0 md:self-center shrink-0">
                <Link
                    href={`/services/${step.slug}`}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all w-full md:w-auto text-sm group-hover:shadow-md"
                >
                    View {step.title} <ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                </Link>
            </div>
        </motion.div>
    );
}

function RecommendationCard({ item }: { item: Recommendation }) {
    return (
        <Link
            href={`/services/${item.slug}`}
            className="block h-full group bg-white/80 border border-white/50 p-6 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
        >
            {item.luxury && (
                <div className="absolute top-0 right-0 bg-gray-900 text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl tracking-widest uppercase">
                    Premium
                </div>
            )}

            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${item.luxury ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                    <item.icon className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.subtitle}</p>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm py-3 border-t border-gray-100/50">
                <span className="font-semibold text-gray-900">{item.price}</span>
                {item.rating && (
                    <span className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" /> {item.rating}
                    </span>
                )}
            </div>
        </Link>
    );
}

export default function ServicesPage() {
    const [eventType, setEventType] = useState<EventType>("Wedding");
    const [city, setCity] = useState("Delhi");
    const [budget, setBudget] = useState<BudgetRange>("₹5L - ₹15L");
    const [date, setDate] = useState("");
    const [showContent, setShowContent] = useState(false);

    // Initial animation delay for smoother entrance
    useEffect(() => {
        const t = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Smart Recommendations Logic
    const recs = useMemo(() => {
        const pool = RECOMMENDATION_POOL[eventType] || [];
        // Filter based on budget - minimal logic for demo
        const isLuxuryBudget = budget === "₹30L+" || budget === "Custom";
        const isBudgetBudget = budget === "₹1L - ₹5L";

        return pool.filter(item => {
            if (isLuxuryBudget) return item.luxury;
            if (isBudgetBudget) return !item.luxury;
            return !item.luxury; // default to standard for mid-range
        }).slice(0, 3);
    }, [eventType, budget]);

    return (
        <main className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 selection:bg-indigo-100">

            {/* 🔹 SECTION 1: GUIDED ENTRY HERO */}
            <section className="relative bg-white pt-12 pb-20 md:pt-24 md:pb-28 border-b border-gray-100 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-extrabold tracking-widest uppercase mb-6"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Smart Event Assistant
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6"
                    >
                        Let’s plan your event.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-12"
                    >
                        Answer a few questions — we’ll guide you step by step.
                    </motion.p>

                    {/* Inputs Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

                            {/* Group 1 */}
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Event Type</label>
                                <Select value={eventType} onChange={(e) => setEventType(e.target.value as EventType)}
                                    className="h-14 font-semibold text-lg border-2 border-gray-100 hover:border-indigo-100 focus:border-indigo-500 rounded-2xl shadow-sm bg-gray-50/50" />
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Location</label>
                                <Select value={city} onChange={(e) => setCity(e.target.value)}
                                    className="h-14 font-medium border-2 border-gray-100 hover:border-indigo-100 focus:border-indigo-500 rounded-2xl shadow-sm  bg-gray-50/50">
                                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </Select>
                            </div>

                            {/* Group 2 */}
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Budget</label>
                                <Select value={budget} onChange={(e) => setBudget(e.target.value as BudgetRange)}
                                    className="h-14 font-medium border-2 border-gray-100 hover:border-indigo-100 focus:border-indigo-500 rounded-2xl shadow-sm bg-gray-50/50">
                                    {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                                </Select>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Date <span className="text-gray-300 font-normal normal-case">(Optional)</span></label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full h-14 bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-4 text-gray-900 font-medium hover:border-indigo-100 focus:border-indigo-500 focus:outline-none shadow-sm transition-all text-sm"
                                />
                            </div>

                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 🔹 SECTION 2: STICKY EVENT CONTEXT STRIP */}
            <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <div className="text-sm text-gray-900">
                            Planning a <strong className="font-bold">{eventType}</strong> in <strong className="font-bold">{city}</strong>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-gray-500">
                        <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-full"><Wallet className="w-3.5 h-3.5 text-gray-700" /> {budget}</span>
                        {date && <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-full"><Calendar className="w-3.5 h-3.5 text-gray-700" /> {date}</span>}
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-16 pb-32 space-y-24">

                {/* 🔹 SECTION 3: CORE SERVICES (VERTICAL STEPS) */}
                <section>
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                            For your {eventType}, these are the essentials
                        </h2>
                        <p className="text-gray-500 mt-2 text-lg">We recommend checking these off in this order.</p>
                    </div>

                    <div className="space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={eventType + budget}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid gap-6"
                            >
                                {CORE_STEPS[eventType]?.map((step, idx) => (
                                    <ServiceStepCard key={step.id} step={step} index={idx} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* 🔹 SECTION 4: SMART RECOMMENDATIONS */}
                {recs.length > 0 && (
                    <section className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white rounded-3xl -z-10 mx-[-20px] md:mx-[-40px]"></div>

                        <div className="mb-8 text-center md:text-left pt-6">
                            <span className="text-indigo-600 font-extrabold tracking-widest text-xs uppercase mb-3 block">Recommended for you</span>
                            <div className="flex flex-col md:flex-row md:items-end gap-3 justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Curated choices</h2>
                                    <p className="text-gray-500 text-sm mt-1">Based on your <strong>{budget}</strong> budget in <strong>{city}</strong>.</p>
                                </div>
                                <Link href={`/services/all`} className="hidden md:flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                                    See all options <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {recs.map(item => (
                                <RecommendationCard key={item.id} item={item} />
                            ))}
                        </div>

                        <div className="mt-6 text-center md:hidden">
                            <Link href={`/services/all`} className="inline-flex items-center text-sm font-semibold text-indigo-600">
                                See all options <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </section>
                )}

                {/* 🔹 SECTION 5: OPTIONAL ADD-ONS (Redesigned) */}
                {ADDONS[eventType]?.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Considering these?</h3>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">Optional</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {ADDONS[eventType].map((item, idx) => (
                                <Link
                                    key={item.id}
                                    href={`/services/${item.slug}`}
                                    className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Subtle gradient hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/30 group-hover:to-purple-50/30 transition-all duration-500"></div>

                                    <div className="relative w-12 h-12 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-indigo-600 group-hover:scale-110 group-hover:shadow-sm transition-all duration-300">
                                        <item.icon className="w-6 h-6" strokeWidth={1.5} />
                                    </div>

                                    <div className="relative pt-1">
                                        <h4 className="font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors">{item.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1.5 font-medium">{item.subtitle}</p>
                                        <div className="mt-3 inline-flex items-center text-[10px] uppercase tracking-wider font-bold text-gray-300 group-hover:text-indigo-400 transition-colors">
                                            View Options <ArrowRight className="w-3 h-3 ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

            </div>

            {/* 🔹 SECTION 6: TRUST REINFORCEMENT (Redesigned) */}
            <section className="border-t border-gray-200/60 bg-gradient-to-b from-white to-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-extrabold tracking-widest uppercase mb-4 border border-green-100/50">
                            <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure Platform
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Why India trusts EvntMet</h2>
                        <p className="text-gray-500 text-lg">We don't just list services. We verify, protect, and guide you.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "KYC Verified Vendors",
                                desc: "Every vendor submits ID proof, business registration, and past work history before getting listed.",
                                color: "text-emerald-600",
                                bg: "bg-emerald-50",
                                border: "group-hover:border-emerald-200"
                            },
                            {
                                icon: Wallet,
                                title: "Transparent Pricing",
                                desc: "No hidden 'wedding taxes'. See standard starting packages and negotiate directly.",
                                color: "text-blue-600",
                                bg: "bg-blue-50",
                                border: "group-hover:border-blue-200"
                            },
                            {
                                icon: Users,
                                title: "Direct Connection",
                                desc: "Chat, call, or meet vendors directly. We simply make the introduction safe and easy.",
                                color: "text-purple-600",
                                bg: "bg-purple-50",
                                border: "group-hover:border-purple-200"
                            },
                            {
                                icon: CheckCircle2,
                                title: "Zero Commission",
                                desc: "We charge vendors a subscription, not a commission from you. Your money stays yours.",
                                color: "text-orange-600",
                                bg: "bg-orange-50",
                                border: "group-hover:border-orange-200"
                            }
                        ].map((t, i) => (
                            <div key={i} className={`group bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 ${t.border}`}>
                                <div className={`w-14 h-14 rounded-2xl ${t.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <t.icon className={`w-7 h-7 ${t.color}`} strokeWidth={2} />
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg mb-3">{t.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                    {t.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-sm font-medium text-gray-400">
                            Planning a complex event? <Link href="/contact" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4 decoration-indigo-200 hover:decoration-indigo-600 transition-all">Talk to a human concierge</Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
