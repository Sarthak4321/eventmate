import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Vision | EvntMet",
    description: "EvntMet is the operating system for celebrations—replacing chaos with clarity for India's events.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
