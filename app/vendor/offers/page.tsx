"use client";

import { useState, useEffect } from "react";
import { Tag, Plus, Clock, CalendarDays, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import { useVendorStore, Offer } from "@/lib/store";
import Modal from "@/components/Modal";

export default function OffersPage() {
    const { offers, toggleOfferStatus, addOffer, deleteOffer } = useVendorStore();
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        type: "discount" as "discount" | "last_minute" | "weekday",
        value: "",
        condition: "",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleToggle = (id: string) => {
        toggleOfferStatus(id);
        toast.success("Offer status updated");
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this offer?")) {
            deleteOffer(id);
            toast.success("Offer deleted");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.value) {
            toast.error("Please fill in required fields");
            return;
        }

        const newOffer: Offer = {
            id: crypto.randomUUID(),
            title: formData.title,
            type: formData.type,
            value: formData.value,
            condition: formData.condition || "No conditions",
            status: "active"
        };

        addOffer(newOffer);
        toast.success("Offer created successfully!");
        setIsModalOpen(false);
        setFormData({ title: "", type: "discount", value: "", condition: "" });
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Deals & Offers</h1>
                    <p className="text-gray-500 mt-1">Attract budget-conscious clients and fill empty dates.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-5 h-5" /> Create New Offer
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-2xl p-6 border shadow-sm relative overflow-hidden group">
                        {/* Status Toggle */}
                        <div className="absolute top-4 right-4 z-10">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={offer.status === "active"}
                                    onChange={() => handleToggle(offer.id)}
                                    className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                        </div>

                        <div className={clsx(
                            "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                            offer.type === "weekday" ? "bg-purple-100 text-purple-600" :
                                offer.type === "last_minute" ? "bg-red-100 text-red-600" :
                                    "bg-blue-100 text-blue-600"
                        )}>
                            {offer.type === "weekday" && <CalendarDays className="w-6 h-6" />}
                            {offer.type === "last_minute" && <Clock className="w-6 h-6" />}
                            {offer.type === "discount" && <Tag className="w-6 h-6" />}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
                        <p className="text-2xl font-bold text-indigo-600 mt-1 mb-2">{offer.value}</p>
                        <p className="text-sm text-gray-500 mb-6">{offer.condition}</p>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2 text-sm border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 font-medium">
                                <Edit2 className="w-4 h-4" /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(offer.id)}
                                className="py-2 px-3 text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {offer.status === "inactive" && (
                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px] pointer-events-none z-0">
                                <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-bold text-gray-600 uppercase shadow-sm">Inactive</span>
                            </div>
                        )}
                    </div>
                ))}

                {/* Create Card */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition min-h-[240px]"
                >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-medium">Create Logic-Based Offer</span>
                    <span className="text-xs mt-1 text-center max-w-[200px] opacity-75">e.g. "10% off if booked on weekdays"</span>
                </button>
            </div>

            {/* CREATE MODAL */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Offer"
                className="max-w-lg"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Offer Title</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Early Bird Discount"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 15% OFF"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.value}
                                onChange={e => setFormData({ ...formData, value: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                            >
                                <option value="discount">Generic Discount</option>
                                <option value="last_minute">Last Minute Deal</option>
                                <option value="weekday">Weekday Special</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                        <input
                            type="text"
                            placeholder="e.g. Valid for bookings made 6 months ahead"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.condition}
                            onChange={e => setFormData({ ...formData, condition: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-2.5 border rounded-xl font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-black text-white rounded-xl font-medium hover:bg-gray-800"
                        >
                            Create Offer
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
