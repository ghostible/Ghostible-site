import React from 'react'
import { MoveRight } from 'lucide-react';
import { Check } from 'lucide-react';
export default function TransparentPricing() {
  return (
    <div>
      
      <section className="py-16 px-6" data-aos="fade-up" data-aos-duration="5000">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 mb-12 max-w-1xl mx-auto">
            No hidden fees, no subscriptions you can't cancel. Pay only for what
            you need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 border border-gray-700 hover:border-teal-400 rounded-lg p-8 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-white mb-1 mt-2.5">
                One-Time Use
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Perfect for one app verification
              </p>
              <p className="text-4xl font-bold text-white mb-6">$2.99 <span className="text-gray-400 mb-6 text-sm font-light">/ single use</span></p>
              <ul className="text-gray-300 text-sm space-y-2 mb-6 text-left w-full">
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> 1 temp phone number
                </li>
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> Receive 1 SMS code
                </li>
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> Works for 30 minutes
                </li>
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> All major apps supported
                </li>
              </ul>
              <button className="bg-black text-white w-full cursor-pointer border border-gray-700 px-6 py-2 rounded-md hover:bg-teal-400 transition">
                Get Number Now
              </button>
            </div>
            <div className="bg-black/40 border-2 hover:border-teal-400 border-gray-700 rounded-lg p-8 flex flex-col items-center relative">
              <span className="absolute -top-6 bg-teal-400 text-black text-md font-bold px-4 py-2.5  rounded-full">
                Most Popular
              </span>
              <h3 className="text-2xl font-semibold text-white mb-1 mt-2.5">
                Weekly Pass
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Great for multiple app signups
              </p>
              <p className="text-4xl font-bold text-white mb-6">$2.99 <span className="text-gray-400 mb-6 text-sm font-light">/ single use</span></p>
              <ul className="text-gray-300 text-sm space-y-2 mb-6 text-left w-full">
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> Unlimited temp numbers
                </li>
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> Unlimited SMS codes
                </li>
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> 7-day access period
                </li>
                <li className="flex items-center gap-2"><Check className='text-[#16a249]' size={20}/> Priority support</li>
              </ul>
              <button className="bg-black text-white w-full cursor-pointer border border-gray-700 px-6 py-2 rounded-md hover:bg-teal-400 transition">
                Start Weekly Pass
              </button>
            </div>
            <div className="bg-black/40 border border-gray-700 hover:border-teal-400 rounded-lg p-8 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-white mb-1 mt-2.5">
                Monthly Plan
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Best value for power users
              </p>
              <p className="text-4xl font-bold text-white mb-6">$2.99 <span className="text-gray-400 mb-6 font-light text-sm">/ single use</span></p>
              <ul className="text-gray-300 text-sm space-y-2 mb-6 text-left w-full">
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> Unlimited temp numbers
                </li>
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> Unlimited SMS codes
                </li>
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> 30-day access period
                </li>
                <li className="flex items-center gap-2">
                  <Check className='text-[#16a249]' size={20}/> Dedicated phone line
                </li>
              </ul>
              <button className="bg-black text-white border cursor-pointer w-full border-gray-700 px-6 py-2 rounded-md hover:bg-teal-400 transition">
                Go Monthly
              </button>
            </div>
          </div>
          <div className="mt-10">
            <button className="bg-teal-400 flex group gap-2.5  cursor-pointer mx-auto justify-center text-black font-medium px-8 py-3 rounded-md hover:bg-cyan-300 transition">
              <span>Get a Temp Number Now</span>  <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
