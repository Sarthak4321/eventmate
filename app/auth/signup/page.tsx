"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "vendor">("user");

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    // TEMP (replace with backend later)
    localStorage.setItem("eventmate_role", role);

    router.push(role === "vendor" ? "/vendor/dashboard" : "/");
  }

  return (
    <main className="flex justify-center px-6 pb-24">
      <div className="w-full max-w-lg bg-white rounded-3xl p-10 shadow-2xl">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-center">
          Create your EventMate account
        </h1>
        <p className="text-gray-500 mt-2 text-center">
          {role === "vendor"
            ? "Join India’s fastest growing event marketplace"
            : "Plan events with trusted professionals"}
        </p>

        {/* ROLE TOGGLE */}
        <div className="mt-8 flex gap-2 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setRole("user")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === "user"
                ? "bg-white shadow"
                : "text-gray-500 hover:text-black"
            }`}
          >
            🎉 I’m Planning an Event
          </button>

          <button
            onClick={() => setRole("vendor")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === "vendor"
                ? "bg-white shadow"
                : "text-gray-500 hover:text-black"
            }`}
          >
            🏢 I’m a Vendor
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="mt-8 space-y-4">

          {/* COMMON FIELDS */}
          <input required placeholder="Full Name" className="auth-input" />
          <input required type="email" placeholder="Email Address" className="auth-input" />
          <input required type="password" placeholder="Password" className="auth-input" />

          {role === "vendor" && (
            <>
              {/* BUSINESS INFO */}
              <div className="pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Business Information
                </p>

                <input
                  required
                  placeholder="Business / Brand Name"
                  className="auth-input"
                />

                <input
                  required
                  placeholder="Phone Number"
                  className="auth-input"
                />

                <select required className="auth-input">
                  <option value="">Service Category</option>
                  <option>Wedding Venues</option>
                  <option>Photography</option>
                  <option>Videography</option>
                  <option>Catering</option>
                  <option>Decor & Styling</option>
                  <option>Makeup Artist</option>
                  <option>Entertainment</option>
                </select>

                <input
                  required
                  placeholder="City / Service Location"
                  className="auth-input"
                />
              </div>

              {/* EXPERIENCE & PRICING */}
              <div className="pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Experience & Pricing
                </p>

                <select required className="auth-input">
                  <option value="">Years of Experience</option>
                  <option>0–1 years</option>
                  <option>1–3 years</option>
                  <option>3–5 years</option>
                  <option>5+ years</option>
                </select>

                <input
                  required
                  placeholder="Starting Price (₹)"
                  className="auth-input"
                />

                <select required className="auth-input">
                  <option value="">Team Size</option>
                  <option>Solo</option>
                  <option>2–5 members</option>
                  <option>5–10 members</option>
                  <option>10+ members</option>
                </select>
              </div>

              {/* TRUST NOTE */}
              <p className="text-xs text-gray-400 mt-2">
                ✔ No commission · ✔ Direct customer leads · ✔ Profile verification after signup
              </p>
            </>
          )}

          {/* CTA */}
          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90"
          >
            {role === "vendor" ? "Apply as a Vendor" : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-black font-medium">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
