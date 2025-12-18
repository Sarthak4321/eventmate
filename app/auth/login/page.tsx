"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "vendor">("user");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // TEMP AUTH MOCK
    localStorage.setItem("eventmate_role", role);

    if (role === "vendor") {
      router.push("/vendor/dashboard");
    } else {
      router.push("/");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] to-white px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">

        <h1 className="text-2xl font-semibold text-center">
          Welcome back to EventMate
        </h1>

        <p className="mt-2 text-gray-500 text-center">
          Login to continue
        </p>

        {/* ROLE SWITCH */}
        <div className="mt-6 flex gap-2 bg-gray-100 rounded-full p-1">
          {["user", "vendor"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r as any)}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                role === r
                  ? "bg-black text-white"
                  : "text-gray-600"
              }`}
            >
              {r === "vendor" ? "Vendor" : "Customer"}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input required type="email" placeholder="Email" className="auth-input" />
          <input required type="password" placeholder="Password" className="auth-input" />

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-black text-white font-medium"
          >
            Login as {role === "vendor" ? "Vendor" : "Customer"}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400 text-center">
          Secure login · Role-based access
        </p>
      </div>
    </main>
  );
}
