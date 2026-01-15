import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Plan Your Event | EventMate Services",
    description: "Guidance, services, and smart recommendations for your Wedding, Birthday, or Corporate event.",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
