"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Users,
  Sparkles,
  ChevronDown,
  Zap,
  Heart,
  Camera,
  Music,
  ChefHat,
  MessageCircle,
  Star,
  Gift,
  Wallet,
  Percent
} from "lucide-react";
import { Select } from "@/components/ui/select";

// --- HERO ASSETS ---
const HERO_IMAGES = [
  { src: "/hero/emotional-hero.png", alt: "Wedding Celebration", label: "Weddings" },
  { src: "/hero/corporate-hero.png", alt: "Corporate Event", label: "Corporate" },
];

const HERO_MESSAGES = [
  "This moment matters.",
  "Business, but better.",
];

export default function EventOSHomePage() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const { scrollY } = useScroll();

  // Parallax & Scroll Opacity for Hero
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);

  // Hero Carousel Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // --- STATE FOR GUIDED INPUT ---
  const [eventType, setEventType] = useState("Wedding");
  const [city, setCity] = useState("Delhi");
  const [budget, setBudget] = useState("₹5L - ₹15L");

  return (
    <main className="text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">


      {/* 1️⃣ HERO: CINEMATIC SYSTEM (FIXED/STICKY FEEL) */}
      <section className="relative h-screen w-full overflow-hidden flex items-end justify-center md:items-start pt-28 md:pt-60 pb-28 sticky top-0 z-0">

        {/* Dynamic Backgrounds */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentHeroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentHeroIndex].src}
              alt={HERO_IMAGES[currentHeroIndex].alt}
              fill
              className="object-cover"
              priority
            />
            {/* Vignette & Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, y: contentY, scale: heroScale }}
          className="relative z-10 w-full max-w-7xl px-4 md:px-6 text-center flex flex-col items-center h-full md:h-auto justify-center md:justify-start"
        >
          <div className="mb-4 inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-xl shadow-lg whitespace-nowrap max-w-[90vw]">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentHeroIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-100 truncate"
              >
                Planning for {HERO_IMAGES[currentHeroIndex].label}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Main Title - Clean & Elegant */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif font-medium tracking-tight text-white mb-4 leading-[1.1] md:leading-tight drop-shadow-2xl px-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentHeroIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  y: { duration: 0.8 },
                  opacity: { duration: 0.8 },
                }}
                className="block text-white drop-shadow-lg tracking-tight pb-2"
              >
                {HERO_MESSAGES[currentHeroIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="text-white/80 italic font-serif font-light block text-2xl md:text-4xl mt-1 md:mt-2 tracking-normal drop-shadow-md">Let’s plan it right.</span>
          </h1>

          <p className="hidden md:block text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed font-sans drop-shadow-lg px-4 sm:px-0">
            The intelligent operating system for your next celebration. <br className="hidden md:block" />
            <span className="text-indigo-200 font-medium opacity-90 block sm:inline mt-1 sm:mt-0">Verified. Commission-free. Simple.</span>
          </p>

          {/* 🔍 GLASS SEARCH BAR - REFINED */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-md md:max-w-4xl mx-auto mt-4 md:mt-0"
          >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-2xl md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row gap-2 relative z-20 transition-all hover:bg-white/15 hover:border-white/30 duration-300">

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-grow">
                {/* Type */}
                <div className="relative group px-3 py-2.5 md:px-5 md:py-3.5 bg-white/10 sm:bg-white/5 rounded-xl md:rounded-3xl hover:bg-white/15 transition-colors border border-white/10 sm:border-transparent cursor-pointer">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-indigo-200 block mb-0.5">Event Type</label>
                  <select
                    className="w-full bg-transparent font-medium text-base md:text-xl text-white outline-none border-none p-0 cursor-pointer appearance-none [&>option]:text-slate-900"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option>Wedding</option>
                    <option>Birthday</option>
                    <option>Corporate</option>
                    <option>Anniversary</option>
                  </select>
                </div>

                {/* City */}
                <div className="relative group px-3 py-2.5 md:px-5 md:py-3.5 bg-white/10 sm:bg-white/5 rounded-xl md:rounded-3xl hover:bg-white/15 transition-colors border border-white/10 sm:border-transparent cursor-pointer">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-indigo-200 block mb-0.5">City</label>
                  <select
                    className="w-full bg-transparent font-medium text-base md:text-xl text-white outline-none border-none p-0 cursor-pointer appearance-none [&>option]:text-slate-900"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option>Delhi</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Goa</option>
                    <option>Jaipur</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="relative group px-3 py-2.5 md:px-5 md:py-3.5 bg-white/10 sm:bg-white/5 rounded-xl md:rounded-3xl hover:bg-white/15 transition-colors border border-white/10 sm:border-transparent cursor-pointer col-span-2 md:col-span-1">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-indigo-200 block mb-0.5">Budget</label>
                  <select
                    className="w-full bg-transparent font-medium text-base md:text-xl text-white outline-none border-none p-0 cursor-pointer appearance-none [&>option]:text-slate-900"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option>₹5L - ₹15L</option>
                    <option>₹15L - ₹30L</option>
                    <option>₹30L - ₹50L</option>
                    <option>₹50L+</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/services?type=${eventType}&city=${city}&budget=${budget}`}
                className="h-10 md:h-full w-full md:w-[4.5rem] bg-white text-slate-900 rounded-xl md:rounded-[1.8rem] flex items-center justify-center transition-all hover:bg-indigo-50 hover:scale-105 active:scale-95 shadow-lg md:shadow-none shrink-0"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-0 w-full z-30 flex flex-col items-center gap-2 animate-bounce opacity-80 pointer-events-none">
          <span className="text-[10px] font-medium text-white/80 tracking-[0.2em] uppercase drop-shadow-md">Explore</span>
          <ChevronDown className="w-5 h-5 text-white drop-shadow-md" />
        </div>
      </section>


      {/* 2️⃣ SCROLL OVERLAP CONTENT START */}
      <div className="relative z-20 bg-white rounded-t-[3rem] -mt-10 sm:-mt-20 pt-16 sm:pt-24 shadow-[0_-50px_100px_rgba(0,0,0,0.1)] overflow-hidden">

        {/* 3️⃣ THE BIG IDEA (POSITIONING) */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-24 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8">
              Planning an event shouldn’t <br /> feel like a full-time job.
            </h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
              EventMate replaces chaos, generic lists, and hidden commissions with <strong className="text-slate-900 font-medium">clarity, trust, and intelligent guidance.</strong>
            </p>
          </motion.div>
        </section>


        {/* 4️⃣ HOW IT WORKS (STORY FLOW) */}
        {/* 4️⃣ HOW IT WORKS (STORY JOURNEY) */}
        <section className="max-w-7xl mx-auto px-6 mb-40 relative">

          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">The Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">From first thought to <br /> final applause.</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              We don't just give you a list. We guide you through the chapters of planning, ensuring every detail lands perfectly.
            </p>
          </div>

          <div className="relative">
            {/* Central Story Line with Animated Beam */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-24 w-px bg-gradient-to-b from-slate-100 via-slate-100 to-transparent md:-translate-x-1/2 z-0 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-indigo-600 to-transparent opacity-80 shadow-[0_0_20px_2px_rgba(99,102,241,0.5)]"
                animate={{ top: ["-20%", "120%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-12 md:space-y-24">
              {[
                {
                  step: "01",
                  title: "The Spark",
                  desc: "It starts with your vision. Tell us the vibe, the budget, and the dream. We listen between the lines.",
                  icon: Sparkles,
                  color: "bg-amber-100 text-amber-600 border-amber-200",
                  align: "left",
                  visual: (
                    <div className="bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
                      <div className="mb-4">
                        <div className="h-2 w-24 bg-slate-100 rounded mb-2" />
                        <div className="h-10 bg-slate-50 rounded-lg border border-slate-200 flex items-center px-3 text-sm text-slate-400">
                          <span className="animate-pulse">Traditional Wedding in...|</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full border border-amber-100">Warm Lighting</span>
                        <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-full border border-slate-100">500 Pax</span>
                      </div>
                    </div>
                  )
                },
                {
                  step: "02",
                  title: "The Curation",
                  desc: "Our system filters through 1,200+ verified vendors to find the 3 perfect matches for your specific date and style.",
                  icon: Users,
                  color: "bg-indigo-100 text-indigo-600 border-indigo-200",
                  align: "right",
                  visual: (
                    <div className="relative h-40 group">
                      {[1, 2, 3].map((card, idx) => (
                        <div key={idx}
                          className="absolute bg-white p-3 rounded-xl shadow-lg border border-slate-100 w-48 transition-all duration-500"
                          style={{
                            top: idx * 10,
                            left: idx * 20 + (idx === 1 ? 10 : 0),
                            zIndex: 3 - idx,
                            transform: `rotate(${idx % 2 === 0 ? -2 : 2}deg)`
                          }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200" />
                            <div className="flex-1">
                              <div className="h-2 w-16 bg-slate-200 rounded mb-1" />
                              <div className="h-1.5 w-10 bg-slate-100 rounded" />
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                },
                {
                  step: "03",
                  title: "The Connection",
                  desc: "Connect directly. No middlemen hiding details. Chat, meet, and see if the chemistry is right.",
                  icon: MessageCircle,
                  color: "bg-blue-100 text-blue-600 border-blue-200",
                  align: "left",
                  visual: (
                    <div className="bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 max-w-xs mx-auto">
                      <div className="space-y-3">
                        <div className="flex items-end gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 flex-shrink-0" />
                          <div className="bg-slate-100 px-3 py-2 rounded-2xl rounded-bl-sm text-xs text-slate-600">
                            Is the 24th available?
                          </div>
                        </div>
                        <div className="flex items-end gap-2 flex-row-reverse">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0" />
                          <div className="bg-blue-600 px-3 py-2 rounded-2xl rounded-br-sm text-xs text-white">
                            Yes! We'd love to host you. 🎉
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  step: "04",
                  title: "The Reality",
                  desc: "Secure it with a click. Escrow-protected payments mean you relax while the magic happens.",
                  icon: Heart,
                  color: "bg-rose-100 text-rose-600 border-rose-200",
                  align: "right",
                  visual: (
                    <div className="bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-900">Booking Confirmed</h4>
                      <p className="text-xs text-slate-400 mb-4">Invoice #INV-2024-001</p>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-green-500 rounded-full" />
                      </div>
                    </div>
                  )
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)", y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: i * 0.1 }}
                  className={`relative flex items-start gap-4 md:gap-16 ${item.align === "right" ? "md:flex-row-reverse" : "md:flex-row"} md:items-center`}
                >
                  {/* Content Box */}
                  <motion.div
                    initial={{ opacity: 0, x: 20, rotateX: 20 }}
                    whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`flex-1 ${item.align === "right" ? "md:text-left" : "md:text-right"} pl-16 md:pl-0 z-10 pt-1 md:pt-0`}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-3 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-end md:gap-3">
                      <span className={`md:hidden text-[10px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100 shadow-sm`}>
                        Step {item.step}
                      </span>
                      <span className={item.align === "right" ? "md:mr-auto" : "md:ml-auto"}>{item.title}</span>
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-light text-base md:text-lg">
                      {item.desc}
                    </p>
                  </motion.div>

                  {/* Icon Node */}
                  <div className="absolute left-0 md:relative md:left-auto shrink-0 z-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.1, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.6, ease: "backOut" }}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] md:border-4 border-white shadow-xl flex items-center justify-center ${item.color} relative z-10 ring-4 ring-slate-50/50`}
                    >
                      <item.icon className="w-5 h-5 md:w-8 md:h-8" strokeWidth={2.5} />
                      <div className={`absolute -top-8 text-[10px] font-bold tracking-widest uppercase text-slate-400 hidden md:block whitespace-nowrap bg-white px-2 py-1 rounded-full border border-slate-100 shadow-sm`}>
                        Step {item.step}
                      </div>
                    </motion.div>
                  </div>

                  {/* Visual Mockup Side (Desktop Only) */}
                  <div className="flex-1 hidden md:flex justify-center items-center">
                    <div className={`w-full max-w-xs ${item.align === "right" ? "origin-left" : "origin-right"} hover:scale-105 transition-transform duration-500`}>
                      {item.visual}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* 5️⃣ MULTI-EVENT GALLERY (BENTO GRID) */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2 block">Our Expertise</span>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">Whatever you’re planning.</h2>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 hover:border-slate-900 transition-colors">
              View all categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Large Item */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer h-72 md:h-auto">
              <Image src="/hero/emotional-hero.png" alt="Wedding" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">Weddings</h3>
                <p className="text-white/70 text-sm">Grand venues, bridal makeup, cinema</p>
              </div>
            </div>

            {/* Medium Item 1 */}
            <div className="md:col-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer h-64 md:h-auto">
              <Image src="/hero/corporate-hero.png" alt="Corporate" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1">Corporate & Networking</h3>
                <p className="text-white/70 text-sm">Conferences, retreats, offsites</p>
              </div>
            </div>

            {/* Small Item 1 */}
            <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer bg-slate-100 h-48 md:h-auto">
              <Image src="/hero/birthday-hero.png" alt="Birthdays" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold mb-0.5">Birthdays</h3>
                <p className="text-white/70 text-xs">Parties & Decor</p>
              </div>
            </div>

            {/* Small Item 2 */}
            <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer bg-slate-100 h-48 md:h-auto">
              <Image src="/hero/anniversary-hero.png" alt="Anniversaries" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold mb-0.5">Anniversaries</h3>
                <p className="text-white/70 text-xs">Intimate Dinners</p>
              </div>
            </div>
          </div>
        </section>


        {/* 6️⃣ TRUST INDICATORS (PREMIUM & ANIMATED) */}
        <section className="bg-white py-32 relative overflow-hidden">

          {/* Ambient Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">The EventMate Standard</h2>
              <p className="text-slate-500 text-lg font-light">
                We believe in total transparency and quality. That’s why we’re building the most trusted event platform in India.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 max-w-sm sm:max-w-none mx-auto sm:mx-0">
              {[
                { number: "1,200+", label: "Verified Vendors", desc: "Every vendor is KYC verified.", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-200", shadow: "hover:shadow-emerald-500/10", accent: "group-hover:to-emerald-100" },
                { number: "0%", label: "Platform Commission", desc: "Costs you nothing extra.", icon: Percent, color: "text-amber-600", bg: "bg-amber-50", border: "hover:border-amber-200", shadow: "hover:shadow-amber-500/10", accent: "group-hover:to-amber-100" },
                { number: "100%", label: "Transparent Pricing", desc: "No hidden wedding taxes.", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50", border: "hover:border-blue-200", shadow: "hover:shadow-blue-500/10", accent: "group-hover:to-blue-100" },
                { number: "24/7", label: "Concierge Support", desc: "Real humans, always there.", icon: MessageCircle, color: "text-indigo-600", bg: "bg-indigo-50", border: "hover:border-indigo-200", shadow: "hover:shadow-indigo-500/10", accent: "group-hover:to-indigo-100" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`relative group bg-white rounded-3xl md:rounded-[2.5rem] p-4 md:p-8 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${stat.shadow} ${stat.border} flex flex-col items-center text-center overflow-hidden h-full`}
                >
                  <div className={`w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-[1.5rem] ${stat.bg} ${stat.color} flex items-center justify-center mb-3 md:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm relative z-10 mx-auto`}>
                    <stat.icon className="w-5 h-5 md:w-8 md:h-8" strokeWidth={2} />
                  </div>

                  <h4 className="text-2xl md:text-5xl font-extrabold text-slate-900 mb-1 md:mb-3 tracking-tight group-hover:scale-105 transition-transform duration-300 origin-center relative z-10">{stat.number}</h4>

                  <p className="text-[10px] md:text-sm font-bold text-slate-900 uppercase tracking-widest mb-1 md:mb-2 relative z-10">{stat.label}</p>

                  <p className="text-slate-500 text-[10px] md:text-sm font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity relative z-10 hidden sm:block">
                    {stat.desc}
                  </p>

                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-transparent ${stat.accent} rounded-bl-[100%] transition-all duration-500 opacity-0 group-hover:opacity-100`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* 7️⃣ FINAL CTA (CONFIDENT) */}
        <section className="pt-32 pb-16 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8">Ready to plan without the stress?</h2>
            <Link href="/services" className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium transition-all hover:scale-105 shadow-xl hover:shadow-indigo-200">
              Start my event plan <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-8 text-sm text-slate-400">
              Free for users. No credit card required to explore.
            </p>
          </div>
        </section>

        {/* 8️⃣ VENDOR ONBOARDING (ULTIMATE POLISH) */}
        <section className="py-24 px-6 border-t border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] grid md:grid-cols-2 min-h-[700px] relative group">

              {/* Background: Animated Gradient Orb */}
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              {/* Background: Subtle Grid */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }}
              />

              {/* Left: Content & Value Props */}
              <div className="p-12 md:p-20 flex flex-col justify-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-500/20 backdrop-blur-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-[pulse_2s_infinite]" />
                  EventMate for Business
                </motion.div>

                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.05] text-white">
                  Full Calendar. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-white">Zero Stress.</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light max-w-lg">
                  EventMate is the <span className="text-white font-medium">OS for event professionals</span>. We handle the marketing, payments, and verified leads. You just show up and shine.
                </p>

                {/* Value Bullets (Card Style) */}
                <div className="grid gap-4 mb-12">
                  {[
                    { title: "0% Commission", desc: "We don't take a cut. You keep it all.", icon: Percent, color: "bg-amber-500/20 text-amber-300 border-amber-500/20" },
                    { title: "High-Value Leads", desc: "Avg. projects size of ₹2.5L+", icon: CheckCircle2, color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20" },
                    { title: "Guaranteed Payments", desc: "100% advance secured in escrow.", icon: Wallet, color: "bg-blue-500/20 text-blue-300 border-blue-500/20" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color} shrink-0`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact?intent=vendor"
                    className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-indigo-50 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  >
                    Claim Your Profile <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Right: 3D Visualization */}
              <div className="relative overflow-hidden flex items-center justify-center p-8 lg:p-0 perspective-[1000px]">

                {/* 3D Container */}
                <motion.div
                  initial={{ rotateY: -20, rotateX: 10, opacity: 0 }}
                  whileInView={{ rotateY: -12, rotateX: 5, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative z-10 w-[340px] preserve-3d"
                  style={{ transformStyle: "preserve-3d" }}
                >

                  {/* PHONE FRAME */}
                  <div className="bg-slate-900 rounded-[3rem] p-4 shadow-[50px_50px_100px_-20px_rgba(0,0,0,0.6)] border-[6px] border-slate-700 relative h-[650px] ring-1 ring-white/20">

                    {/* Screen Refection / Gloss */}
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-50" />

                    {/* Dynamic Island */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 flex items-center justify-center gap-2 px-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[8px] font-medium text-white/80">Live</span>
                    </div>

                    {/* Screen Content */}
                    <div className="w-full h-full bg-slate-50 rounded-[2.2rem] overflow-hidden flex flex-col relative">

                      {/* Header */}
                      <div className="pt-16 px-6 pb-6 bg-white border-b border-slate-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Balance</p>
                            <h3 className="font-bold text-slate-900 text-3xl tracking-tight">₹14.2L</h3>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-slate-400" />
                          </div>
                        </div>
                      </div>

                      {/* Recent Activity Feed */}
                      <div className="flex-1 bg-slate-50 p-4 space-y-3 overflow-hidden">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-2">Live Activity</div>
                        <AnimatePresence>
                          {[
                            { id: 1, title: "New Lead", sub: "Wedding • 500 Pax", val: "View", color: "bg-indigo-600 text-white" },
                            { id: 2, title: "Payment", sub: "Advance Received", val: "+₹50k", color: "bg-white text-emerald-600 border border-slate-200" },
                            { id: 3, title: "Review", sub: "New 5-star rating", val: "5.0", color: "bg-white text-amber-500 border border-slate-200" },
                            { id: 4, title: "System", sub: "Weekly Report Ready", val: "PDF", color: "bg-white text-slate-900 border border-slate-200" },
                          ].map((item, i) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 1 + 1 }}
                              className={`p-4 rounded-xl flex items-center justify-between shadow-sm ${item.color}`}
                            >
                              <div>
                                <h4 className="font-bold text-sm">{item.title}</h4>
                                <p className={`text-xs ${item.id === 1 ? 'text-indigo-200' : 'text-slate-400'}`}>{item.sub}</p>
                              </div>
                              <div className="text-sm font-bold">{item.val}</div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* FLOATING EARNINGS GRAPH CARD (3D) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 50, rotateY: 10 }}
                    whileInView={{ opacity: 1, scale: 1, x: 20, rotateY: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute -right-12 top-24 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/60 w-56 z-50"
                    style={{ transform: "translateZ(80px)" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-bold text-slate-400 uppercase">Growth</div>
                      <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+28%</div>
                    </div>

                    {/* Animated SVG Path for Graph */}
                    <div className="h-16 w-full relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <motion.path
                          d="M0 40 Q 20 35, 40 20 T 100 5"
                          fill="none"
                          stroke="#4f46e5"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        {/* Gradient Fill under line */}
                        <motion.path
                          d="M0 40 Q 20 35, 40 20 T 100 5 V 40 H 0 Z"
                          fill="url(#gradient)"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 0.2 }}
                          transition={{ delay: 1, duration: 1 }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </motion.div>

                </motion.div>
              </div>

            </div>
          </div>
        </section>

      </div>
      {/* SCROLL OVERLAP CONTENT END */}

    </main>
  );
}