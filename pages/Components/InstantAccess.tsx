import Link from "next/link";
import React from "react";

export default function InstantAccess() {
  return (
    <>
      <div className=" max-w-screen-xl mx-auto  text-white  px-6 py-5 md:py-16 lg:flex items-center justify-between gap-16 instantAccess">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <div className="inline-block bg-[#1d1e1f] text-lime-400 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            * FEATURES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4" data-aos="fade-up" data-aos-duration="3000">
            Instant Access
          </h2>
          <p className="text-gray-300 mb-8" data-aos="fade-up" data-aos-duration="3000">
            No sign-up (temp mail only), no hassle. Get your burner phone number
            or temp email in seconds.
          </p>
          <Link
            href="#"
            className="inline-block bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-cyan-300 transition"
          >
            Get Started
          </Link>
        </div>

        <div className="lg:w-1/2 flex flex-col items-center justify-center text-center" data-aos="fade-left">
          <img src="/QXIQIrtD92n6vZe63Q0X1v9Mlhk.avif" />
        </div>
      </div>
    </>
  );
}