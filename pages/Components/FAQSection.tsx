"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What exactly is project management software, and how can it benefit my team?",
    answer:
      "Project management software is a tool designed to help teams plan, organize, and execute projects efficiently. It benefits your team by providing centralized communication, task management, and progress tracking.",
  },
  {
    question: "Is your project management software suitable for teams of all sizes?",
    answer:
      "Yes! Our tool scales with your team — from solo freelancers to large enterprises.",
  },
  {
    question: "Can I customize and integrate SaaS applications with other tools?",
    answer:
      "Absolutely. Our platform integrates with a wide range of tools like Slack, Zoom, Google Workspace, and more.",
  },
  {
    question: "Is SaaS suitable for startups and small businesses?",
    answer:
      "Yes, our pricing and features are tailored to help startups grow without burning budgets.",
  },
  {
    question: "How can SaaS benefit my business?",
    answer:
      "It reduces costs, speeds up workflows, enables remote collaboration, and gives you access to the latest tools automatically.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

  return (
    <section className=" text-white px-6 py-20 frequently-faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12" data-aos="fade-up" data-aos-duration="3000">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-4" data-aos="fade-up" data-aos-duration="3000">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden"
            >
              <button className="w-full flex justify-between items-center px-6 py-5 text-left text-white font-semibold focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              <div
                className={`px-6 pb-5 text-sm text-gray-400 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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
