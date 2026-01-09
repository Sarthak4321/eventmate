"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Phone, Mail, Clock, Calendar, Plus, User, MapPin, IndianRupee, Loader2 } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Reuse types from store or define locally if store is removed
export type LeadStatus = "New" | "Contacted" | "Quoted" | "Won" | "Lost";

interface Lead {
    id: string;
    name: string;
    eventType: string;
    date: string;
    guests: number;
    budget: string;
    location: string;
    status: LeadStatus;
    recievedAt: string;
    phone: string;
    email: string;
}

export default function LeadsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<LeadStatus | "All">("All");

    // Modals
    const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    // Selected Lead for Quote
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

    // Forms
    const [quoteData, setQuoteData] = useState({ price: "", message: "" });
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        date: "",
        budget: "",
        location: "Mumbai",
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        } else if (status === "authenticated") {
            if (session?.user?.role !== "vendor") {
                router.push("/dashboard");
            } else {
                fetchLeads();
            }
        }
    }, [status, router, session]);

    async function fetchLeads() {
        setLoading(true);
        try {
            const res = await fetch("/api/vendor/leads");
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            } else {
                toast.error("Failed to load leads");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    async function updateLeadStatus(id: string, newStatus: LeadStatus, extraData?: any) {
        // Optimistic update
        const originalLeads = [...leads];
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus, ...extraData } : l));

        try {
            const res = await fetch(`/api/vendor/leads/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus, ...extraData })
            });

            if (!res.ok) {
                throw new Error("Failed update");
            }
            toast.success(`Updated to ${newStatus}`);
        } catch (error) {
            setLeads(originalLeads); // Revert
            toast.error("Failed to update status");
        }
    }

    const handleOpenQuoteModal = (id: string) => {
        setSelectedLeadId(id);
        setQuoteData({ price: "", message: "" });
        setIsQuoteModalOpen(true);
    };

    const handleSendQuote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLeadId || !quoteData.price) {
            toast.error("Price is required");
            return;
        }

        // status: Quoted, price: formatted
        const formattedPrice = `₹${quoteData.price}`;

        await updateLeadStatus(selectedLeadId, "Quoted", { budget: formattedPrice }); // Update local budget display too
        setIsQuoteModalOpen(false);
    };

    const filteredLeads = activeTab === "All"
        ? leads
        : leads.filter(l => l.status === activeTab);

    // Dummy handleAddLead for now
    const handleAddLead = (e: React.FormEvent) => {
        e.preventDefault();
        toast.info("Manual entry feature coming soon! (Connected to User Database)");
        setIsAddLeadModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lead Inbox</h1>
                    <p className="text-gray-500 mt-1">Manage your inquiries and book more events.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsAddLeadModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium shadow-md transition"
                    >
                        <Plus className="w-4 h-4" /> Add Lead
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 text-sm font-medium">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {["All", "New", "Contacted", "Quoted", "Won", "Lost"].map((tab) => {
                    const count = tab === "All"
                        ? leads.length
                        : leads.filter(l => l.status === tab).length;

                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={clsx(
                                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                                activeTab === tab
                                    ? "bg-black text-white"
                                    : "bg-white border text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            {tab}
                            {count > 0 && <span className={clsx("ml-2 text-[10px] px-1.5 py-0.5 rounded-full", activeTab === tab ? "bg-white text-black" : "bg-gray-200 text-gray-700")}>{count}</span>}
                        </button>
                    )
                })}
            </div>

            {/* Lead List */}
            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                        <div key={lead.id} className="border-b last:border-0 p-6 hover:bg-gray-50 transition-colors group">
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">

                                {/* Header Info */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                                            {lead.status === "New" && (
                                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">New Lead</span>
                                            )}
                                        </div>
                                        <span className="text-sm text-gray-400 flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> {formatDistanceToNow(parseISO(lead.recievedAt), { addSuffix: true })}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 font-medium">{lead.eventType}</p>

                                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            {format(parseISO(lead.date), "dd MMM, yyyy")}
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                                            <span className="font-semibold text-gray-500">₹</span>
                                            {lead.budget}
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                                            Guests: {lead.guests || "N/A"}
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                                            {lead.location}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col items-end gap-3 min-w-[200px]">
                                    <div className="flex items-center gap-2">
                                        {lead.status === "New" && (
                                            <button
                                                onClick={() => updateLeadStatus(lead.id, "Contacted")}
                                                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
                                            >
                                                Respond Now
                                            </button>
                                        )}
                                        {(lead.status === "Contacted" || lead.status === "New") && (
                                            <button
                                                onClick={() => handleOpenQuoteModal(lead.id)}
                                                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
                                            >
                                                Send Quote
                                            </button>
                                        )}
                                        {lead.status === "Quoted" && (
                                            <button
                                                onClick={() => updateLeadStatus(lead.id, "Won")}
                                                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 shadow-sm transition-colors"
                                            >
                                                Mark as Won
                                            </button>
                                        )}
                                        <button className="p-2 border rounded-lg hover:bg-gray-100 text-gray-500" title="Call">
                                            <Phone className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 border rounded-lg hover:bg-gray-100 text-gray-500" title="Email">
                                            <Mail className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Pipeline visual */}
                                    <div className="flex items-center gap-1 mt-2">
                                        {["New", "Contacted", "Quoted", "Won"].map((s) => {
                                            const statusOrder = ["New", "Contacted", "Quoted", "Won", "Lost"];
                                            const currentIdx = statusOrder.indexOf(lead.status);
                                            const stepIdx = statusOrder.indexOf(s);
                                            const isCompleted = currentIdx >= stepIdx;
                                            return (
                                                <div key={s} className={clsx("w-8 h-1 rounded-full", isCompleted ? "bg-green-500" : "bg-gray-200")} title={s} />
                                            )
                                        })}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-medium">{lead.status}</p>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No leads found</h3>
                        <p className="max-w-sm mt-2 mb-6">You don't have any leads in this category yet.</p>
                        <button onClick={() => setActiveTab("All")} className="text-indigo-600 font-medium hover:underline">
                            View all leads
                        </button>
                    </div>
                )}
            </div>

            {/* MODAL: ADD MANUAL LEAD */}
            <Modal
                isOpen={isAddLeadModalOpen}
                onClose={() => setIsAddLeadModalOpen(false)}
                title="Add New Lead Manually"
                className="max-w-lg"
            >
                <form onSubmit={handleAddLead} className="space-y-4">
                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                        Manual lead entry creates a dummy record. For full features, users should book via the app.
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="button" onClick={() => setIsAddLeadModalOpen(false)} className="px-4 py-2 border rounded-lg mr-3">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">Add Demo Lead</button>
                    </div>
                </form>
            </Modal>

            {/* MODAL: SEND QUOTE */}
            <Modal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                title="Send Quote"
                className="max-w-md"
            >
                <form onSubmit={handleSendQuote} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Quote Amount (₹)</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                required
                                placeholder="e.g. 50000"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-lg"
                                value={quoteData.price}
                                onChange={(e) => setQuoteData({ ...quoteData, price: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                        <textarea
                            rows={3}
                            placeholder="Add a personal note..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={quoteData.message}
                            onChange={(e) => setQuoteData({ ...quoteData, message: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsQuoteModalOpen(false)}
                            className="flex-1 px-4 py-2.5 border rounded-xl font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-sm"
                        >
                            Send Quote
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
