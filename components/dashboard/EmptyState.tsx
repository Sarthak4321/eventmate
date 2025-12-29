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
        <div className="border border-dashed border-gray-200 rounded-3xl p-12 flex flex-col justify-center items-center text-center">
            {Icon && (
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 text-gray-400">
                    <Icon className="w-8 h-8" />
                </div>
            )}
            <p className="text-xl font-semibold text-gray-900 font-serif">{title}</p>
            <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">{description}</p>
            {actionLabel && actionHref && (
                <Button asChild className="mt-6 rounded-full" variant="outline">
                    <Link href={actionHref}>
                        {actionLabel}
                    </Link>
                </Button>
            )}
        </div>
    );
}
