import React from "react";
import Image from "next/image";
export default function TemBannerSection() {
  return (
    <div>
      <section
        className=""
        style={{
          backgroundImage: "url('/')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between sm:px-8 py-16 w-full lg:max-w-7xl mx-auto ">
          <div
            className="md:w-3xl space-y-6"
          >
            <h1 className="text-5xl md:text-5xl font-bold text-white leading-tight mb-8">
              Temporary Phone
              <br />
              Numbers for Verification
            </h1>
            <p className="text-white text-lg mb-8">
              Your privacy is important.
              <span className="font-semibold">Receive SMS online</span> using
              the world`&quot;`s most popular temporary phone number platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 ">
              <select className="px-4 py-2 border rounded w-60 text-white bg-black">
                <option>Select a Country</option>
                <option>USA</option>
                <option>UK</option>
                <option>India</option>
              </select>
              <div className="">
                <button className="bg-teal-400 text-black font-semibold py-4 sm:px-8 rounded-full hover:bg-teal-300 transition cursor-pointer">
                  Buy a Phone Number
                </button>
              </div>
            </div>
          </div>
          <div
            className="md:w-3xl mt-12 md:mt-0"
          >
            <Image src="https://static.vecteezy.com/system/resources/thumbnails/054/613/382/small_2x/3d-hand-holding-smartphone-displaying-verified-badge-icon-png.png" alt="Google" width={600} height={600} className="w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
