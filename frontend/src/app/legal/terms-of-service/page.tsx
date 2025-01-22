export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6" id="terms-of-service">Terms of Service</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" id="acceptance-of-terms">Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using IKAPIAR, you agree to be bound by these Terms
          of Service. If you do not agree, you may not use the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" id="eligibility">Eligibility</h2>
        <p className="mb-4">
          Only approved alumni of the institution may use IKAPIAR. Each user
          must undergo a verification process.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" id="user-responsibilities">User Responsibilities</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Account Security</strong>: You are responsible for
            maintaining the confidentiality of your account credentials.
          </li>
          <li>
            <strong>Accurate Information</strong>: Ensure that the data you
            provide is accurate and up to date.
          </li>
          <li>
            <strong>Prohibited Activities</strong>: You agree not to:
            <ul className="list-disc pl-6 mt-2">
              <li>Share your account with others.</li>
              <li>Use the platform for unauthorized or malicious purposes.</li>
            </ul>
          </li>
        </ol>
      </section>

      {/* Additional sections following the same pattern */}
      {/* ... */}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" id="contact-us">Contact Us</h2>
        <p>
          For questions or concerns about these Terms of Service, please contact us at{" "}
          <a href="mailto:dev@ikapiar.my.id" className="text-blue-600 hover:underline">
            dev@ikapiar.my.id
          </a>.
        </p>
      </section>
    </div>
  );
}