import React from 'react'
import Image from "next/image";
import { MoveRight } from 'lucide-react';
import { Check } from 'lucide-react';
export default function BannerStart() {
  return (
    <div>
         <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div data-aos="fade-right" data-aos-duration="5000">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Bypass Phone Verification.{" "}
              <span className="text-teal-400">Stop Spam.</span>
              <br />
              Join Any App in <span className="text-teal-400">30 Seconds.</span>
            </h1>
            <p className="text-gray-400 mb-6 text-xl">
              Get instant access to U.S. temporary phone numbers for app
              verification. Protect your privacy, avoid spam, and bypass
              restrictions instantly.
            </p>
            <ul className="space-y-2 mb-8 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-teal-400"><Check className="text-teal-400"/></span> Works with Tinder,
                Instagram, Uber &amp; 200+ apps
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400"><Check className="text-teal-400"/></span> Real U.S. phone
                numbers, guaranteed delivery
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-400"><Check className="text-teal-400"/></span> No signup required,
                instant access
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="bg-teal-400 group flex w-full md:w-72 justify-center align-middle gap-2.5 text-black px-6 py-3 rounded-md font-semibold hover:bg-cyan-300 transition"
              >
                <span>Get Started for $2.99 </span>  <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="bg-black border w-full md:w-56 border-gray-700 px-8 py-3 text-white hover:text-black  rounded-md font-semibold hover:bg-teal-400 transition"
              >
                See How It Works
              </a>
            </div>
          </div>
          <div className="" data-aos="fade-left">
            <Image
              src="/app-verification-N5fh7OGn.jpg"
              alt="Phone 1"
              className="rounded-xl "
              width="600"
              height="500"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
