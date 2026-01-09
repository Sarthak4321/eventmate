"use client";

import { useState, useEffect } from "react";
import { Plus, FileText, Check, Trash, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow, parseISO } from "date-fns";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface QuoteTemplate {
    id: string;
    name: string;
    category: string;
    price: number;
    priceParams: string; // "base price", "per day", etc
    inclusions: string[];
    lastUsed: string;
}

export default function QuotesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [quotes, setQuotes] = useState<QuoteTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        category: "Photography",
        price: "",
        priceParams: "base price",
        inclusionInput: "",
        inclusions: [] as string[],
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        } else if (status === "authenticated") {
            if (session?.user?.role !== "vendor") {
                router.push("/dashboard");
            } else {
                fetchQuotes();
            }
        }
    }, [status, router, session]);

    async function fetchQuotes() {
        setLoading(true);
        try {
            const res = await fetch("/api/vendor/quotes");
            if (res.ok) {
                const data = await res.json();
                setQuotes(data);
            }
        } catch (error) {
            console.error("Failed to fetch quotes", error);
            toast.error("Failed to load templates");
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this template?")) return;

        // Optimistic UI update
        const originalQuotes = [...quotes];
        setQuotes(prev => prev.filter(q => q.id !== id));

        try {
            const res = await fetch(`/api/vendor/quotes/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            toast.success("Template deleted successfully");
        } catch (error) {
            setQuotes(originalQuotes);
            toast.error("Failed to delete template");
        }
    };

    const handleAddInclusion = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && formData.inclusionInput.trim()) {
            e.preventDefault();
            setFormData(prev => ({
                ...prev,
                inclusions: [...prev.inclusions, prev.inclusionInput.trim()],
                inclusionInput: ""
            }));
        }
    };

    const removeInclusion = (index: number) => {
        setFormData(prev => ({
            ...prev,
            inclusions: prev.inclusions.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.price || formData.inclusions.length === 0) {
            toast.error("Please fill in all required fields");
            return;
        }

        const payload = {
            name: formData.name,
            category: formData.category,
            price: formData.price,
            priceParams: formData.priceParams,
            inclusions: formData.inclusions
        };

        try {
            const res = await fetch("/api/vendor/quotes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const newQuote = await res.json();
                setQuotes([newQuote, ...quotes]);
                toast.success("Quote template created!");
                setIsModalOpen(false);
                setFormData({
                    name: "",
                    category: "Photography",
                    price: "",
                    priceParams: "base price",
                    inclusionInput: "",
                    inclusions: [],
                });
            } else {
                toast.error("Failed to create template");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(val);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quote Templates</h1>
                    <p className="text-gray-500 mt-1">Create reusable templates to send quotes in seconds.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-5 h-5" /> Create New Template
                </button>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {quotes.map((template) => (
                    <div key={template.id} className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition group flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-indigo-50 rounded-xl">
                                <FileText className="w-6 h-6 text-indigo-600" />
                            </div>
                            <button
                                onClick={() => handleDelete(template.id)}
                                className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                                title="Delete template"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>

                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{template.category} · Used {formatDistanceToNow(parseISO(template.lastUsed), { addSuffix: true })}</p>

                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-2xl font-bold text-gray-900">{formatCurrency(template.price)}</span>
                            <span className="text-sm text-gray-500">{template.priceParams}</span>
                        </div>

                        <div className="space-y-2 mb-6 flex-1">
                            {template.inclusions.slice(0, 3).map((inc, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" /> <span className="truncate">{inc}</span>
                                </div>
                            ))}
                            {template.inclusions.length > 3 && (
                                <p className="text-xs text-gray-400 pl-6">+ {template.inclusions.length - 3} more</p>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t mt-auto">
                            <button className="flex-1 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50">
                                Edit
                            </button>
                            <button className="flex-1 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                Use Template
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder Card */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition min-h-[300px]"
                >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-medium">Create New Template</span>
                </button>
            </div>

            {/* CREATE MODAL */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create Quote Template"
                className="max-w-xl"
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Premium Wedding Package"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                            <input
                                type="number"
                                required
                                placeholder="150000"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Unit</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.priceParams}
                                onChange={e => setFormData({ ...formData, priceParams: e.target.value })}
                            >
                                <option value="base price">Base Price</option>
                                <option value="per day">Per Day</option>
                                <option value="per hour">Per Hour</option>
                                <option value="per event">Per Event</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Photography">Photography</option>
                                <option value="Videography">Videography</option>
                                <option value="Decor">Decor</option>
                                <option value="Makeup">Makeup</option>
                                <option value="Music/DJ">Music/DJ</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Inclusions</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type and press Enter to add..."
                                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.inclusionInput}
                                    onChange={e => setFormData({ ...formData, inclusionInput: e.target.value })}
                                    onKeyDown={handleAddInclusion}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (formData.inclusionInput.trim()) {
                                            setFormData(prev => ({
                                                ...prev,
                                                inclusions: [...prev.inclusions, prev.inclusionInput.trim()],
                                                inclusionInput: ""
                                            }));
                                        }
                                    }}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Inclusion Chips */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {formData.inclusions.map((inc, i) => (
                                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full font-medium">
                                        {inc}
                                        <button type="button" onClick={() => removeInclusion(i)} className="hover:text-indigo-900">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                                {formData.inclusions.length === 0 && (
                                    <span className="text-sm text-gray-400 italic">No inclusions added yet.</span>
                                )}
                            </div>
                        </div>
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
                            Create Template
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
