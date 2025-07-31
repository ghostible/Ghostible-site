
import Head from "next/head";
import Link from "next/link";

const PrivacyPolicyPage: React.FC = ({ }) => {
    return (
    <>
      <Head>
        <title>Privacy Policy for Ghostible</title>
        <meta name="description" content="Read Saasta's privacy policy" />
      </Head>

      <main className=" text-white min-h-screen px-4 py-20 policy_contact">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-3xl font-bold text-center mb-2">Privacy Policy for Ghostible</h1>
          <p className="text-center text-gray-400 mb-12  mt-5 font-bold text-sm md:text-base">
            Effective Date: February 1, 2025
          </p>

          <section className="mb-10">
            <h2 className="text-2xl md:text-2xl font-semibold mb-2">1. Introduction</h2>
            <p className="text-gray-300">
              Ghostible (“we”, “us”, or “our”) provides digital privacy tools such as temporary email addresses, phone numbers, and related services. This Privacy Policy outlines how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-2xl font-semibold mb-2">2. Information We Collect</h2>
            <p className="text-gray-300">
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Account Data: Your email address and encrypted password.</li>
                <li>Usage Data: Device/browser type, anonymous IP address, usage logs.</li>
                <li>Payment Info: Processed securely by Stripe — Ghostible does not store full card details.</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-2xl font-semibold mb-2">3. How We Use Information</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>To create and manage your Ghostible account</li>
              <li>To provide access to features such as burner numbers and temp emails</li>
              <li>To maintain platform security and prevent abuse</li>
              <li>To send important service updates</li>
            </ul>
          </section>
       
          <section className="mb-10 mt-10">
            <h2 className="text-2xl md:text-2xl font-semibold mb-2">4. Data Protection</h2>
            <p className="text-gray-300">
              We use secure cloud providers (e.g., Supabase, Stripe, Twilio), encryption, and internal access controls to protect your data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-2xl font-semibold mb-2">5. Data Retention</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Burner emails and numbers are automatically deleted after expiration.</li>
              <li>Account data is retained while your account is active.</li>
              <li>You can request deletion at any time by contacting <Link href="mailto:team@ghostible.io" className="hover:text-teal-400 text-white transition cursor-pointer">team@ghostible.io</Link></li>
            </ul>
          </section>
       
          <section className="mb-10">
            <h2 className="text-2xl md:text-2xl font-semibold mb-2">6. Your Rights</h2>
            <p className="text-gray-300">
             You may access, update, or delete your data by emailing <Link href="mailto:team@ghostible.io" className="hover:text-teal-400 text-white transition cursor-pointer">team@ghostible.io</Link>
            </p>
          </section>
         
          <section className="mb-10">
            <h2 className="text-2xl md:text-2xl font-semibold mb-2">7. Third-Party Services</h2>
            <p className="text-gray-300">
              Ghostible uses the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Supabase – authentication and user management</li>
              <li>Twilio – temporary phone number provisioning</li>
              <li>Stripe – subscription billing</li>
              <li>Google Analytics – anonymized traffic tracking</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-2xl font-semibold mb-2">8. Updates to This Policy</h2>
            <p className="text-gray-300">
              We may update this policy from time to time. We’ll notify users by email if major changes occur.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-2xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-300">
              Questions? Contact us at <Link href="mailto:team@ghostible.io" className="hover:text-teal-400 text-white transition cursor-pointer">team@ghostible.io</Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default PrivacyPolicyPage;