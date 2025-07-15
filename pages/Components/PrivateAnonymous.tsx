import React from "react";
import { Check } from "lucide-react";
export default function PrivateAnonymous() {
  return (
    <div className="privateAnonymous">
      <div className=" max-w-screen-xl mx-auto  text-white  px-6 py-5 md:py-16 lg:flex items-center justify-between gap-16">
        <div className="lg:w-1/2 flex flex-col items-center justify-center text-center">
          <img src="/5OWCiwpOVASP7Ha4VVU1HYQw.avif" />
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <div className="inline-block bg-[#1d1e1f] text-lime-400 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            * FEATURES
          </div> 
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4" data-aos="fade-up" data-aos-duration="3000">
          Private & <br></br> Anonymous
          </h2>
          <p className="text-gray-300 mb-8" data-aos="fade-up" data-aos-duration="3000">
           Keep your real number and inbox hidden. Ghostible protects your identity from spam, scams, and trackers.
          </p>
          <div className="mt-10 flex flex-wrap justify-left gap-4 text-sm">
            <ul data-aos="fade-up">
              <li className="mt-3">
                <p className="flex flex-wrap justify-center gap-3 align-center">
                  <Check className="text-lime-400" size={20} /> SMS Verification
                </p>
              </li>

              <li className="mt-3">
                <p className="flex flex-wrap justify-center gap-3 align-center">
                  <Check className="text-lime-400" size={20} />
                  Anonymous Use
                </p>
              </li>

              <li className="mt-3">
                <p className="flex flex-wrap justify-center gap-3 align-center">
                  <Check className="text-lime-400" size={20} />
                  Scam Protection
                </p>
              </li>

              <li className="mt-3">
                <p className="flex flex-wrap justify-center gap-3 align-center">
                  <Check className="text-lime-400" size={20} />
                  Delete Whenever
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
