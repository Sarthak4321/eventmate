export default function PrivacyPage() {
    return (
        <div className="bg-white min-h-screen py-20 md:py-32">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
                <p className="text-gray-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg prose-gray max-w-none">
                    <p>
                        Welcome to EvntMet. We value your trust and are committed to protecting your personal information.
                        This Privacy Policy explains how evntmet.com ("we," "us," or "our") collects, uses, shares, and protects your information when you use our website and services.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We collect information that you provide directly to us, such as when you create an account, update your profile, request quotes, or communicate with vendors. This includes:
                    </p>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, phone number, and location.</li>
                        <li><strong>Event Details:</strong> Event date, type, budget, and preferences.</li>
                        <li><strong>Vendor Information:</strong> Business name, portfolio, pricing, and specific service details.</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>
                        We use the information we collect to provide, maintain, and improve our services, including:
                    </p>
                    <ul>
                        <li>Facilitating connections between users and vendors.</li>
                        <li>Processing bookings and managing quotes.</li>
                        <li>Sending technical notices, updates, and security alerts.</li>
                        <li>Analyzing trends and user activity to improve the platform experience.</li>
                    </ul>

                    <h3>3. Information Sharing</h3>
                    <p>
                        We do not sell your personal information. We may share your information in the following circumstances:
                    </p>
                    <ul>
                        <li><strong>With Vendors:</strong> When you request a quote or contact a vendor, we share strictly necessary details to facilitate the connection.</li>
                        <li><strong>Legal compliance:</strong> If required by law, regulation, or legal process.</li>
                    </ul>

                    <h3>4. Data Security</h3>
                    <p>
                        We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                    </p>

                    <h3>5. Your Rights</h3>
                    <p>
                        You have the right to access, correct, or delete your personal information. You can manage your profile settings directly through your dashboard or contact our support team for assistance.
                    </p>

                    <h3>6. Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at support@evntmet.com.
                    </p>
                </div>
            </div>
        </div>
    );
}
