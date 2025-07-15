import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className=" text-white min-h-screen px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-2">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-400 mb-12 text-sm md:text-base">
          03-10-2024
        </p>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Privacy Policy
          </h2>
          <p className="text-gray-300">
            Saasta is committed to protecting your privacy. This Privacy Policy
            outlines how we collect, use, and safeguard your personal
            information when you visit our website or use our services.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Information We Collect
          </h2>
          <p className="text-gray-300">
            We may collect personal information such as your name, email
            address, phone number, and postal address when you voluntarily
            provide it to us. Additionally, we may collect certain non-personal
            information automatically, including your IP address, browser type,
            operating system, and website usage data through cookies and other
            tracking technologies.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <p className="mb-4 text-gray-300">
            We may use the information we collect from you to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Provide and personalize our services</li>
            <li>
              Communicate with you, including responding to your inquiries and
              providing customer support
            </li>
            <li>Analyze and improve our website and services</li>
            <li>
              Send you promotional materials and updates about our products and
              services, with your consent
            </li>
            <li>
              Comply with legal obligations and enforce our terms of service
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}