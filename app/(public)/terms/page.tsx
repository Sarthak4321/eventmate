export default function TermsPage() {
    return (
        <div className="bg-white min-h-screen py-20 md:py-32">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Terms of Service</h1>
                <p className="text-gray-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg prose-gray max-w-none">
                    <p>
                        Please read these Terms of Service ("Terms") carefully before using EventMate. By accessing or using our platform, you agree to be bound by these Terms.
                    </p>

                    <h3>1. Acceptance of Terms</h3>
                    <p>
                        By accessing or using EventMate, you confirm your agreement to be bound by these Terms. If you do not agree to these Terms, you may not access or use usage of our services.
                    </p>

                    <h3>2. Accounts and Registration</h3>
                    <p>
                        To access certain features, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
                    </p>

                    <h3>3. User Conduct</h3>
                    <p>
                        You agree not to use the platform for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You agree not to:
                    </p>
                    <ul>
                        <li>Submit false or misleading information.</li>
                        <li>Harass, abuse, or harm another person.</li>
                        <li>Scrape or collect data from the platform without authorization.</li>
                    </ul>

                    <h3>4. Vendor Content and Services</h3>
                    <p>
                        Vendors are independent contractors and not employees or agents of EventMate. We are not responsible for the quality, safety, or legality of the services provided by vendors. Any transaction between a user and a vendor is solely between those parties.
                    </p>

                    <h3>5. Intellectual Property</h3>
                    <p>
                        The EventMate platform and its original content, features, and functionality are and will remain the exclusive property of EventMate and its licensors.
                    </p>

                    <h3>6. Limitation of Liability</h3>
                    <p>
                        In no event shall EventMate, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </p>

                    <h3>7. Termination</h3>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>

                    <h3>8. Changes to Terms</h3>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                    </p>
                </div>
            </div>
        </div>
    );
}
