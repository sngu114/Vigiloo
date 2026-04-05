import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <main className="max-w-4xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-bold text-[#7042F4] uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Effective Date: April 1, 2026 &nbsp;·&nbsp; Last Updated: April 1, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">1. Introduction</h2>
            <p style={{ color: 'var(--muted)' }}>
              Vigiloo is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the Vigiloo platform. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">2. Information We Collect</h2>
            <p style={{ color: 'var(--muted)' }}>We may collect the following types of information:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: 'var(--muted)' }}>
              <li><strong>Account Information:</strong> When you register, we collect your email address and encrypted password.</li>
              <li><strong>Usage Data:</strong> We collect data on how you interact with the Platform, including lessons completed, quiz scores, and session duration.</li>
              <li><strong>Device Information:</strong> We may collect information about the device and browser you use to access the Platform, including IP address, browser type, and operating system.</li>
              <li><strong>User Preferences:</strong> Settings such as theme preferences (light/dark mode) and selected learning paths are stored to personalize your experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">3. How We Use Your Information</h2>
            <p style={{ color: 'var(--muted)' }}>We use the information we collect to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: 'var(--muted)' }}>
              <li>Create and manage your account and authenticate your identity.</li>
              <li>Personalize your learning experience based on your selected age group and progress.</li>
              <li>Track and display your progress through lessons, quizzes, and learning paths.</li>
              <li>Improve the Platform by analyzing usage patterns and identifying areas for enhancement.</li>
              <li>Send you important notices regarding your account or changes to our policies.</li>
              <li>Ensure the security and integrity of the Platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">4. How We Store Your Information</h2>
            <p style={{ color: 'var(--muted)' }}>
              Your data is stored securely using Supabase, a third-party database and authentication provider. All passwords are encrypted and never stored in plain text. We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">5. Sharing of Your Information</h2>
            <p style={{ color: 'var(--muted)' }}>
              Vigiloo does not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: 'var(--muted)' }}>
              <li><strong>Service Providers:</strong> We may share data with trusted third-party providers (such as Supabase) who assist in operating the Platform, subject to confidentiality agreements.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid legal process.</li>
              <li><strong>Protection of Rights:</strong> We may disclose information when we believe it is necessary to protect the rights, property, or safety of Vigiloo, our users, or the public.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">6. Cookies and Tracking</h2>
            <p style={{ color: 'var(--muted)' }}>
              Vigiloo may use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze Platform usage. You may configure your browser to refuse cookies, but doing so may affect the functionality of certain features, including staying logged in between sessions. We do not use cookies for advertising or third-party tracking purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">7. Children's Privacy</h2>
            <p style={{ color: 'var(--muted)' }}>
              Vigiloo is designed to be accessible to users of all ages, including younger users learning about online safety. We do not knowingly collect personal information from children under the age of 13 without verifiable parental consent. If we become aware that we have collected personal information from a child under 13 without appropriate consent, we will take steps to delete that information promptly. Parents or guardians who believe their child has provided us with personal information may contact us at the email address listed below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">8. Your Rights</h2>
            <p style={{ color: 'var(--muted)' }}>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: 'var(--muted)' }}>
              <li><strong>Access:</strong> The right to request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> The right to request correction of inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> The right to request deletion of your personal data, subject to certain legal obligations.</li>
              <li><strong>Objection:</strong> The right to object to the processing of your personal data in certain circumstances.</li>
            </ul>
            <p className="mt-3" style={{ color: 'var(--muted)' }}>
              To exercise any of these rights, please contact us at the email address provided below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">9. Third-Party Links</h2>
            <p style={{ color: 'var(--muted)' }}>
              The Platform may contain links to third-party websites, including external news sources and scam alert reports. Vigiloo is not responsible for the privacy practices or content of those external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">10. Changes to This Policy</h2>
            <p style={{ color: 'var(--muted)' }}>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the Platform after changes are posted constitutes your acceptance of the updated policy. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">11. Contact Us</h2>
            <p style={{ color: 'var(--muted)' }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at{' '}
              <a href="mailto:snunoz2@lsu.edu" className="text-[#7042F4] font-semibold hover:underline">snunoz2@lsu.edu</a>.
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--card-border)' }}>
          <Link href="/" className="text-[#7042F4] font-bold hover:underline flex items-center gap-2">
            ← Back to Vigiloo
          </Link>
        </div>

      </main>
    </div>
  );
}