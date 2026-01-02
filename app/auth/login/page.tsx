"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Briefcase, Search, ArrowRight, CheckCircle2, Phone, KeyRound, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
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
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// --- SCHEMAS ---
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const phoneSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const otpSchema = z.object({
  code: z.string().length(6, "OTP must be 6 digits"),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("email");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [timer, setTimer] = useState(0);

  // --- FORMS ---
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
  });

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  // --- TIMER ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // --- HANDLERS ---
  async function onEmailSubmit(data: z.infer<typeof emailSchema>) {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Login failed", { description: "Invalid email or password." });
        setLoading(false);
        return;
      }

      toast.success("Welcome back!");
      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  async function onPhoneSubmit(data: z.infer<typeof phoneSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: data.phone }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to send OTP");

      setPhone(data.phone);
      setStep("otp");
      setTimer(30);
      toast.success("OTP sent!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function onOtpVerify(data: z.infer<typeof otpSchema>) {
    setLoading(true);
    try {
      // Use NextAuth signIn with phone credential
      const result = await signIn("credentials", {
        phone: phone,
        code: data.code,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Login failed", { description: "Invalid OTP or User not found." });
        setLoading(false);
        return;
      }

      toast.success("Welcome back!");
      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* ================= LEFT PANEL (Form) ================= */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-6 md:p-12 lg:p-16 relative bg-white lg:bg-transparent z-10">

        {/* Header / Logo */}
        <div>
          <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
            <Logo size="lg" />
          </Link>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto my-10">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">Welcome back</h1>
            <p className="text-slate-500 text-lg">access your account instantly.</p>
          </div>

          <Tabs defaultValue="email" className="w-full mb-8" onValueChange={(val) => setLoginMethod(val as any)}>
            <TabsList className="grid w-full grid-cols-2 h-14 bg-slate-100 p-1.5 rounded-xl">
              <TabsTrigger value="phone" className="rounded-lg font-semibold h-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Phone Login
              </TabsTrigger>
              <TabsTrigger value="email" className="rounded-lg font-semibold h-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Email Login
              </TabsTrigger>
            </TabsList>

            {/* --- PHONE LOGIN --- */}
            <TabsContent value="phone" className="mt-6">
              <AnimatePresence mode="wait">
                {step === "phone" ? (
                  <motion.div
                    key="step-phone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Form {...phoneForm}>
                      <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-5">
                        <FormField
                          control={phoneForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium">Mobile Number</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                  <Input placeholder="9876543210" className="pl-12 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 rounded-xl" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button className="w-full h-12 text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-xl mt-2" type="submit" disabled={loading}>
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get OTP"}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Form {...otpForm}>
                      <form onSubmit={otpForm.handleSubmit(onOtpVerify)} className="space-y-5">
                        <FormField
                          control={otpForm.control}
                          name="code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium">One-Time Password</FormLabel>
                              <FormControl>
                                <Input placeholder="• • • • • •" maxLength={6} className="text-center text-xl tracking-widest h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex flex-col gap-3">
                          <Button className="w-full h-12 text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-xl mt-2" type="submit" disabled={loading}>
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Login"}
                          </Button>
                          <div className="flex justify-between items-center text-sm">
                            <button type="button" onClick={() => setStep("phone")} className="text-slate-500 hover:text-slate-900 flex items-center gap-1">
                              <ArrowLeft className="w-4 h-4" /> Change Number
                            </button>
                            <button
                              type="button"
                              disabled={timer > 0}
                              onClick={() => phoneForm.handleSubmit(onPhoneSubmit)()}
                              className={`font-semibold ${timer > 0 ? "text-slate-400 cursor-not-allowed" : "text-violet-700 hover:underline"}`}
                            >
                              Resend OTP {timer > 0 && `(${timer}s)`}
                            </button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* --- EMAIL LOGIN --- */}
            <TabsContent value="email" className="mt-6">
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                            <Input
                              placeholder="name@example.com"
                              type="email"
                              className="pl-12 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all rounded-xl shadow-sm"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={emailForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                          <Link
                            href="/auth/forgot-password"
                            className="text-sm font-semibold text-violet-600 hover:text-violet-700 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all rounded-xl shadow-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full h-12 text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/20 active:scale-[0.98] transition-all rounded-xl mt-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-violet-700 hover:text-violet-800 hover:underline font-semibold">
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-xs text-slate-400 flex gap-4 mt-auto">
          <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
        </div>
      </div>

      {/* ================= RIGHT PANEL (Image/Brand) ================= */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-violet-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 to-indigo-900/90" />

        {/* Abstract Shapes Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 w-full h-full flex flex-col justify-center px-16 xl:px-24">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl max-w-xl">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="w-5 h-5 text-amber-400 fill-amber-400 drop-shadow-sm" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <blockquote className="text-2xl font-medium leading-relaxed text-white mb-6 font-serif opacity-95">
              "We've scaled our event business by 300% since joining EventMate. The platform is intuitive, and the leads are incredibly high quality."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-200 border-2 border-white/30 flex items-center justify-center font-bold text-violet-900">AS</div>
              <div>
                <p className="font-bold text-lg text-white">Anjali Singh</p>
                <p className="text-indigo-200 text-sm">Founder, Royal Weddings</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-8">
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">10k+</p>
                <p className="text-xs">Verified Vendors</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">50k+</p>
                <p className="text-xs">Successful Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
