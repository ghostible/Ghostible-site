import Image from "next/image";
import React from "react";

export default function TrustedSection() {
  return (
    <>
      <section className="text-white py-3 md:pt-20">
        <div className="text-center mb-2 md:mb-12">
          <div
            className="inline-block bg-[#1d1e1f] text-[#46edd5] text-sm font-semibold px-3 py-1 rounded-full mb-4"
            data-aos="fade-up"
            data-aos-duration="4000"
          >
            * TRUSTED
          </div>
          <h2
            className="text-4xl md:text-5xl pt-9 md:px-0 px-3 font-medium text-teal-300"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            Trsuted by Over 100,000 Americans
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center py-10 px-4 w-full md:w-2/4 mx-auto">
          <div
            data-aos="fade-up"
            data-aos-duration="6000"
            className="bg-[#070806] rounded-xl shadow-md p-6 w-full 
              text-center h-64 border border-cyan-950 
              flex flex-col justify-center mx-auto"
          >
            <Image
              src="/google-removebg-preview.png"
              alt="Google"
              className="mx-auto"
              width="200"
              height="40"
            />
            <div className="flex justify-center mb-1 text-yellow-400 text-xl">
              ★★★★☆
            </div>
            <p className="text-sm text-white">4.8 based on 8,435 reviews</p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="6000"
            className="bg-[#070806] rounded-xl shadow-md p-6 w-full
              text-center h-64 border border-cyan-950 
              flex flex-col justify-center mx-auto"
          >
            <Image
              src="/trustpilot_1.png"
              alt="Trustpilot"
              className="mx-auto"
              width="200"
              height="40"
            />
            <div className="flex justify-center mb-1 text-yellow-400 text-xl">
              ★★★★★
            </div>
            <p className="text-sm text-white">4.9 based on 3,912 reviews</p>
          </div>
        </div>
      </section>
    </>
  );
}
