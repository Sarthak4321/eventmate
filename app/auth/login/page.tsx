"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // TEMP role logic (replace with backend auth later)
    const role = localStorage.getItem("eventmate_role") || "user";
    router.push(role === "vendor" ? "/vendor/dashboard" : "/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] to-white px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-center">
          Welcome back to EventMate
        </h1>
        <p className="mt-2 text-gray-500 text-center">
          Login to manage your events or grow your business
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            required
            type="email"
            placeholder="Email address"
            className="auth-input"
          />

          <input
            required
            type="password"
            placeholder="Password"
            className="auth-input"
          />

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-black"
            >
              Forgot password?
            </a>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90"
          >
            Login
          </button>
        </form>

        {/* TRUST FOOTER */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          Secure login · Direct vendor access · No spam
        </p>

        {/* SIGNUP LINK */}
        <p className="mt-6 text-sm text-gray-500 text-center">
          New to EventMate?{" "}
          <a href="/auth/signup" className="text-black font-medium">
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
