"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, X, Image as ImageIcon, Video, Filter, Trash2, Link as LinkIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

interface PortfolioItem {
    id: string;
    type: "image" | "video";
    url: string;
    category: string;
    likes: number;
    createdAt: string;
}

const VENDOR_CATEGORIES: Record<string, string[]> = {
    "Photographer": ["Wedding", "Pre-Wedding", "Engagement", "Candid", "Traditional", "Drone", "Mehendi", "Sangeet", "Reception", "Corporate", "Maternity", "Baby Shower"],
    "Videographer": ["Teaser", "Highlight Reel", "Traditional Video", "Cinematic", "Drone", "Save the Date", "Wedding Film", "Pre-Wedding Film", "Corporate", "Event Coverage"],
    "Makeup Artist": ["Bridal Makeup", "Sangeet Look", "Reception Look", "Engagement Look", "Party Makeup", "Guest Makeup", "Haldi Look", "Mehendi Look", "Airbrush", "HD Makeup"],
    "Decorator": ["Mandap", "Stage", "Entrance", "Walkway", "Haldi Setup", "Mehendi Decor", "Sangeet Decor", "Floral", "Lighting", "Photo Booth", "Car Decor", "Home Decor"],
    "Caterer": ["Buffet Setup", "Live Counters", "Dessert Station", "Appetizers", "Main Course", "Beverages", "Wedding Menu", "High Tea"],
    "Venue": ["Banquet Hall", "Lawn", "Poolside", "Rooms", "Exterior", "Interior", "Dining Area"],
    "Planner": ["Wedding", "Sangeet", "Mehendi", "Reception", "Decor Coordination", "Logistics", "Guest Management"],
    "DJ": ["Sangeet", "Cocktail", "Reception", "Haldi", "Baraat", "Club Event", "Corporate"],
    "Mehendi Artist": ["Bridal Mehendi", "Guest Mehendi", "Arabic", "Traditional", "Portrait Mehendi", "Legs Mehendi", "Hands Mehendi"],
    "Choreographer": ["Bride & Groom", "Family Performance", "Sangeet", "Flash Mob", "Couple Dance", "Solo Performance"],
    "default": ["Wedding", "Pre-Wedding", "Engagement", "Haldi", "Mehendi", "Sangeet", "Reception", "Corporate", "Birthday", "Other"]
};

export default function PortfolioPage() {
    const router = useRouter();
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [vendorCategory, setVendorCategory] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        type: "image" as "image" | "video",
        url: "",
        category: "Wedding",
    });

    // File Upload Ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check size (e.g. 5MB limit for base64 safety)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File is too large (max 5MB)");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setFormData(prev => ({
                ...prev,
                url: base64String,
                type: file.type.startsWith("video/") ? "video" : "image"
            }));
            toast.success("File selected successfully");
        };
        reader.onerror = () => {
            toast.error("Failed to read file");
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const res = await fetch("/api/vendor/portfolio");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();

            if (data.items) {
                setItems(data.items);
                setVendorCategory(data.vendorCategory || "");
                // Auto-set the first category as default for upload if valid
                const cats = VENDOR_CATEGORIES[data.vendorCategory] || VENDOR_CATEGORIES["default"];
                if (cats.length > 0) setFormData(prev => ({ ...prev, category: cats[0] }));
            } else if (Array.isArray(data)) {
                setItems(data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load portfolio items");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredItems = activeFilter === "All"
        ? items
        : items.filter(i => i.category === activeFilter);

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Remove this item from your portfolio?")) return;

        try {
            const res = await fetch(`/api/vendor/portfolio/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Failed to delete");

            setItems(prev => prev.filter(item => item.id !== id));
            toast.success("Item removed from portfolio");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete item");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let finalUrl = formData.url;

            if (!finalUrl) {
                // Mock behavior if no URL provided: use random color
                const colors = ["bg-red-100", "bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-purple-100", "bg-pink-100", "bg-indigo-100"];
                // We'll store this "color class" as the URL for now, handled by the UI
                finalUrl = colors[Math.floor(Math.random() * colors.length)];
            }

            const res = await fetch("/api/vendor/portfolio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: formData.type,
                    url: finalUrl,
                    category: formData.category
                })
            });

            if (!res.ok) throw new Error("Failed to upload");

            const newItem = await res.json();
            setItems(prev => [newItem, ...prev]);
            toast.success("Item uploaded successfully");
            setIsModalOpen(false);
            setFormData({ type: "image", url: "", category: "Wedding" });
            router.refresh();

        } catch (error) {
            toast.error("Failed to upload item");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;
    }

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
            <div className="flex items-center gap-2 mb-6 text-sm overflow-x-auto pb-2 scrollbar-hide">
                {["All", ...Array.from(new Set(items.map(i => i.category))).sort()].map(f => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={clsx(
                            "px-4 py-2 rounded-full border transition whitespace-nowrap",
                            activeFilter === f ? "bg-black text-white border-black" : "bg-white text-gray-600 hover:bg-gray-50 bg-opacity-50"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Upload Placeholder - Always visible as first item or just in the mix? Design usually puts it first. */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-black transition"
                >
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Add Media</span>
                </button>

                {filteredItems.map((item) => {
                    const isMedia = item.url.startsWith("http") || item.url.startsWith("data:");
                    return (
                        <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border">
                            {/* Mock Image Content logic - supports color classes or real URLs */}
                            <div className={clsx("w-full h-full flex items-center justify-center bg-gray-100", !isMedia && item.url)}>
                                {isMedia ? (
                                    item.type === 'video' ? (
                                        <video src={item.url} className="w-full h-full object-cover" controls={false} muted />
                                    ) : (
                                        <img src={item.url} alt="Portfolio" className="w-full h-full object-cover" />
                                    )
                                ) : (
                                    item.type === "video" ? <Video className="w-12 h-12 text-gray-400" /> : <ImageIcon className="w-12 h-12 text-gray-400" />
                                )}
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                                <div className="flex justify-between items-end text-white">
                                    <div>
                                        <p className="font-medium text-sm">{item.category}</p>
                                        <p className="text-xs opacity-75">{item.likes || 0} likes</p>
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
                    );
                })}
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
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={handleFileSelect}
                    />
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer"
                    >
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

                    {formData.url.startsWith("data:") ? (
                        <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg">
                            <div className="flex items-center gap-3 overflow-hidden">
                                {formData.type === 'video' ? (
                                    <Video className="w-10 h-10 text-indigo-500 bg-indigo-50 p-2 rounded" />
                                ) : (
                                    <img src={formData.url} alt="Preview" className="w-10 h-10 object-cover rounded bg-gray-200" />
                                )}
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">File Selected</p>
                                    <p className="text-xs text-gray-500 truncate">Ready to upload</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, url: "" }));
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                                className="p-2 hover:bg-gray-200 rounded-full transition"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    ) : (
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
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                {(VENDOR_CATEGORIES[vendorCategory] || VENDOR_CATEGORIES["default"]).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
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
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-black text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
