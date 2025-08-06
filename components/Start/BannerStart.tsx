import React from 'react'
import Image from "next/image";
import { MoveRight, Check } from 'lucide-react';

export default function BannerStart() {

  const handleworkScroll = () => {
    const section = document.getElementById('how_work');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlepriceScroll = () => {
    const section = document.getElementById('price_sec');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="text-white BannerStart">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div data-aos="fade-right" data-aos-duration="5000">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                Bypass Phone Verification. 
                <span className="text-teal-300"> Stop Spam.</span> Join Any App in <span className="text-teal-300">30 Seconds.</span>
              </h1>
              <p className="text-gray-400 mb-6 text-xl">
                Get instant access to U.S. temporary phone numbers for app
                verification. Protect your privacy, avoid spam, and bypass
                restrictions instantly.
              </p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li className="flex items-center gap-2">
                  <span><Check className="text-teal-300"/></span> Works with Tinder,
                  Instagram, Uber &amp; 200+ apps
                </li>
                <li className="flex items-center gap-2">
                  <span><Check className="text-teal-300"/></span> Real U.S. phone
                  numbers, guaranteed delivery
                </li>
                <li className="flex items-center gap-2">
                  <span><Check className="text-teal-300"/></span> No signup required,
                  instant access
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <button onClick={handlepriceScroll} className="bg-teal-400 group flex w-full md:w-72 justify-center align-middle gap-2.5 text-black px-6 py-3 rounded-md font-semibold hover:bg-teal-300 transition cursor-pointer"><span>Get Started for $9.99 </span>  <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" /></button>
                <button onClick={handleworkScroll} className="bg-black border w-full md:w-56 border-gray-700 px-8 py-3 text-white hover:text-black rounded-md font-semibold hover:bg-teal-400 transition start-howwork transition cursor-pointer">See How It Works</button>
              </div>
            </div>
            <div className="" data-aos="fade-left">
              <Image
                src="/start-app-verification.png"
                alt="Phone 1"
                className="rounded-xl "
                width="600"
                height="500"
              />
            </div>
          </div>
        </section>
    </>
  )
}
