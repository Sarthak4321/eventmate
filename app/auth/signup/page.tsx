"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Lock, User, Phone, Briefcase, MapPin, Building2, CheckCircle2, ArrowRight } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select"; // Ensure you have this component or use standard select
import { Logo } from "@/components/ui/logo";

// --- SCHEMAS ---
const userSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.string().min(1, "Please select gender"),
});

const vendorSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  category: z.string().min(1, "Service category is required"),
  gstin: z.string().optional(),
  pan: z.string().min(10, "Valid PAN is required"),

  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().optional(),
  city: z.string().min(1, "City is required"),

  experience: z.string().min(1, "Experience is required"),
  teamSize: z.string().min(1, "Team size is required"),
  startingPrice: z.string().min(1, "Starting price is required"),
  portfolio: z.string().optional(),
});

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"details" | "otp">("details");
  const [otp, setOtp] = useState("");

  // --- FORMS ---
  const userForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      gender: "",
    },
  });

  // ... vendorForm ...

  // --- HANDLERS ---
  async function onUserSignupStep1(data: z.infer<typeof userSchema>) {
    setLoading(true);
    try {
      // 1. Send OTP
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: data.phone }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success("OTP sent to " + data.phone);
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function onVerifyAndRegister() {
    setLoading(true);
    try {
      const formData = userForm.getValues();

      // 2. Verify OTP
      const verifyRes = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, code: otp }),
      });

      if (!verifyRes.ok) {
        const json = await verifyRes.json();
        throw new Error(json.message || "Invalid OTP");
      }

      // 3. Register User
      const registerRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "user" }),
      });

      const registerJson = await registerRes.json();
      if (!registerRes.ok) throw new Error(registerJson.message);

      toast.success("Account verified & created!");
      router.push("/auth/login");

    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }



  const vendorForm = useForm<z.infer<typeof vendorSchema>>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      businessName: "",
      category: "",
      gstin: "",
      pan: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      city: "",
      experience: "",
      teamSize: "",
      startingPrice: "",
      portfolio: "",
    },
  });

  async function onRegisterVendor(data: z.infer<typeof vendorSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "vendor" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success("Account created successfully!");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* ================= FORM PANEL ================= */}
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 relative bg-white z-10 w-full">

        {/* Header / Logo */}
        <div className="w-full max-w-2xl text-center mb-6">
          <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
            <Logo size="lg" />
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="max-w-2xl w-full mx-auto my-4">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">Create an account</h1>
            <p className="text-slate-500 text-lg">Join EventMate to plan or manage events.</p>
          </div>

          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-10 h-14 bg-slate-100 p-1.5 rounded-xl">
              <TabsTrigger value="user" className="rounded-lg font-semibold h-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Customer</TabsTrigger>
              <TabsTrigger value="vendor" className="rounded-lg font-semibold h-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Partner (Vendor)</TabsTrigger>
            </TabsList>

            {/* --- USER FORM --- */}
            <TabsContent value="user">
              {step === "details" ? (
                <Form {...userForm}>
                  <form onSubmit={userForm.handleSubmit(onUserSignupStep1)} className="space-y-6">

                    <FormField
                      control={userForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Full Name</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                              <Input className="pl-12 h-12 bg-slate-50 border-slate-200 hover:border-violet-300 focus:bg-white focus:border-violet-500 rounded-xl transition-all" placeholder="John Doe" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={userForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <Input className="pl-12 h-12 bg-slate-50 border-slate-200 hover:border-violet-300 focus:bg-white focus:border-violet-500 rounded-xl transition-all" placeholder="john@example.com" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={userForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Phone</FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <Input className="pl-12 h-12 bg-slate-50 border-slate-200 hover:border-violet-300 focus:bg-white focus:border-violet-500 rounded-xl transition-all" placeholder="9876543210" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={userForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <Input type="password" className="pl-12 h-12 bg-slate-50 border-slate-200 hover:border-violet-300 focus:bg-white focus:border-violet-500 rounded-xl transition-all" placeholder="••••••••" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={userForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Gender</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <select
                                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 hover:border-violet-300 focus:bg-white focus:border-violet-500 rounded-xl appearance-none outline-none transition-all text-slate-700 cursor-pointer"
                                  {...field}
                                >
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                                <ArrowRight className="absolute right-4 top-4 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button className="w-full h-12 text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg mt-4 transition-all active:scale-[0.98]" type="submit" disabled={loading}>
                      {loading ? "Sending OTP..." : "Continue"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="max-w-md mx-auto py-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4 text-violet-600">
                      <Lock className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Enter OTP</h3>
                    <p className="text-slate-500 text-sm mt-1">
                      We've sent a 6-digit code to <span className="font-semibold text-slate-900">{userForm.getValues("phone")}</span>
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                        placeholder="• • • • • •"
                        className="text-center text-3xl tracking-[1em] h-16 font-semibold rounded-xl border-slate-200 focus:border-violet-500 bg-slate-50"
                        maxLength={6}
                      />
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={onVerifyAndRegister}
                        className="w-full h-12 text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg transition-all active:scale-[0.98]"
                        disabled={loading || otp.length !== 6}
                      >
                        {loading ? "Verifying..." : "Verify & Create Account"}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setStep("details")}
                        className="w-full text-slate-500 hover:text-slate-900"
                      >
                        Back to Details
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* --- VENDOR FORM --- */}
            <TabsContent value="vendor">
              <Form {...vendorForm}>
                <form onSubmit={vendorForm.handleSubmit(onRegisterVendor)} className="space-y-8">

                  {/* Section 1: Business Verification Details (Highlighted) */}
                  <div className="bg-violet-50/50 border border-violet-100 p-6 rounded-2xl shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-violet-900 flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5" /> Business Verification
                    </h3>

                    <FormField
                      control={vendorForm.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Business Name <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                              <Input className="pl-10 h-11 rounded-xl bg-white border-slate-200 focus:border-violet-500 transition-all" placeholder="Starlight Studios" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={vendorForm.control}
                        name="gstin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">GSTIN (Optional)</FormLabel>
                            <FormControl><Input className="h-11 rounded-xl bg-white border-slate-200 focus:border-violet-500 transition-all uppercase" placeholder="22AAAAA0000A1Z5" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={vendorForm.control}
                        name="pan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">PAN Number <span className="text-red-500">*</span></FormLabel>
                            <FormControl><Input className="h-11 rounded-xl bg-white border-slate-200 focus:border-violet-500 transition-all uppercase" placeholder="ABCDE1234F" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={vendorForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Category <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <select className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl focus:border-violet-500 transition-all text-slate-700 cursor-pointer" {...field}>
                              <option value="">Select Category</option>
                              <option>Wedding Venue</option>
                              <option>Photography</option>
                              <option>Makeup Artist</option>
                              <option>Catering</option>
                              <option>Decor</option>
                              <option>Entertainment</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Section 2: Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 border-b pb-2">
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={vendorForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Your Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl><Input className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all" placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={vendorForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Phone <span className="text-red-500">*</span></FormLabel>
                            <FormControl><Input className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all" placeholder="9876543210" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={vendorForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Email <span className="text-red-500">*</span></FormLabel>
                            <FormControl><Input className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all" placeholder="business@example.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={vendorForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Password <span className="text-red-500">*</span></FormLabel>
                            <FormControl><Input type="password" className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all" placeholder="••••••••" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Section 3: Service Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 border-b pb-2">
                      Service Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={vendorForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">City <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                <Input className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all" placeholder="Mumbai" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={vendorForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Full Address (Optional)</FormLabel>
                            <FormControl><Input className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all" placeholder="Shop 12, Main Street..." {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={vendorForm.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Experience</FormLabel>
                            <FormControl>
                              <select className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-violet-500 transition-all text-slate-700 cursor-pointer" {...field}>
                                <option value="">Select...</option>
                                <option>0-2 Years</option>
                                <option>2-5 Years</option>
                                <option>5+ Years</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={vendorForm.control}
                        name="teamSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Team Size</FormLabel>
                            <FormControl>
                              <select className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-violet-500 transition-all text-slate-700 cursor-pointer" {...field}>
                                <option value="">Select...</option>
                                <option>Solo</option>
                                <option>2-10</option>
                                <option>10+</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={vendorForm.control}
                        name="startingPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Min Price (₹)</FormLabel>
                            <FormControl><Input type="number" className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={vendorForm.control}
                      name="portfolio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Portfolio / Website (Optional)</FormLabel>
                          <FormControl><Input className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-all" placeholder="https://..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button className="w-full h-12 text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg mt-8 transition-all active:scale-[0.98]" type="submit" disabled={loading}>
                    {loading ? "Creating Partner Account..." : "Join as Vendor"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-violet-700 hover:text-violet-800 hover:underline font-semibold">
              Log in
            </Link>
          </p>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}
