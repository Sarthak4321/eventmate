"use client";

import { useState, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Video, Filter, Trash2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import { useVendorStore, PortfolioItem } from "@/lib/store";
import Modal from "@/components/Modal";

export default function PortfolioPage() {
    const { portfolio: items, deletePortfolioItem, addPortfolioItem } = useVendorStore();
    const [activeFilter, setActiveFilter] = useState("All");
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        type: "image" as "image" | "video",
        url: "",
        category: "Wedding",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const filteredItems = activeFilter === "All"
        ? items
        : items.filter(i => i.category === activeFilter);

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm("Remove this item from your portfolio?")) {
            deletePortfolioItem(id);
            toast.success("Item removed from portfolio");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.url) {
            // For demo purposes, if no URL, we assign a random color
            const colors = ["bg-red-100", "bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-purple-100", "bg-pink-100", "bg-indigo-100"];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            const newItem: PortfolioItem = {
                id: crypto.randomUUID(),
                type: formData.type,
                url: randomColor, // Using color class as mock url
                category: formData.category,
                likes: 0
            };
            addPortfolioItem(newItem);
            toast.success("Item uploaded successfully (Mock)");
        } else {
            const newItem: PortfolioItem = {
                id: crypto.randomUUID(),
                type: formData.type,
                url: formData.url,
                category: formData.category,
                likes: 0
            };
            addPortfolioItem(newItem);
            toast.success("Item uploaded successfully");
        }

        setIsModalOpen(false);
        setFormData({ type: "image", url: "", category: "Wedding" });
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Portfolio Manager</h1>
                    <p className="text-gray-500 mt-1">Showcase your best work to build trust.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
                >
                    <Upload className="w-5 h-5" /> Upload Media
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6 text-sm overflow-x-auto pb-2">
                {["All", "Wedding", "Pre-Wedding", "Decor", "Haldi", "Teaser"].map(f => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={clsx(
                            "px-4 py-2 rounded-full border transition whitespace-nowrap",
                            activeFilter === f ? "bg-black text-white border-black" : "bg-white text-gray-600 hover:bg-gray-50"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                    <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border">
                        {/* Mock Image Content */}
                        <div className={clsx("w-full h-full flex items-center justify-center bg-gray-100", item.url)}>
                            {item.url.startsWith("http") ? (
                                <img src={item.url} alt="Portfolio" className="w-full h-full object-cover" />
                            ) : (
                                item.type === "video" ? <Video className="w-12 h-12 text-gray-400" /> : <ImageIcon className="w-12 h-12 text-gray-400" />
                            )}
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                            <div className="flex justify-between items-end text-white">
                                <div>
                                    <p className="font-medium text-sm">{item.category}</p>
                                    <p className="text-xs opacity-75">{item.likes} likes</p>
                                </div>
                                <button
                                    onClick={(e) => handleDelete(e, item.id)}
                                    className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full backdrop-blur-sm transition"
                                    title="Remove"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Type badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs text-white uppercase font-bold tracking-wider">
                            {item.type}
                        </div>
                    </div>
                ))}

                {/* Upload Placeholder */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-black transition"
                >
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Add {activeFilter === "All" ? "Media" : activeFilter}</span>
                </button>
            </div>

            {/* UPLOAD MODAL */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Upload to Portfolio"
                className="max-w-lg"
            >
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3">
                            <Upload className="w-6 h-6" />
                        </div>
                        <p className="font-medium text-gray-900">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or MP4</p>
                    </div>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-medium">Or add via link</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image/Video URL</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                            <input
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.url}
                                onChange={e => setFormData({ ...formData, url: e.target.value })}
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Leave empty to generate a random mock placeholder.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Wedding">Wedding</option>
                                <option value="Pre-Wedding">Pre-Wedding</option>
                                <option value="Decor">Decor</option>
                                <option value="Haldi">Haldi</option>
                                <option value="Teaser">Teaser</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                            >
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
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
                            Upload
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
