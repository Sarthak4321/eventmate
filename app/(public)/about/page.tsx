"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Heart,
  Users,
  CheckCircle2,
  ArrowRight,
  Search,
  BrainCircuit,
  Sparkles,
  Briefcase,
  LayoutDashboard,
  TrendingUp,
  Globe,
  CreditCard,
  Gift
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  })
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function AboutVisionPage() {
  return (
    <main className="bg-white font-sans text-slate-900 selection:bg-indigo-100/50">

      {/* 🔹 SECTION 1: EMOTIONAL OPENING (HERO) */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-6 md:mb-8">
              Planning an event <br className="hidden md:block" />
              <span className="text-slate-400">shouldn’t feel overwhelming.</span>
            </h1>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="text-lg sm:text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light px-4 md:px-0"
          >
            EvntMet exists to replace chaos, confusion, and middlemen with <span className="text-indigo-600 font-medium">clarity, trust, and smart guidance.</span>
          </motion.p>
        </div>

        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08)_0%,rgba(255,255,255,0)_50%)]"></div>
      </section>


      {/* 🔹 SECTION 2: THE PROBLEM (REALITY CHECK) */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4 block">The Reality</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Events are unrepeatable. <br />
              <span className="text-slate-500">Why is planning them broken?</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              In India, celebrations are grand, emotional, and expensive. Yet, the process behind them is fragmented. You deal with opaque pricing, endless phone calls, and the constant fear of last-minute surprises.
            </p>
            <div className="space-y-4">
              {[
                "Hidden vendor pricing until the last meeting",
                "Middlemen adding 20-30% commissions",
                "Zero accountability for service quality",
                "Stressful coordination across 10+ WhatsApp chats"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <span className="text-xs">✕</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col justify-center items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-slate-50/50 pattern-grid-lg opacity-20"></div>
            <div className="z-10 max-w-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center mb-6 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">"Wait, how much is this?"</h3>
              <p className="text-slate-500">The average couple spends 150+ hours just researching prices. We think that's 149 hours too many.</p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* 🔹 SECTION 3: THE INSIGHT */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8">
              People don’t want options. <br />
              <span className="text-indigo-600">They want certainty.</span>
            </h2>
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light"
          >
            You don't need a directory of 5,000 photographers. You need the <strong>one</strong> who fits your budget, understands your style, and is available on your date.
            <br /><br />
            EvntMet isn't a marketplace. It’s an intelligent guide that says: <br />
            <em>"Based on your budget, here is exactly who you should trust."</em>
          </motion.p>
        </div>
      </section>


      {/* 🔹 SECTION 4 & 5: SOLUTION & USP */}
      <section className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-4 block">The Solution</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Not a directory. <br /> an Operating System.</h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                We've rebuilt the planning stack from the ground up to prioritize transparency and direct connection.
              </p>

              <div className="space-y-8">
                {[
                  { icon: BrainCircuit, title: "Smart Sequencing", desc: "Our system tells you what to book first, second, and last." },
                  { icon: ShieldCheck, title: "100% Verified", desc: "No fake listings. Every vendor is KYC checked physically." },
                  { icon: Users, title: "Direct Access", desc: "We introduce you, then step back. No interference." },
                  { icon: CheckCircle2, title: "Transparent Pricing", desc: "See starting packages upfront. Negotiate directly." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-indigo-400">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-100">{item.title}</h4>
                      <p className="text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Abstraction of "Input -> Intelligence -> Outcome" */}
            <div className="relative flex items-center justify-center mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10 w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 sm:p-8 rounded-3xl">
                <div className="space-y-6">
                  {/* Stop 1 */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800 border border-slate-700">
                    <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">1</div>
                    <div>
                      <div className="h-2 w-24 bg-slate-600 rounded mb-2"></div>
                      <div className="h-2 w-12 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                  {/* Connector */}
                  <div className="h-8 w-0.5 bg-indigo-500/50 mx-9"></div>
                  {/* Stop 2 */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/30">
                    <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-indigo-300 text-sm font-bold">EvntMet Intelligence</span>
                      <div className="h-1.5 w-full bg-indigo-500/20 rounded mt-2"></div>
                    </div>
                  </div>
                  {/* Connector */}
                  <div className="h-8 w-0.5 bg-indigo-500/50 mx-9"></div>
                  {/* Stop 3 */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-green-900/20 border border-green-500/30">
                    <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-green-300 text-sm font-bold">Perfect Match Found</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 🔹 SECTION 6: BEYOND VENDORS (ECOSYSTEM) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 md:mb-16">Building the operating system for celebrations</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Core Planning", icon: LayoutDashboard, connected: true },
              { title: "Financing & EMI", icon: CreditCard, connected: true },
              { title: "Honeymoons", icon: Globe, connected: true },
              { title: "Registry & Gifting", icon: Gift, connected: true }
            ].map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 🔹 SECTION 7: FOR VENDORS */}
      <section className="py-16 md:py-24 bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm h-48 flex flex-col justify-end">
                <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
                <div className="font-bold text-slate-900">Growth Insights</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm h-48 flex flex-col justify-end mt-8">
                <Briefcase className="w-8 h-8 text-indigo-500 mb-4" />
                <div className="font-bold text-slate-900">Portfolio Mgmt</div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">For Partners</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">We don't just send leads.<br />We build businesses.</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              For too long, vendors have been squeezed by aggregators charging 20% commissions. We’re changing that. We provide tools, visibility, and direct client access for a flat subscription.
            </p>
            <Link href="/for-vendors" className="text-indigo-600 font-bold hover:text-indigo-800 inline-flex items-center gap-2">
              Join as a Partner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* 🔹 SECTION 8: TRUST & INTEGRITY */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase mb-8">
            <ShieldCheck className="w-3.5 h-3.5" /> Our Promise
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">0%</h3>
              <p className="font-bold text-slate-900">Commission</p>
              <p className="text-sm text-slate-500 mt-2">We never take a cut from your booking amount.</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">100%</h3>
              <p className="font-bold text-slate-900">Verified</p>
              <p className="text-sm text-slate-500 mt-2">Every profile is real and background checked.</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-purple-600 mb-2">Direct</h3>
              <p className="font-bold text-slate-900">Access</p>
              <p className="text-sm text-slate-500 mt-2">Chat directly with vendors. No middlemen.</p>
            </div>
          </div>
        </div>
      </section>


      {/* 🔹 SECTION 9: VISION STATEMENT */}
      <section className="py-20 md:py-32 bg-slate-900 text-center text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-6">Our Vision</h2>
          <p className="text-2xl md:text-4xl font-serif italic text-slate-200 leading-relaxed mb-12">
            "To become India’s most trusted event planning platform — where every celebration is planned with confidence, clarity, and joy."
          </p>
          <Link href="/services" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            Start Planning Now
          </Link>
        </div>
      </section>

    </main>
  );
}
