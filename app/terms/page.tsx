import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <main className="max-w-4xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-bold text-[#7042F4] uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-5xl font-black tracking-tight mb-4">Terms of Service</h1>
          <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Effective Date: April 1, 2026 &nbsp;·&nbsp; Last Updated: April 1, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">1. Acceptance of Terms</h2>
            <p style={{ color: 'var(--muted)' }}>
              By accessing or using Vigiloo ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform. These Terms constitute a legally binding agreement between you and Vigiloo (operated by Team 4 as a non-profit educational initiative) regarding your use of the Platform and all related services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">2. Description of Service</h2>
            <p style={{ color: 'var(--muted)' }}>
              Vigiloo is an interactive cybersecurity education platform designed to help non-technical users identify and avoid online scams, phishing attacks, and digital fraud. The Platform provides gamified learning modules, scam simulations, daily quizzes, real-time scam news, and related educational content. Vigiloo is provided free of charge and is intended solely for educational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">3. Eligibility</h2>
            <p style={{ color: 'var(--muted)' }}>
              You must be at least 13 years of age to use the Platform. By creating an account, you represent and warrant that you meet this age requirement. If you are under the age of 18, you represent that you have obtained parental or guardian consent to use the Platform. Vigiloo reserves the right to terminate accounts found to be in violation of this provision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">4. User Accounts</h2>
            <p style={{ color: 'var(--muted)' }}>
              To access certain features of the Platform, you must register for an account using a valid email address and password. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify Vigiloo immediately of any unauthorized use of your account. Vigiloo is not liable for any loss or damage arising from your failure to maintain the security of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">5. Acceptable Use</h2>
            <p style={{ color: 'var(--muted)' }}>
              You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: 'var(--muted)' }}>
              <li>Use the Platform to engage in any fraudulent, deceptive, or harmful activity.</li>
              <li>Attempt to gain unauthorized access to any portion of the Platform or its related systems.</li>
              <li>Reverse engineer, decompile, or otherwise attempt to extract the source code of the Platform.</li>
              <li>Upload or transmit any malware, viruses, or other malicious code.</li>
              <li>Use automated tools, bots, or scrapers to access or collect data from the Platform without prior written consent.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">6. Educational Content Disclaimer</h2>
            <p style={{ color: 'var(--muted)' }}>
              All content provided on Vigiloo, including lessons, quizzes, simulations, and news articles, is intended for general educational purposes only. While Vigiloo strives to provide accurate and up-to-date information regarding cybersecurity threats and scam prevention, the Platform does not guarantee the completeness, accuracy, or applicability of any content to your specific circumstances. Vigiloo is not a substitute for professional legal, financial, or cybersecurity advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">7. Intellectual Property</h2>
            <p style={{ color: 'var(--muted)' }}>
              All content, trademarks, logos, and intellectual property displayed on the Platform are the property of Vigiloo or its respective owners. You are granted a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial educational purposes. You may not reproduce, distribute, modify, or create derivative works of any content on the Platform without prior written permission from Vigiloo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">8. Privacy</h2>
            <p style={{ color: 'var(--muted)' }}>
              Your use of the Platform is also governed by our{' '}
              <Link href="/privacy" className="text-[#7042F4] font-semibold hover:underline">Privacy Policy</Link>,
              which is incorporated into these Terms by reference. By using the Platform, you consent to the collection and use of your information as described in the Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">9. Termination</h2>
            <p style={{ color: 'var(--muted)' }}>
              Vigiloo reserves the right to suspend or terminate your account and access to the Platform at any time, with or without notice, for conduct that Vigiloo believes violates these Terms or is harmful to other users, Vigiloo, third parties, or the integrity of the Platform. Upon termination, your right to use the Platform will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">10. Limitation of Liability</h2>
            <p style={{ color: 'var(--muted)' }}>
              To the fullest extent permitted by applicable law, Vigiloo and its team members shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use the Platform. Vigiloo's total liability to you for any claims arising under these Terms shall not exceed the amount you have paid to Vigiloo in the twelve months preceding the claim, which in most cases will be zero given the free nature of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">11. Changes to Terms</h2>
            <p style={{ color: 'var(--muted)' }}>
              Vigiloo reserves the right to modify these Terms at any time. We will notify users of material changes by updating the "Last Updated" date at the top of this page. Your continued use of the Platform after any changes constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">12. Governing Law</h2>
            <p style={{ color: 'var(--muted)' }}>
              These Terms shall be governed by and construed in accordance with the laws of the State of Louisiana, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Baton Rouge, Louisiana.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#7042F4]">13. Contact</h2>
            <p style={{ color: 'var(--muted)' }}>
              If you have any questions about these Terms of Service, please contact us at{' '}
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