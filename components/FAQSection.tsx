"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is a Ghostible temporary number?",
    answer:
      "A Ghostible temp number is a private, one-time-use mobile number you can use to receive SMS verifications online. Unlike free public SMS sites, only you can access the messages — giving you total privacy and security.",
  },
  {
    question: "Can I use it for any website or app?",
    answer:
      "Yes — Ghostible numbers work with most popular platforms like Google, Facebook, Instagram, Telegram, and more. However, some services may block virtual numbers, so we recommend testing with your intended platform before subscribing long-term.",
  },
  {
    question: "Is the number mine permanently?",
    answer:
      "No — Ghostible temp numbers are rented for a set period (e.g. 7 days or 30 days). During that time, no one else can access it, and you’ll receive all SMS sent to that number securely in your Ghostible inbox.",
  },
  {
    question: "Will the number work in my country?",
    answer:
      "Ghostible currently offers U.S. numbers (with more regions coming soon). They work globally for receiving SMS from most apps and services — regardless of where you’re located.",
  },
  {
    question: "Is my data and identity safe?",
    answer:
      "Yes. All messages are encrypted and stored securely. No one else can view your messages, and we don’t log or share any personal data. Ghostible is built from the ground up with privacy as the core.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="text-white px-4 py-0 md:py-20 frequently-faq">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-center mb-12 mt-8 md:mt-0"
          data-aos="fade-up"
          data-aos-duration="5000"
        >
          Frequently Asked Questions (FAQs)
        </h2>

        <div
          className="space-y-4"
          data-aos="fade-up"
          data-aos-duration="5000"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg h-full"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left text-white font-semibold focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              <div
                className={`px-6 pb-5 text-sm text-gray-400 transition-all duration-300 ease-in-out h-full ${
                  openIndex === index ? "md:max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
