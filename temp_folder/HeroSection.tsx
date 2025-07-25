// import { useEffect, useState } from 'react'
import Link from 'next/link'
// import Image from "next/image";
import { Check } from 'lucide-react';
import FeatureSection from './FeatureSection';
export default function HeroSection() {
  return (
   <>
    <section className="hero-section">
      <div className='flex items-center justify-center  px-4'>
        <div className=" text-center">
        <h1>
          Burner Phone Numbers  <span className="text-white">& </span> Temporary <br></br> Emails <span  className="text-white">- Private. Fast. No Signup.</span>
        </h1>
        <p className="mt-4 text-gray-300">
          Use disposable numbers and temp emails to protect your privacy online. <br />
          Get started instantly — no account required.
        </p>
        <div className="mt-6">
          <Link href="/tempnumber" className="bg-teal-400 text-black font-semibold py-4 px-8 rounded-full hover:bg-teal-300 transition cursor-pointer">
            Get Started
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap md:justify-center justify-items-start gap-4 text-sm">
          <p className='flex flex-wrap justify-center gap-3 align-center'><Check className='text-[#46edd5]'  size={20} /> No signup for temp mail required</p>
          <p className='flex flex-wrap justify-center gap-3 align-center'><Check className='text-[#46edd5]' size={20} /> Instant access</p>
        </div>
      </div>
      </div>
          <FeatureSection/>
    </section>

   </>
  );
}
