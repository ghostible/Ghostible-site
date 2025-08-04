"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { ChevronUp } from "lucide-react";
// ✅ Next.js 13+ ke liye hook
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
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // ✅ Current page ka path
  const pathname = usePathname();

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
              {/* FAQ Button */}
              <button
                className="w-full flex justify-between items-center px-6 py-4 bg-black hover:text-teal-400 hover:bg-gray-900 text-left font-semibold focus:outline-none transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>

                {/* ✅ Conditional Icon */}
                <span className="text-2xl cursor-pointer">
                  <span className="text-2xl cursor-pointer">
                    {pathname === "/start" ? ( // ✅ Agar current page `/start` hai
                      openIndex === index ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )
                    ) : openIndex === index ? (
                      "−"
                    ) : (
                      "+"
                    )}
                  </span>
                </span>
              </button>

              {/* Answer Section with Smooth Transition */}
              <div
                className={`px-6 text-gray-400 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 py-4" : "max-h-0 py-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
