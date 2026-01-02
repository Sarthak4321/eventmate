"use client";


import { useState, useEffect } from "react";
import { Bell, Lock, Shield, User, ChevronRight, LogOut, Moon, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";

export default function SettingsPage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);

    // Settings State
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: false
    });
    const [darkMode, setDarkMode] = useState(false);

    // Password & Delete State
    const [isPassModalOpen, setIsPassModalOpen] = useState(false);
    const [passForm, setPassForm] = useState({ current: "", new: "", confirm: "" });
    const [passLoading, setPassLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Fetch Settings
    useEffect(() => {
        if (session?.user) {
            fetch("/api/user/settings")
                .then(res => res.json())
                .then(data => {
                    if (data && !data.error) {
                        setNotifications({
                            email: data.emailNotif ?? true,
                            push: data.pushNotif ?? false,
                            marketing: data.marketingNotif ?? false
                        });
                        setDarkMode(data.darkMode ?? false);
                    }
                })
                .catch(() => toast.error("Failed to load settings"))
                .finally(() => setLoading(false));
        }
    }, [session]);

    // Apply Dark Mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    async function updateSettings(payload: any) {
        try {
            const res = await fetch("/api/user/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || data.error || "Failed to update");
            }
            toast.success("Preference updated");
            return true;
        } catch (error: any) {
            toast.error(error.message || "Failed to update setting");
            console.error(error);
            return false;
        }
    }

    async function handleToggle(key: keyof typeof notifications) {
        const newValue = !notifications[key];
        setNotifications(prev => ({ ...prev, [key]: newValue })); // Optimistic update

        // Map frontend keys to backend keys
        const apiKeys = {
            email: "emailNotif",
            push: "pushNotif",
            marketing: "marketingNotif"
        };

        const success = await updateSettings({ [apiKeys[key]]: newValue });
        if (!success) setNotifications(prev => ({ ...prev, [key]: !newValue })); // Revert
    }

    async function handleDarkModeToggle() {
        const newValue = !darkMode;
        setDarkMode(newValue);
        const success = await updateSettings({ darkMode: newValue });
        if (!success) setDarkMode(!newValue);
    }

    // Change Password Logic
    async function submitPasswordChange(e: React.FormEvent) {
        e.preventDefault();
        if (passForm.new !== passForm.confirm) {
            toast.error("New passwords do not match");
            return;
        }
        setPassLoading(true);
        try {
            const res = await fetch("/api/user/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passForm.current,
                    newPassword: passForm.new
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to update password");

            toast.success("Password updated successfully");
            setIsPassModalOpen(false);
            setPassForm({ current: "", new: "", confirm: "" });
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setPassLoading(false);
        }
    }

    // Delete Account Logic
    async function handleDeleteAccount() {
        if (!confirm("Are you ABSOLUTELY sure? This will permanently delete your account, bookings, and data. This action cannot be undone.")) return;

        setDeleteLoading(true);
        try {
            const res = await fetch("/api/user/delete-account", { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete account");

            toast.success("Account deleted successfully");
            signOut({ callbackUrl: "/" });
        } catch (error) {
            toast.error("Failed to delete account");
            setDeleteLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Manage your account preferences and security.</p>

                <div className="grid gap-8">

                    {/* Account Preferences */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                        <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Account Preferences</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">General account settings.</p>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                        <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">Dark Mode</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleDarkModeToggle}
                                    className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${darkMode ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                        <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex items-center gap-3">
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Choose how we communicate with you.</p>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-50 dark:divide-gray-700">
                            {[
                                { key: "email", label: "Email Notifications", desc: "Receive updates about your bookings via email." },
                                { key: "push", label: "Push Notifications", desc: "Get real-time alerts on your device." },
                                { key: "marketing", label: "Marketing Emails", desc: "Receive offers, newsletters, and promotions." }
                            ].map((item) => (
                                <div key={item.key} className="p-6 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle(item.key as any)}
                                        className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${notifications[item.key as keyof typeof notifications] ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 transition-transform duration-300 ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                        <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex items-center gap-3">
                            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Security</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Protect your account.</p>
                            </div>
                        </div>

                        <div className="p-6">
                            <button onClick={() => setIsPassModalOpen(true)} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                        <Lock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-gray-900 dark:text-white">Change Password</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Update your password securely.</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50/50 dark:bg-red-900/20 rounded-3xl shadow-none border border-red-100 dark:border-red-900/50 overflow-hidden transition-colors duration-300">
                        <div className="p-6">
                            <h2 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">Danger Zone</h2>
                            <p className="text-sm text-red-600/70 dark:text-red-300/70 mb-6">Once you delete your account, there is no going back. Please be certain.</p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-semibold rounded-xl text-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors shadow-sm"
                                >
                                    Log Out
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={deleteLoading}
                                    className="px-5 py-2.5 bg-red-600 dark:bg-red-700 text-white font-semibold rounded-xl text-sm hover:bg-red-700 dark:hover:bg-red-600 transition-colors shadow-lg shadow-red-200 dark:shadow-red-900/20 disabled:opacity-70 flex items-center gap-2"
                                >
                                    {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {deleteLoading ? "Deleting..." : "Delete Account"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Change Password Modal */}
            {isPassModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
                            <button onClick={() => setIsPassModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={submitPasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
                                    value={passForm.current}
                                    onChange={e => setPassForm({ ...passForm, current: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
                                    value={passForm.new}
                                    onChange={e => setPassForm({ ...passForm, new: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
                                    value={passForm.confirm}
                                    onChange={e => setPassForm({ ...passForm, confirm: e.target.value })}
                                />
                            </div>
                            <div className="pt-2">
                                <button type="submit" disabled={passLoading} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-200 flex justify-center items-center gap-2">
                                    {passLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {passLoading ? "Updating..." : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
