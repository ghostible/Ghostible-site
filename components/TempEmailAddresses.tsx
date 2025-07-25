import React from 'react'
import Image from "next/image";

export default function TempEmailAddresses() {
  return (
    <>
      <div>
        <div className="sMSVerificationReady" >
          <div className=" max-w-screen-xl mx-auto  text-white  px-6 py-5 md:py-16 lg:flex items-center justify-between gap-16">
            <div className="lg:w-1/2 flex flex-col items-center justify-center text-center">
              <Image src="/hg0aUaY4Of4GIn6vPMX0EH65V5o.png" alt="imagetext" width={535} height={460} />
            </div>
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <div className="inline-block bg-[#1d1e1f] text-[#46edd5] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                * FEATURES
              </div>
                  <h2 className="text-4xl md:text-5xl font-medium text-teal-300 mb-4"
                  data-aos-duration="3000" data-aos="fade-up">
                Temp Email Addresses
              </h2>
              <p className="text-gray-300 mb-8"    data-aos-duration="3000" data-aos="fade-up">
              Keep your real number and inbox hidden. Ghostible protects your identity from spam, scams, and trackers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}