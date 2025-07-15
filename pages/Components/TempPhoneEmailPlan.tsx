import React from 'react'
import { Check } from 'lucide-react';
export default function BurnerPhoneNumberEmailPlans() {
  return (
    <div>
    <section className=" text-white px-6 py-3 md:py-20 burnerPhoneNumberEmailPlans" data-aos="fade-up" data-aos-duration="3000">
  <div className="text-center mb-12">
    <div className="inline-block bg-[#1d1e1f] text-lime-400  font-semibold px-3 py-1 rounded-full mb-4">
      * PRICING
    </div>
    <h2 className="text-4xl md:text-5xl font-bold text-cyan-400">
      Burner Phone<br />Number/Email Plans
    </h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
    
    <div className="bg-[#111111] p-8 rounded-xl flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">Forever Free – Temp Mail</h3>
        <p className=" text-gray-400 mb-6">Forever free, even after the launch</p>
        <div className="text-3xl font-bold text-cyan-400 span_month"><h2>$0 <span className=" text-white font-medium">/ per month</span></h2></div>
        <ul className="mt-6 space-y-2  text-gray-300">
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
        </ul>
      </div>
      <a href="#" className="mt-8 inline-block border border-white text-white px-6 py-3 rounded-full  text-center hover:bg-white hover:text-black transition">
        Get Started
      </a>
    </div>

    <div className="bg-gradient-to-b from-[#1f2d22] to-[#111111] p-8 rounded-xl flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">Weekly Temp Phone Number</h3>
        <p className=" text-gray-400 mb-6">Unlimited SMS verification</p>
          <div className="text-3xl font-bold text-cyan-400 span_month"><h2>$9.99  <span className=" text-white font-medium">/ Per Week</span></h2></div>
         <ul className="mt-6 space-y-2  text-gray-300">
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
        </ul>
      </div>
      <a href="#" className="mt-8 inline-block bg-cyan-400 text-black font-medium px-6 py-3 rounded-full  text-center hover:bg-cyan-300 transition">
        Get Started
      </a>
    </div>
    <div className="bg-[#111111] p-8 rounded-xl flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">Monthly Temp Phone Number</h3>
        <p className=" text-gray-400 mb-6">Unlimited SMS verification, Better Price</p>
         <div className="text-3xl font-bold text-cyan-400 span_month"><h2>$19.99  <span className=" text-white font-medium">/ per month</span></h2></div>
          <ul className="mt-6 space-y-2  text-gray-300">
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
          <li className="flex flex-wrap justify-left mb-4 gap-3 align-center"><Check className='text-lime-400'  size={20} /> No signup for temp mail required</li>
        </ul>
      </div>
      <a href="#" className="mt-8 inline-block border border-white text-white px-6 py-3 rounded-full  text-center hover:bg-white hover:text-black transition">
        Get Started
      </a>
    </div>

  </div>
</section>
  
    </div>
  )
}