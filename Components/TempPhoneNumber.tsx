import { MessageCircleMore,ShieldCheck,GlobeLock,HousePlug    } from 'lucide-react';
import Link from "next/link";

export default function TempPhoneNumber() {
  return (
    <>
     <div className="bg-[#111111] text-gray-800 font-sans">

  <section className="py-16 px-4 lg:w-5xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-white">
      Why We <span className="text-red-600">❤️</span> Temporary Phone Numbers
    </h2>
    <p className="text-white max-w-2xl mx-auto mb-12">
      Our virtual phone numbers are loved worldwide, check out the host of benefits that a temporary phone number offers.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="group border rounded-lg p-6 transition-all duration-300 hover:shadow-xl  text-white hover:bg-blue-50 hover:text-[#000] cursor-pointer">
        <div className="mb-4">
          <div className="mx-auto  flex items-center justify-center">
            <MessageCircleMore className="text-[#46edd5]" size={50} />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 ">Stop SMS spam</h3>
        <p className=" text-sm">Protect your privacy by using our thousands of disposable virtual phone numbers.</p>
      </div>
      <div className="group border rounded-lg p-6 transition-all duration-300 hover:shadow-xl  text-white hover:bg-blue-50 hover:text-[#000] cursor-pointer">
        <div className="mb-4">
          <div className="mx-auto  flex items-center justify-center">
         <ShieldCheck className="text-[#46edd5]" size={50} />
          </div>
        </div>
        <h3 className="text-lg font-semibold  mb-2">Bypass SMS verification</h3>
        <p className=" text-sm">Long and short term rentals for all non-voip numbers. Never use your real number again online.</p>
      </div>
      <div className="group border rounded-lg p-6 transition-all duration-300 hover:shadow-xl  text-white hover:bg-blue-50 hover:text-[#000] cursor-pointer">
        <div className="mb-4">
          <div className="mx-auto  flex items-center justify-center">
          <GlobeLock className="text-[#46edd5]" size={50} />
          </div>
        </div>
        <h3 className="text-lg font-semibold  mb-2">Anonymous & secure</h3>
        <p className=" text-sm">All data is encrypted to ensure your privacy and protection from online companies.</p>
      </div>
      <div className="group border rounded-lg p-6 transition-all duration-300 hover:shadow-xl  text-white hover:bg-blue-50 hover:text-[#000] cursor-pointer">
        <div className="mb-4">
          <div className="mx-auto  flex items-center justify-center">
           <HousePlug className="text-[#46edd5]" size={50} />
          </div>
        </div>
        <h3 className="text-lg font-semibold  mb-2">Build & automate</h3>
        <p className="text-sm">Easily integrate our API and scale your app with secure phone number support.</p>
      </div>

    </div>
  </section>

</div>
    </>
  );
}
