"use client";

import { useState, useEffect } from "react";
import { Plus, X, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useVendorStore } from "@/lib/store";

export default function ServicesPage() {
    const { profile, updateProfile } = useVendorStore();
    const [mounted, setMounted] = useState(false);
    const [newService, setNewService] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleAddService = (e: React.FormEvent) => {
        e.preventDefault();
        const service = newService.trim();
        if (!service) return;

        if (profile.services.includes(service)) {
            toast.error("Service already exists");
            return;
        }

        const updatedServices = [...profile.services, service];
        updateProfile({ ...profile, services: updatedServices });
        setNewService("");
        toast.success("Service added");
    };

    const handleRemoveService = (serviceToRemove: string) => {
        const updatedServices = profile.services.filter(s => s !== serviceToRemove);
        updateProfile({ ...profile, services: updatedServices });
        toast.success("Service removed");
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Services & Capabilities</h1>
                <p className="text-gray-500 mt-1">Define the specific services you offer to clients.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    Your Services
                </h2>

                {/* Input */}
                <form onSubmit={handleAddService} className="flex gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="e.g. Drone Photography"
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 flex items-center gap-2 transition"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </form>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                    {profile.services.map((service) => (
                        <div key={service} className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium border group">
                            {service}
                            <button
                                onClick={() => handleRemoveService(service)}
                                className="text-gray-400 hover:text-red-500 transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {profile.services.length === 0 && (
                        <p className="text-gray-400 italic">No services added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
