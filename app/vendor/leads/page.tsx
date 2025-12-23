"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Phone, Mail, Clock, Calendar, ChevronRight, MoreHorizontal, Plus, User, MapPin, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import { useVendorStore, LeadStatus, Lead } from "@/lib/store";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import Modal from "@/components/Modal";

export default function LeadsPage() {
    const { leads, updateLeadStatus, addLead } = useVendorStore();
    const [activeTab, setActiveTab] = useState<LeadStatus | "All">("All");
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State for Manual Lead
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
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const filteredLeads = activeTab === "All"
        ? leads
        : leads.filter(l => l.status === activeTab);

    const handleStatusChange = (id: string, newStatus: LeadStatus) => {
        updateLeadStatus(id, newStatus);
        toast.success(`Lead status updated to ${newStatus}`);
    };

    const handleAddLead = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            toast.error("Name and Phone are required");
            return;
        }

        const newLead: Lead = {
            id: crypto.randomUUID(),
            name: formData.name,
            phone: formData.phone,
            email: formData.email || "N/A",
            eventType: formData.eventType || "General Inquiry",
            date: formData.date || new Date().toISOString(),
            budget: formData.budget || "TBD",
            location: formData.location,
            guests: 0,
            recievedAt: new Date().toISOString(),
            status: "New"
        };

        addLead(newLead);
        toast.success("Lead added successfully");
        setIsModalOpen(false);
        setFormData({ name: "", phone: "", email: "", eventType: "", date: "", budget: "", location: "Mumbai" });
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lead Inbox</h1>
                    <p className="text-gray-500 mt-1">Manage your inquiries and book more events.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
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
                {filteredLeads.map((lead) => (
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
                                            onClick={() => handleStatusChange(lead.id, "Contacted")}
                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm"
                                        >
                                            Respond Now
                                        </button>
                                    )}
                                    {lead.status === "Contacted" && (
                                        <button
                                            onClick={() => handleStatusChange(lead.id, "Quoted")}
                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm"
                                        >
                                            Send Quote
                                        </button>
                                    )}
                                    {lead.status === "Quoted" && (
                                        <button
                                            onClick={() => handleStatusChange(lead.id, "Won")}
                                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 shadow-sm"
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
                                    {["New", "Contacted", "Quoted", "Won"].map((s, i) => {
                                        const statusOrder = ["New", "Contacted", "Quoted", "Won", "Lost"];
                                        const currentIdx = statusOrder.indexOf(lead.status);
                                        const stepIdx = statusOrder.indexOf(s);
                                        const isCompleted = currentIdx >= stepIdx; // Simplified logic
                                        return (
                                            <div key={s} className={clsx("w-8 h-1 rounded-full", isCompleted ? "bg-green-500" : "bg-gray-200")} />
                                        )
                                    })}
                                </div>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-medium">{lead.status}</p>
                            </div>

                        </div>
                    </div>
                ))}

                {filteredLeads.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No leads found in this stage.
                    </div>
                )}
            </div>

            {/* MANUAL LEAD MODAL */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Lead Manually"
                className="max-w-lg"
            >
                <form onSubmit={handleAddLead} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                placeholder="e.g. Rahul Kapoor"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    required
                                    placeholder="+91..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="client@mail.com"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                        <input
                            type="text"
                            placeholder="e.g. Wedding Photography"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.eventType}
                            onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="1.5L"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.budget}
                                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. Mumbai"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                            />
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
                            Add Lead
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
