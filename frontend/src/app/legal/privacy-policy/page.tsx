export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6" id="privacy-policy">
                Privacy Policy
            </h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4" id="introduction">
                    Introduction
                </h2>
                <p className="mb-4">
                    Welcome to IKAPIAR, the school alumni data dashboard. We are
                    committed to safeguarding the privacy of our users, who are
                    all alumni of the institution. This Privacy Policy outlines
                    how we collect, use, and protect your information.
                </p>
            </section>

            <section className="mb-8">
                <h2
                    className="text-2xl font-semibold mb-4"
                    id="data-collection"
                >
                    Data Collection
                </h2>
                <p className="mb-4">
                    We collect the following types of information:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>
                        <strong>Personal Information</strong>: Including but not
                        limited to your name, email address, and graduation
                        details.
                    </li>
                    <li>
                        <strong>Google/LinkedIn Sync</strong>: With your
                        consent, we may sync information from your Google or
                        LinkedIn accounts, such as profile details, work
                        history, and contact information.
                    </li>
                    <li>
                        <strong>Forms and Surveys</strong>: Any Google Forms or
                        other surveys filled out for the alumni organization may
                        be integrated into the platform.
                    </li>
                    <li>
                        <strong>Usage Data</strong>: Statistics and analytics
                        related to your interaction with the platform.
                    </li>
                </ol>
            </section>

            {/* Additional sections following the same pattern */}
            {/* ... */}

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4" id="contact-us">
                    Contact Us
                </h2>
                <p>
                    For questions or concerns about this Privacy Policy, please
                    contact us at{" "}
                    <a
                        href="mailto:dev@ikapiar.my.id"
                        className="text-blue-600 hover:underline"
                    >
                        dev@ikapiar.my.id
                    </a>
                    .
                </p>
            </section>
        </div>
    );
}
