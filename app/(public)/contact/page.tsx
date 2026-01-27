"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Briefcase,
  HelpCircle,
  CheckCircle2,
  Mail
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function ContactPage() {
  const [activeIntent, setActiveIntent] = useState<"planning" | "vendor" | "general">("planning");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <main className="bg-white min-h-screen font-sans text-slate-900 selection:bg-indigo-100/50">

      {/* 1️⃣ HERO: HUMAN CONNECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              We're Online & Listening
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Let’s talk.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
              We’re here to help you plan with confidence. Whether you’re organizing a wedding, joining as a partner, or just saying hello — <span className="text-slate-800 font-medium">you’re always welcome here.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ INTENT SELECTION */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid md:grid-cols-3 gap-4"
        >
          {[
            { id: "planning", icon: Sparkles, title: "Planning an Event", desc: "Guidance on venues & budgets" },
            { id: "vendor", icon: Briefcase, title: "Vendor Partnership", desc: "Join EvntMet & grow" },
            { id: "general", icon: HelpCircle, title: "General Inquiry", desc: "Questions or feedback" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveIntent(item.id as any)}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 group ${activeIntent === item.id
                ? "bg-slate-900 border-slate-900 shadow-xl scale-[1.02]"
                : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-md"
                }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors ${activeIntent === item.id ? "bg-white/10 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className={`font-bold text-lg mb-1 ${activeIntent === item.id ? "text-white" : "text-slate-900"}`}>
                {item.title}
              </h3>
              <p className={`text-sm ${activeIntent === item.id ? "text-slate-400" : "text-slate-500"}`}>
                {item.desc}
              </p>
            </button>
          ))}
        </motion.div>
      </section>

      {/* 3️⃣ THE INTERACTIVE FORM */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-8 md:p-12 overflow-hidden relative"
        >
          {/* Success Overlay */}
          <AnimatePresence>
            {formStatus === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h3>
                <p className="text-slate-500 text-lg max-w-md">
                  Thanks for reaching out. A real human from our team will get back to you shortly (usually within 24 hours).
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-8 text-indigo-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {activeIntent === "planning" && "Tell us about your dream event."}
              {activeIntent === "vendor" && "Let's grow your business together."}
              {activeIntent === "general" && "How can we help you today?"}
            </h2>
            <p className="text-slate-500">
              {activeIntent === "planning" && "Our experts serve as your personal concierge."}
              {activeIntent === "vendor" && "We are currently accepting vendors in select cities."}
              {activeIntent === "general" && "No bots. No spam. Just helpful humans."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarthak Gupta"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
              <textarea
                rows={5}
                required
                placeholder={
                  activeIntent === "planning" ? "I'm looking for a venue in South Delhi for 200 guests..." :
                    activeIntent === "vendor" ? "I am a photographer based in Mumbai with 5 years experience..." :
                      "I have a question about..."
                }
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400 font-medium transition-all resize-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <p className="text-xs text-slate-400 hidden md:block">
                Protected by reCAPTCHA and our <span className="underline">Privacy Policy</span>.
              </p>
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95 disabled:opacity-70 disabled:scale-100 flex items-center gap-2"
              >
                {formStatus === "submitting" ? (
                  <>Sending...</>
                ) : (
                  <>Send Message <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </form>

        </motion.div>
      </section>

      {/* 4️⃣ TRUST FOOTER */}
      <section className="bg-slate-50 border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">

            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm mb-4 border border-slate-100">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Fast Response</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We value your time. Our team typically responds within 24 hours during business days.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-sm mb-4 border border-slate-100">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Real Humans</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                No chatbots here. You’ll be talking to a dedicated event expert who cares about your celebration.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm mb-4 border border-slate-100">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Global Presence</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                HQ in New Delhi, India. <br />
                Operating remotely across major cities.
              </p>
            </div>

          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-serif text-slate-900 italic mb-4 opacity-80">
              "Big moments deserve calm planning."
            </h2>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
              <Mail className="w-4 h-4" /> support@evntmet.in
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
