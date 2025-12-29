"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Briefcase, Search } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"user" | "vendor">("user");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem("eventmate_role", role);
    toast.success("Welcome back!", {
      description: "You have successfully logged in.",
    });

    if (role === "vendor") {
      router.push("/vendor/dashboard");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white md:bg-gray-50 flex items-center justify-center p-0 md:p-6 lg:p-10">

      <div className="w-full max-w-[1440px] bg-white rounded-none md:rounded-3xl shadow-none md:shadow-2xl overflow-hidden flex min-h-screen md:min-h-[800px]">

        {/* ================= FORM LEFT PANEL ================= */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center">

          <div className="max-w-[440px] mx-auto w-full">
            <Link href="/" className="inline-block mb-10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">E</div>
                <span className="font-bold text-2xl tracking-tight">EventMate</span>
              </div>
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

            {/* ROLE TOGGLE */}
            <div className="mb-8 flex gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${role === "user"
                    ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                  }`}
              >
                <Search className="w-4 h-4" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole("vendor")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${role === "vendor"
                    ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                  }`}
              >
                <Briefcase className="w-4 h-4" />
                Vendor
              </button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" />
                          <Input placeholder="name@example.com" type="email" className="pl-11 h-11" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <Link
                          href="/auth/forgot-password"
                          className="text-xs font-semibold text-black hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full h-12 text-base font-medium bg-black hover:bg-gray-900 text-white shadow-lg shadow-black/20 transition-all" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="h-11 flex items-center justify-center gap-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-medium text-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                    Google
                  </button>
                  <button type="button" className="h-11 flex items-center justify-center gap-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-medium text-sm">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35 1.04 1.39 2.05 2.16 3.08 2.16s2.05-.77 3.08-2.16zM13.25 1c-1.39 1.12-1.92 2.52-1.28 4.24 1.58-.33 2.76-1.57 2.37-3.66-.99.07-1.54.3-1.09-.58zm5.66 18.28c1.39-4.25-1.12-6.52-2.31-7.16 1.39-.77 2.31-2.52 1.39-4.79-.88-2.52-3.85-3.66-6.16-2.52-1.92.58-1.54 2.52-1.39.07-.33-.33-.66-.66.07-.98.77-1.92 3.85-2.52 6.16.07 2.52-2.31 4.79.07 7.16 1.39 1.12 1.92 2.52 2.31 4.24-.07 1.39.58 1.92 1.39 0 .58.55.98 1.54.55.98-.33.33-.66.07-.98zM8.33 3.52c-.88 2.52 1.12 6.52 4.24 8.09 3.08 1.57 6.16 2.52 8.09.58-1.93 1.94-5.01-1.01-8.09-2.58-3.12-1.57-5.12-5.57-4.24-8.09z" /></svg>
                    Apple
                  </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="font-bold text-black hover:underline">
                    Create account
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>

        {/* ================= IMAGE RIGHT PANEL ================= */}
        <div className="hidden lg:block w-1/2 relative bg-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2969&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-20 text-white">
            <div className="mb-6 flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <blockquote className="text-2xl font-medium leading-relaxed mb-6">
              "EventMate transformed how we find clients. The zero commission model is a game changer for our business."
            </blockquote>
            <div>
              <p className="font-bold text-lg">Aisha Sharma</p>
              <p className="text-white/70">Top Rated Wedding Planner, Mumbai</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
