import { Calendar, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BookingProps {
    id: string;
    serviceName: string;
    category: string;
    date: string;
    location: string;
    status: "pending" | "confirmed" | "completed";
    image?: string;
    price?: string;
}

// Map categories to placeholder images if no image provided
const categoryImages: Record<string, string> = {
    "Photography": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop",
    "Venue": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
    "Catering": "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop",
    "default": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop"
};

export function BookingCard({ booking }: { booking: BookingProps }) {
    const imageUrl = booking.image || categoryImages[booking.category] || categoryImages["default"];

    const statusStyles = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
        completed: "bg-slate-100 text-slate-700 border-slate-200"
    };

    return (
        <div className="group bg-white rounded-3xl border border-gray-100 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">

            {/* LEFT: IMAGE */}
            <div className="sm:w-48 h-48 sm:h-auto bg-gray-100 relative shrink-0">
                <img
                    src={imageUrl}
                    alt={booking.serviceName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:hidden" />
                <div className="absolute top-3 right-3 sm:hidden">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                </div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-medium text-purple-600 uppercase tracking-wider mb-1">{booking.category}</p>
                            <h3 className="text-xl font-bold text-gray-900 font-serif leading-tight">{booking.serviceName}</h3>
                        </div>
                        <span className={`hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[booking.status]}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{booking.location}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between gap-4">
                    {booking.price && (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-medium">Estimate</span>
                            <span className="text-sm font-semibold">{booking.price}</span>
                        </div>
                    )}

                    <div className="flex gap-2 ml-auto">
                        <Button variant="outline" size="sm" className="rounded-xl h-10 px-4 gap-2 text-xs">
                            <MessageCircle className="w-4 h-4" />
                            Chat
                        </Button>
                        <Button size="sm" className="rounded-xl h-10 px-4 gap-2 text-xs bg-gray-900 hover:bg-black">
                            Details
                            <ArrowRight className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
