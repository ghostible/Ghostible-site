import React from 'react'
import { MoveRight } from 'lucide-react';
import { Check } from 'lucide-react';
export default function PhoneVerification() {
  return (
    <div>
      
      <section className="bg-[#0b1311] py-20 px-6 text-center pt-10" data-aos="fade-up" data-aos-duration="5000">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
            Stop Letting Phone Verification <br />
            <span className="text-teal-400">Block Your Digital Life</span>
          </h2>
          <p className="text-[#a6a6a6] mt-4 mb-8 text-lg">
            Join thousands of Americans who've reclaimed their privacy and
            freedom online. Get instant access to any app without compromising
            your real phone number.
          </p>
          <div className="bg-black border border-gray-700 rounded-lg py-10 px-4 mb-6">
            <p className="text-teal-400 text-2xl font-bold">
              $2.99 <span className="text-[#a6a6a6] text-base font-normal">
                 gets you started
                </span>
            </p>
            <p className="text-gray-400 text-xs mt-3.5">
              No monthly commitments • Instant access • Money-back guarantee
            </p>
          </div>
          <a
            href="#"
            className="bg-teal-400 group flex gap-2.5 justify-center align-middle w-2xs mx-auto hover:bg-teal-400  text-black font-semibold py-3 px-6 rounded-md  transition"
          >
            <span>Get Started for $2.99</span>  <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <p className="text-gray-400 text-xs gap-2 mt-4 flex justify-center align-center leading-relaxed">
            <Check size={20} /> <span>Works with Tinder, Uber, Instagram &amp; 200+ apps</span>
          </p>
        </div>
      </section>
    </div>
  )
}
