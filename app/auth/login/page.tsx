"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Loader2, Eye, EyeOff } from "lucide-react";
import { signIn, getSession } from "next-auth/react";
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

// --- SCHEMAS ---
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- FORM ---
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
  });

  // --- HANDLERS ---
  async function handleGoogleLogin() {
    setLoading(true);
    try {
      const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email) {
        // Check if user exists in our DB
        const res = await fetch("/api/auth/check-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });
        const data = await res.json();

        if (data.exists) {
          await signIn("credentials", {
            email: user.email,
            googleLogin: "true",
            redirect: false,
          });
          toast.success("Welcome back!");

          if (data.user.role === "vendor") {
            router.push("/vendor/dashboard");
          } else {
            router.push("/dashboard");
          }
          return;
        }

        // User does NOT exist -> Redirect to Signup to complete profile
        toast.info("Account not found. Please complete registration.");
        router.push(`/auth/signup?email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.displayName || "")}`);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  }

  async function onEmailSubmit(data: z.infer<typeof emailSchema>) {
    setLoading(true);
    try {
      const { signInWithEmailAndPassword, signOut } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");

      // 1. Try Firebase Login first (Enforces Verification)
      try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          toast.error("Email not verified. Please check your inbox.");
          await signOut(auth);
          setLoading(false);
          return;
        }

        // 2. Verified! Log in to NextAuth via Trusted Flow
        const result = await signIn("credentials", {
          email: user.email,
          googleLogin: "true", // Using our "Trusted Provider" flag
          redirect: false,
        });

        if (result?.error) {
          toast.error("Login failed. Account might not exist in database.");
        } else {
          toast.success("Welcome back!");

          // Check role and redirect accordingly
          const session = await getSession();
          if (session?.user?.role === "vendor") {
            router.push("/vendor/dashboard");
          } else {
            router.push("/dashboard");
          }
          router.refresh();
        }

      } catch (firebaseError: any) {
        if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/invalid-credential' || firebaseError.code === "auth/invalid-email") {
          // Try standard DB login (Legacy support)
          const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });

          if (result?.error) {
            toast.error("Invalid email or password.");
          } else {
            toast.success("Welcome back!");

            const session = await getSession();
            if (session?.user?.role === "vendor") {
              router.push("/vendor/dashboard");
            } else {
              router.push("/dashboard");
            }
            router.refresh();
          }
        } else {
          throw firebaseError;
        }
      }

    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100">

        {/* Header / Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
            <Logo size="lg" />
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome back</h1>
          <p className="text-slate-500">Enter your details to access your account.</p>
        </div>

        <div className="mb-6">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-12 rounded-xl text-slate-700 font-semibold border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-3 transition-all"
            disabled={loading}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Login with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium">Or continue with email</span>
            </div>
          </div>
        </div>

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
                    <div className="relative group">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all rounded-xl shadow-sm"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
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
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
            </Button>
          </form>
        </Form>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-violet-700 hover:text-violet-800 hover:underline font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
