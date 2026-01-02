import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    icon?: LucideIcon;
}

export function EmptyState({
    title,
    description,
    actionLabel,
    actionHref,
    icon: Icon,
}: EmptyStateProps) {
    return (
        <div className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-3xl p-12 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {Icon && (
                <div className="relative z-10 w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600 transition-transform group-hover:scale-110 duration-500">
                    <Icon className="w-9 h-9" />
                    <div className="absolute inset-0 rounded-full border border-indigo-100 scale-125 opacity-20" />
                </div>
            )}
            <div className="relative z-10 max-w-md">
                <p className="text-xl font-bold text-gray-900 tracking-tight">{title}</p>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{description}</p>
                {actionLabel && actionHref && (
                    <Button asChild className="mt-8 rounded-xl h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95" size="lg">
                        <Link href={actionHref}>
                            {actionLabel}
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}
