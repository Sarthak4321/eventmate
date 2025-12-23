"use client";

import { useState, useEffect } from "react";
import { Save, User, MapPin, Mail, Phone, Briefcase, Info } from "lucide-react";
import { toast } from "sonner";
import { useVendorStore } from "@/lib/store";

export default function SettingsPage() {
    const { profile, updateProfile } = useVendorStore();
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState(profile);

    useEffect(() => {
        setMounted(true);
        setFormData(profile);
    }, [profile]);

    if (!mounted) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        toast.success("Profile updated successfully");
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your business profile and account settings.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="p-6 border-b bg-gray-50">
                    <h2 className="font-semibold text-gray-900">Business Profile</h2>
                    <p className="text-sm text-gray-500">This information will be visible on your public vendor profile.</p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    name="businessName"
                                    type="text"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    name="ownerName"
                                    type="text"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input
                                name="category"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    name="location"
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">About Your Business</label>
                        <div className="relative">
                            <Info className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <textarea
                                name="about"
                                rows={4}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.about}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 flex items-center justify-end gap-3">
                    <button type="button" className="px-6 py-2 border rounded-lg font-medium hover:bg-white transition">Cancel</button>
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
