import React from 'react'
import { Check } from "lucide-react";
import Image from "next/image";

export default function SMSVerificationReady() {
  return (
    <>
        <div className="sMSVerificationReady">
      <div className=" max-w-screen-xl mx-auto text-white px-6 py-5 md:py-16 lg:flex items-center justify-between gap-16">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-4xl md:text-5xl font-medium text-teal-300 mb-4" data-aos="fade-up" data-aos-duration="3000">
          SMS Verification Ready
          </h2>
          <p className="text-gray-300 mb-8" data-aos="fade-up" data-aos-duration="3000">
           Keep your real number and inbox hidden. Ghostible protects your identity from spam, scams, and trackers.
          </p>
          <div className="mt-10 flex flex-wrap justify-left gap-4 text-sm">
            <ul data-aos="fade-up">
              <li className="mt-3">
                <p className="flex flex-wrap justify-center gap-3 align-center">
                  <Check className="text-[#46edd5]" size={20} /> SMS Verification
                </p>
              </li>

              <li className="mt-3">
                <p className="flex flex-wrap justify-center gap-3 align-center">
                  <Check className="text-[#46edd5]" size={20} />
                  Anonymous Use
                </p>
              </li>

              <li className="mt-3">
                <p className="flex flex-wrap justify-center gap-3 align-center">
                  <Check className="text-[#46edd5]" size={20} />
                  Scam Protection
                </p>
              </li>

              <li className="mt-3">
                <p className="flex flex-wrap justify-center gap-3 align-center">
                  <Check className="text-[#46edd5]" size={20} />
                  Delete Whenever
                </p>
              </li>
            </ul>
          </div>
        </div>
         <div className="lg:w-1/2 flex flex-col items-center justify-center text-center">
          <Image src="/awDNqzGCeUlaMo4sOglKEKyp6O0.png" alt="imagetext" width={535} height={460} />
        </div>
      </div>
    </div>
    </>
  )
}