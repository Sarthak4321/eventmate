"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export default function MainNavbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      isScrolled ? "pt-4 px-4" : "pt-6 px-6"
    )}>
      <div className="mx-auto max-w-7xl">
        <div className={cn(
          "flex items-center justify-between px-6 py-3 transition-all duration-500 rounded-full",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border border-white/40 text-slate-900"
            : "bg-transparent text-white"
        )}>

          {/* LOGO */}
          <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
            <Logo size="md" className={cn("transition-colors duration-300", !isScrolled && "text-white")} />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Home", "Services", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={cn(
                  "transition-colors duration-300 hover:text-indigo-500",
                  isScrolled ? "text-slate-600" : "text-white/90 hover:text-white"
                )}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className={cn(
                "text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                isScrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className={cn(
                "text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg",
                isScrolled
                  ? "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20"
                  : "bg-white text-slate-900 hover:bg-white/90 shadow-white/20"
              )}
            >
              Get Started
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              isScrolled ? "hover:bg-gray-100 text-slate-900" : "hover:bg-white/10 text-white"
            )}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl p-4 overflow-hidden animate-in slide-in-from-top-4 fade-in duration-200">
          <nav className="flex flex-col space-y-2 text-gray-700 text-base font-medium">
            <Link onClick={() => setOpen(false)} href="/" className="p-3 hover:bg-gray-50 rounded-xl transition-colors">Home</Link>
            <Link onClick={() => setOpen(false)} href="/services" className="p-3 hover:bg-gray-50 rounded-xl transition-colors">Services</Link>
            <Link onClick={() => setOpen(false)} href="/about" className="p-3 hover:bg-gray-50 rounded-xl transition-colors">About</Link>
            <Link onClick={() => setOpen(false)} href="/contact" className="p-3 hover:bg-gray-50 rounded-xl transition-colors">Contact</Link>

            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
              <Link
                onClick={() => setOpen(false)}
                href="/auth/login"
                className="w-full text-center py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold"
              >
                Login
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/auth/signup"
                className="w-full text-center py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold shadow-md"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
