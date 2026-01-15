"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Sparkles, CheckCircle2, Clock, Zap, ShieldCheck, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const EVENT_TYPES = [
    "Wedding",
    "Corporate Event",
    "Birthday",
    "Social Gathering",
    "Launch Party"
];

const INDIAN_FACES = [
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&q=80", // User 1
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",  // User 2
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80", // User 3
    "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=100&h=100&fit=crop&q=80"  // User 4
];

export default function LeadCaptureModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "" });
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        // Trigger popup after a delay
        const timer = setTimeout(() => {
            // Optional: Check if already seen
            // const hasSeen = sessionStorage.getItem("eventmate_lead_popup_seen");
            // if (!hasSeen) setIsOpen(true);
            setIsOpen(true);
        }, 6000);

        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % EVENT_TYPES.length);
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("eventmate_lead_popup_seen", "true");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            // Auto close after success message
            // setTimeout(() => handleClose(), 5000);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-slate-950/85 backdrop-blur-2xl"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.6, bounce: 0.25 }}
                        className="relative w-full max-w-[850px] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[420px]"
                    >
                        {/* Close Button Mobile */}
                        <button
                            onClick={handleClose}
                            className="absolute right-4 top-4 z-50 p-2 md:hidden rounded-full bg-slate-100 text-slate-500"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Left Side: Visual & Hook (Refined & Engaging) */}
                        <div className="relative w-full md:w-1/2 bg-slate-950 p-6 md:p-8 text-white flex flex-col justify-between overflow-hidden">

                            {/* Animated Background Mesh */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 45, 0],
                                        opacity: [0.3, 0.5, 0.3]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                                    className="absolute -top-[20%] -right-[20%] w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full blur-[80px]"
                                />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, -30, 0],
                                        opacity: [0.2, 0.4, 0.2]
                                    }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                                    className="absolute bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"
                                />
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                            </div>

                            {/* Content Layer */}
                            <div className="relative z-10 h-full flex flex-col pt-2">
                                {/* Live Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-start"
                                >
                                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold shadow-lg shadow-indigo-500/10 hover:bg-white/15 transition-colors cursor-default">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-emerald-300"></span>
                                        </span>
                                        <span className="text-emerald-50 tracking-wide uppercase text-[10px] sm:text-xs">Consulting Now</span>
                                    </div>
                                </motion.div>

                                <div className="mt-6 mb-auto">
                                    <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-6">
                                        Perfect Plan for your <br />
                                        <div className="h-[1.2em] relative inline-block w-full overflow-hidden align-top mt-1">
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={EVENT_TYPES[textIndex]}
                                                    initial={{ y: 50, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: -50, opacity: 0 }}
                                                    transition={{ duration: 0.5, ease: "circOut" }}
                                                    className="absolute top-0 left-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 pb-2"
                                                >
                                                    {EVENT_TYPES[textIndex]}
                                                </motion.span>
                                            </AnimatePresence>
                                        </div>
                                    </h2>

                                    {/* Value Props */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4, staggerChildren: 0.15 }}
                                        className="space-y-4 max-w-sm"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="mt-1 p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500/30 group-hover:text-indigo-200 transition-colors">
                                                <Trophy className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white/90">Top-Rated Experts</p>
                                                <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">Verified professionals for quality results</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="mt-1 p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500/30 group-hover:text-emerald-200 transition-colors">
                                                <ShieldCheck className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white/90">100% Trusted Vendors</p>
                                                <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">Curated list of verified partners only</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="mt-1 p-1.5 rounded-lg bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/30 group-hover:text-amber-200 transition-colors">
                                                <Zap className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white/90">Super Fast Response</p>
                                                <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">Get quotes & ideas in minutes</p>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>


                            </div>
                        </div>

                        {/* Right Side: Simple Form */}
                        <div className="flex-1 bg-white p-6 md:p-8 flex flex-col justify-center relative">
                            {/* Close Button Desktop */}
                            <button
                                onClick={handleClose}
                                className="absolute right-6 top-6 hidden md:flex p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="max-w-sm mx-auto w-full"
                                    >
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Get a Free Consultation</h3>
                                            <p className="text-slate-500">Drop your number, we'll call you back.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-slate-700 font-medium ml-1">Full Name</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="e.g. Aditi Sharma"
                                                    className="h-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all rounded-xl"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-slate-700 font-medium ml-1">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    placeholder="+91 98765 43210"
                                                    type="tel"
                                                    className="h-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all rounded-xl"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-xl shadow-blue-200 hover:shadow-blue-300 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                            >
                                                Request Instant Call
                                                <Phone className="w-5 h-5 ml-2 fill-current" />
                                            </Button>

                                            <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Usually connected in less than 2 mins
                                            </p>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center space-y-6 max-w-xs mx-auto"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 relative z-10">
                                                <CheckCircle2 className="w-12 h-12" />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">You're on the list!</h3>
                                            <p className="text-slate-500">
                                                Thanks {formData.name}, our expert is dialing your number right now.
                                            </p>
                                        </div>

                                        <div className="p-4 bg-slate-50 rounded-2xl w-full border border-slate-100">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Next Steps</p>
                                            <div className="flex items-center gap-3 text-left">
                                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                                    <Phone className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">Pick up the call</p>
                                                    <p className="text-xs text-slate-500">Incoming from +91...</p>
                                                </div>
                                            </div>
                                        </div>

                                        <Button variant="ghost" onClick={handleClose} className="text-slate-400 hover:text-slate-600">
                                            Close Window
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
