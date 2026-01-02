import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    variant?: "icon" | "full"; // Kept for compatibility
    size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, size = "md" }: LogoProps) {
    const sizes = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-5xl",
    };

    return (
        <div className={cn("font-extrabold tracking-tight select-none font-sans flex items-center gap-0.5", sizes[size], className)}>
            <span className="text-gray-900 drop-shadow-sm">Event</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 drop-shadow-sm filter">Mate</span>
        </div>
    );
}
