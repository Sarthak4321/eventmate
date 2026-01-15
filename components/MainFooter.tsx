"use client";

import Link from "next/link";
import { ArrowRight, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export default function MainFooter() {
  return (
    <footer className="relative bg-[#050505] overflow-hidden">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-12">

        {/* 1. GIANT CTA SECTION */}
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Celebrate?</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Join thousands of people planning their dream events with EventMate. <br className="hidden md:block" /> No stress. No hidden fees. Just magic.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              Start Planning Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full mb-20" />

        {/* 2. FOOTER LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 text-white/80">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-6">
            <div className="text-2xl font-bold text-white tracking-tight">EventMate.</div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              The intelligent operating system for celebrations. We verify vendors, secure payments, and ensure your event happens exactly as you imagined.
            </p>
            <div className="flex gap-4 mt-2">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-slate-400">
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-white mb-6">Discover</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {['Wedding Venues', 'Photographers', 'Makeup Artists', 'Decorators', 'Caterers'].map(item => (
                <li key={item}><Link href="#" className="hover:text-indigo-400 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map(item => (
                <li key={item}><Link href="#" className="hover:text-indigo-400 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-2 md:col-span-4">
            <h4 className="font-bold text-white mb-6">Stay Inspired</h4>
            <p className="text-slate-500 text-sm mb-4">Get the latest trends and planning tips weekly.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 w-full hover:bg-white/10 transition-colors"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-medium">
          <div>© {new Date().getFullYear()} EventMate. All rights reserved.</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-400">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
