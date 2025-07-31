// import { useEffect, useState } from 'react'
// import axios from 'axios'
import Link from "next/link";

const TermsConditionsPage: React.FC = ({ }) => {
    return (
    <>
      <main className=" text-white min-h-screen px-4 py-20  policy_contact" >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-3xl font-bold text-center mb-2">
          Terms & Conditions for Ghostible
        </h1>
        <p className="text-center text-gray-400 mb-12 text-sm">Effective Date: February 1, 2025</p>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">1. Agreement</h2>
          <p className="text-gray-300">
            By signing up for Ghostible, you agree to these Terms and Conditions. If you do not accept these terms, you may not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">2. Services Provided</h2>
          <p className="text-gray-300">
            Ghostible offers privacy-focused digital tools including:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Temporary email inboxes</li>
              <li>Burner phone numbers</li>
              <li>Optional future features (VPN, password vault, dark web alerts, etc.)</li>
            </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">3. Eligibility</h2>
          <p className="text-gray-300 mb-2">
            You must be 18 years or older to use Ghostible.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">4. Account Responsibilities</h2>
          <p className="text-gray-300">
            You are responsible for safeguarding your login credentials. Notify us at team@ghostible.io of any unauthorized use.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">5. Acceptable Use</h2>
          <p className="text-gray-300">
            You may not use Ghostible to: </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Engage in illegal, fraudulent, or abusive behavior</li>
              <li>Harass others or bypass verification systems</li>
              <li>Interfere with our platform or reverse engineer its code</li>
            </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">6. Payments & Billing</h2>
           <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>All paid features are processed via Stripe.</li>
              <li>Subscriptions auto-renew unless cancelled.</li>
              <li>You can cancel anytime via your account dashboard.</li>
            </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">7. Refund Policy</h2>
          <p className="text-gray-300">
            Due to the nature of digital services, we do not offer refunds once a service or subscription is activated.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">8. Termination</h2>
          <p className="text-gray-300">
            We may suspend or terminate your account for violation of these Terms or misuse of the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">9. Limitation of Liability</h2>
          <p className="text-gray-300">
            Ghostible is provided “as is.” We are not liable for any damages resulting from the use of, or inability to use, our platform.
          </p>
        </section>

         <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">10. Governing Law</h2>
          <p className="text-gray-300">
            These terms are governed by the laws of New South Wales, Australia.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl md:text-2xl font-semibold mb-2">11. Contact</h2>
          <p className="text-gray-300">
            Questions? Contact us at <Link href="mailto:team@ghostible.io" className="hover:text-teal-400 text-white transition cursor-pointer">team@ghostible.io</Link>
          </p>
        </section>
      </div>
    </main>
    </>
  );
}

export default TermsConditionsPage;