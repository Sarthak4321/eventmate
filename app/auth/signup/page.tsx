"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
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
import { Select } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

// ================= USER SCHEMA =================
const userSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.string().min(1, "Please select gender"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// ================= VENDOR SCHEMA =================
const vendorSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  category: z.string().min(1, "Service category is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gstin: z.string().optional(), // Made optional for now, can be required
  pan: z.string().min(10, "Valid PAN is required for verification"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  city: z.string().min(2, "City is required"),
  experience: z.string().min(1, "Select experience"),
  startingPrice: z.string().min(1, "Starting price is required"),
  teamSize: z.string().min(1, "Select team size"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // --- USER FORM ---
  const userForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: { fullName: "", email: "", phone: "", gender: "", password: "", confirmPassword: "" },
  });

  // --- VENDOR FORM ---
  const vendorForm = useForm<z.infer<typeof vendorSchema>>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      businessName: "",
      category: "",
      email: "",
      phone: "",
      gstin: "",
      pan: "",
      password: "",
      confirmPassword: "",
      city: "",
      experience: "",
      startingPrice: "",
      teamSize: "",
    },
  });

  async function onUserSubmit(data: z.infer<typeof userSchema>) {
    setLoading(true);
    // Simulate API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem("eventmate_role", "user");
    toast.success("Account created successfully!");
    router.push("/dashboard");
    setLoading(false);
  }

  async function onVendorSubmit(data: z.infer<typeof vendorSchema>) {
    setLoading(true);
    // Simulate API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem("eventmate_role", "vendor");
    toast.success("Application submitted!", {
      description: "Welcome to EventMate for Business.",
    });
    router.push("/vendor/dashboard");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 py-24">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">

        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">E</div>
              <span className="font-bold text-xl tracking-tight">EventMate</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-2">Join thousands of planners and vendors today.</p>
        </div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-gray-100/50 p-1.5 rounded-2xl">
            <TabsTrigger
              value="user"
              className="rounded-xl text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all h-full"
            >
              🎉 I'm Planning an Event
            </TabsTrigger>
            <TabsTrigger
              value="vendor"
              className="rounded-xl text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all h-full"
            >
              🏢 I'm a Vendor
            </TabsTrigger>
          </TabsList>

          {/* ================ USER TAB ================ */}
          <TabsContent value="user" className="animate-in fade-in slide-in-from-top-4 duration-300">
            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-5">
                <FormField
                  control={userForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={userForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 00000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={userForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <option value="">Select Gender...</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={userForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button className="w-full h-12 text-base mt-2" type="submit" disabled={loading}>
                  {loading ? "Creating Account..." : "Create User Account"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* ================ VENDOR TAB ================ */}
          <TabsContent value="vendor" className="animate-in fade-in slide-in-from-top-4 duration-300">
            <Form {...vendorForm}>
              <form onSubmit={vendorForm.handleSubmit(onVendorSubmit)} className="space-y-5">

                {/* BUSINESS INFO */}
                <div className="space-y-5">
                  <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-4">
                    <h3 className="font-semibold text-indigo-900 border-b border-indigo-200 pb-2">Verified Business Details</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField
                        control={vendorForm.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Starlight Studios" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={vendorForm.control}
                        name="pan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PAN Number (Verification)</FormLabel>
                            <FormControl>
                              <Input placeholder="ABCDE1234F" className="uppercase" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={vendorForm.control}
                      name="gstin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GSTIN (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="22AAAAA0000A1Z5" className="uppercase" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      control={vendorForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <option value="">Select Service...</option>
                              <option>Wedding Venue</option>
                              <option>Photography</option>
                              <option>Makeup Artist</option>
                              <option>Catering</option>
                              <option>Decor</option>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={vendorForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="contact@business.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={vendorForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={vendorForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City / Base Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Mumbai, Delhi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="h-px bg-gray-100 my-6" />

                {/* DETAILS & CREDENTIALS */}
                <div className="grid md:grid-cols-3 gap-5">
                  <FormField
                    control={vendorForm.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Select...</option>
                            <option>0-2 Years</option>
                            <option>2-5 Years</option>
                            <option>5+ Years</option>
                          </Select>
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
                        <FormLabel>Start Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="25000" {...field} />
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
                        <FormLabel>Team Size</FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Select...</option>
                            <option>Solo</option>
                            <option>2-10</option>
                            <option>10+</option>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={vendorForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={vendorForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl flex gap-3">
                  <div className="min-w-5 pt-0.5"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                  <p>By registering, you agree to undergo our simplified verification process to trust. No hidden joining fees.</p>
                </div>

                <Button className="w-full h-12 text-base" type="submit" disabled={loading}>
                  {loading ? "Submitting Application..." : "Join as Vendor"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <Link href="/auth/login" className="font-semibold text-black hover:underline">Log in</Link>
        </p>

      </div>
    </main>
  );
}
