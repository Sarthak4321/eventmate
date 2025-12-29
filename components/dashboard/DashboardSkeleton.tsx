export function DashboardSkeleton() {
    return (
        <div className="animate-pulse space-y-8">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-3">
                    <div className="h-10 w-64 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 w-96 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-12 w-40 bg-gray-200 rounded-full"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-3xl"></div>
                ))}
            </div>

            {/* Bookings Skeleton */}
            <div className="grid md:grid-cols-2 gap-8">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-56 bg-gray-200 rounded-3xl"></div>
                ))}
            </div>
        </div>
    );
}
