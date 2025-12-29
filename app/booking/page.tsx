"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon, MapPinIcon, CheckCircle2 } from "lucide-react";

// 1. Define Zod Schema
const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  eventType: z.string().min(1, "Please select an event type"),
  date: z.string().min(1, "Event date is required"),
  location: z.string().min(2, "Location is required"),
  budget: z.string().min(1, "Please select a budget range"),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Initialize Form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      eventType: "",
      date: "",
      location: "",
      budget: "",
      notes: "",
    },
  });

  // 3. Handle Submission
  async function onSubmit(data: BookingFormValues) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Booking Submitted:", data);
    toast.success("Request submitted successfully!", {
      description: "We'll connect you with vendors shortly.",
    });

    setIsSubmitted(true);
    form.reset();
  }

  return (
    <main className="pt-32 pb-32 bg-[#F9FAFB] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
            Book your dream team
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your event and we'll match you with the perfect vendors. Zero commission.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {isSubmitted ? (
            <div className="py-24 px-8 text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Request Received!</h2>
              <p className="mt-4 text-gray-600 max-w-md">
                We've started contacting top-rated vendors for your <span className="font-semibold text-black">event</span>. Check your dashboard for updates.
              </p>
              <div className="mt-8 flex gap-4">
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Submit Another
                </Button>
                <Button onClick={() => window.location.href = '/dashboard'}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                  {/* CONTACT INFO */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">1</span>
                      Contact Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="jane@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
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
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* EVENT DETAILS */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">2</span>
                      Event Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="eventType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Type</FormLabel>
                            <FormControl>
                              <Select {...field}>
                                <option value="">Select Type...</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Private Party">Private Party</option>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type="date" {...field} />
                                <CalendarIcon className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="City or Venue" {...field} />
                                <MapPinIcon className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Budget</FormLabel>
                            <FormControl>
                              <Select {...field}>
                                <option value="">Select Range...</option>
                                <option value="<50k">Under ₹50k</option>
                                <option value="50k-1L">₹50k - ₹1L</option>
                                <option value="1L-5L">₹1L - ₹5L</option>
                                <option value="5L+">₹5L+</option>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Requirements</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe your vision, specific needs, or any questions you have..."
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Optional. Be as specific as you like.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-medium bg-black hover:bg-gray-800 rounded-xl transition-all"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          By submitting, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>

      </div>
    </main>
  );
}
