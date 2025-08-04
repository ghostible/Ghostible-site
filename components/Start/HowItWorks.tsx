import React from 'react'
export default function HowItWorks() {
  return (
    <div>
      
      <section className="bg-black py-16 px-6" data-aos="fade-up" data-aos-duration="5000">
        <div className="max-w-7xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 mb-12">
            Get verified on any app in less than 60 seconds
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative ">
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-[#00ffff1a] rounded-full flex items-center justify-center text-[#00ffff] font-bold relative z-10">
                01
              </div>
              <h3 className="text-white font-semibold mt-4 mb-2">
                Choose Your Plan
              </h3>
              <p className="text-gray-400 text-sm">
                Select one-time use, weekly, or monthly access based on your
                needs
              </p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-[#00ffff1a] rounded-full flex items-center justify-center text-[#00ffff] font-bold relative z-10">
                02
              </div>
              <h3 className="text-white font-semibold mt-4 mb-2">
                Get Your Number
              </h3>
              <p className="text-gray-400 text-sm">
                Instantly receive a real U.S. phone number – no signup required
              </p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-[#00ffff1a] rounded-full flex items-center justify-center text-[#00ffff] font-bold relative z-10">
                03
              </div>
              <h3 className="text-white font-semibold mt-4 mb-2">
                Enter &amp; Verify
              </h3>
              <p className="text-gray-400 text-sm">
                Use the number in any app for verification – Tinder, Uber,
                Instagram, etc.
              </p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-[#00ffff1a] rounded-full flex items-center justify-center text-[#00ffff] font-bold relative z-10">
                04
              </div>
              <h3 className="text-white font-semibold mt-4 mb-2">
                Receive SMS Code
              </h3>
              <p className="text-gray-400 text-sm">
                Get your verification code in seconds and complete app
                registration
              </p>
            </div>
          </div>
          <div className="hidden md:flex absolute left-0 right-0 top-40 mx-auto w-full justify-around px-12">
            <div className="flex-1 border-t-2 border-dashed border-cyan-600" />
            <div className="flex-1 border-t-2 border-dashed border-cyan-600" />
            <div className="flex-1 border-t-2 border-dashed border-cyan-600" />
          </div>
        </div>
      </section>
    </div>
  )
}
