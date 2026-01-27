import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    variant?: "icon" | "full"; // Kept for compatibility
    size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, size = "md", light = false }: LogoProps & { light?: boolean }) {
    const sizes = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-5xl",
    };

    return (
        <div className={cn("font-extrabold tracking-tight select-none font-sans flex items-center gap-0.5", sizes[size], className)}>
            <span className={cn("transition-colors", light ? "text-white" : "text-slate-900")}>Evnt</span>
            <span className={cn("bg-clip-text text-transparent", light ? "bg-white" : "bg-gradient-to-r from-violet-600 to-indigo-600")}>Met</span>
        </div>
    );
}
