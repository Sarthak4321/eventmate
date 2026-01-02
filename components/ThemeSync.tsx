"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ThemeSync() {
    const { data: session } = useSession();

    useEffect(() => {
        // Function to fetch and apply theme
        const applyTheme = async () => {
            if (session?.user?.email) {
                try {
                    const res = await fetch("/api/user/settings");
                    if (res.ok) {
                        const data = await res.json();
                        if (data.darkMode) {
                            document.documentElement.classList.add("dark");
                        } else {
                            document.documentElement.classList.remove("dark");
                        }
                    }
                } catch (error) {
                    console.error("Failed to sync theme:", error);
                }
            }
        };

        applyTheme();
    }, [session]);

    return null;
}
