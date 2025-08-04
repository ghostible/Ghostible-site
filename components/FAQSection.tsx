"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

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
   {
    question: "How long do I have to use the number?",
    answer:
      "One-time use lasts 30 minutes, weekly passes last 7 days, and monthly plans last 30 days. You can receive unlimited SMS codes during your access period.",
  },
   {
    question: "What apps does this work with?",
    answer:
      "Works with 200+ apps including Tinder, Instagram, Uber, DoorDash, WhatsApp, Telegram, Facebook Marketplace, and virtually any app requiring U.S. phone verification.",
  },
];

export default function FAQSection() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(
    pathname === "/start" ? null : 0
  );

  return (
    <section className="text-white px-4 py-0 md:py-20 frequently-faq bg-black">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-center mb-12 mt-8 md:mt-0"
          data-aos="fade-up"
          data-aos-duration="5000"
        >
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-3" data-aos="fade-up" data-aos-duration="5000">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-600 rounded-md overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 bg-black hover:text-teal-400 hover:bg-gray-900 text-left font-semibold focus:outline-none transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="text-2xl cursor-pointer">
                  {pathname === "/start"
                    ? openIndex === index
                      ? <ChevronUp />
                      : <ChevronDown />
                    : openIndex === index
                      ? "−"
                      : "+"}
                </span>
              </button>

              <div
                className={`px-6 text-gray-400 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 py-4" : "max-h-0 py-0"
                }`}
              >
              <span className="text-sm">  {faq.answer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
