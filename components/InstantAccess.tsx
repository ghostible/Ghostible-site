import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export default function InstantAccess() {
  return (
    <>
      <section className="Feature_section">
        <div className="text-center mb-4 mt-16" data-aos="fade-up"
                  data-aos-duration="5000">
          <div className="inline-block m-auto bg-[#1d1e1f] text-[#46edd5] text-sm font-semibold px-3 py-1 rounded-full mb-4">
            * FEATURES
          </div>
        </div>
        <div className=" max-w-screen-xl mx-auto text-white px-6 py-5 md:py-16 lg:flex items-center md:justify-between gap-16 instantAccess">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2
              className="text-4xl md:text-5xl font-medium text-teal-300 mb-4 md:text-start text-center"
              data-aos="fade-up"
              data-aos-duration="5000"
            >
              Instant Access
            </h2>
            <p
              className="text-gray-300 mb-8  md:text-start text-center"
              data-aos="fade-up"
              data-aos-duration="5000"
            >
              No sign-up (temp mail only), no hassle. Get your burner phone number
              or temp email in seconds.
            </p>
            <div className="flex justify-center md:justify-start" data-aos="fade-up"
                data-aos-duration="4000">
              <Link
                href="/temp-mail"
                className="inline-block bg-teal-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-teal-300 transition cursor-pointer"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div
            className="lg:w-1/2 flex flex-col items-center justify-center text-center"
            data-aos="fade-left"
          >
            <Image
              src="/QXIQIrtD92n6vZe63Q0X1v9Mlhk.png"
              alt="imagetext"
              width={535}
              height={460}
            />
          </div>
        </div>
        <div className="privateAnonymous">
          <div className=" max-w-screen-xl mx-auto text-white px-6 py-5 md:py-16 lg:flex items-center justify-between gap-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2
                className="text-4xl md:text-5xl font-medium text-teal-300 mb-4 md:text-start text-center"
                data-aos="fade-up"
                data-aos-duration="5000"
              >
                Private & <br></br> Anonymous
              </h2>
              <p
                className="text-gray-300 mb-8 md:text-start text-center"
                data-aos="fade-up"
                data-aos-duration="5000"
              >
                Keep your real number and inbox hidden. Ghostible protects your
                identity from spam, scams, and trackers.
              </p>
              <div className="mt-10 flex flex-wrap md:justify-start justify-center gap-4 text-sm"  data-aos="fade-up"
                data-aos-duration="5000">
                <ul data-aos="fade-up ">
                  <li className="mt-3">
                    <p className="flex flex-wrap justify-center gap-3 align-center">
                      <Check className="text-[#46edd5]" size={20} /> SMS
                      Verification
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
            <div className="lg:w-1/2 flex flex-col items-center justify-center text-center"  data-aos="fade-left">
              <Image
                src="/5OWCiwpOVASP7Ha4VVU1HYQw.png"
                alt="imagetext"
                width={535}
                height={460}
              />
            </div>
          </div>
        </div>
        <div className="sMSVerificationReady">
          <div className=" max-w-screen-xl mx-auto text-white px-6 py-5 md:py-16 lg:flex items-center justify-between gap-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2
                className="text-4xl md:text-5xl font-medium text-teal-300 mb-4 md:text-start text-center"
                data-aos="fade-up"
                data-aos-duration="5000"
              >
                SMS Verification Ready
              </h2>
              <p
                className="text-gray-300 mb-8 md:text-start text-center"
                data-aos="fade-up"
                data-aos-duration="5000"
              >
                Keep your real number and inbox hidden. Ghostible protects your
                identity from spam, scams, and trackers.
              </p>
              <div className="mt-10 flex flex-wrap md:justify-start justify-center gap-4 text-sm">
                <ul data-aos="fade-up">
                  <li className="mt-3">
                    <p className="flex flex-wrap justify-center gap-3 align-center">
                      <Check className="text-[#46edd5]" size={20} /> SMS
                      Verification
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
            <div className="lg:w-1/2 flex flex-col items-center justify-center text-center"  data-aos="fade-left">
              <Image
                src="/awDNqzGCeUlaMo4sOglKEKyp6O0.png"
                alt="imagetext"
                width={535}
                height={460}
              />
            </div>
          </div>
        </div>
        <div className="sMSVerificationReady">
          <div className=" max-w-screen-xl mx-auto  text-white  px-6 py-5 md:py-16 lg:flex items-center justify-between gap-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2
                className="text-4xl md:text-5xl font-medium text-teal-300 mb-4 md:text-start text-center"
                data-aos-duration="5000"
                data-aos="fade-up"
              >
                Temp Email Addresses
              </h2>
              <p
                className="text-gray-300 mb-8 md:text-start text-center"
                data-aos-duration="5000"
                data-aos="fade-up"
              >
                Keep your real number and inbox hidden. Ghostible protects your
                identity from spam, scams, and trackers.
              </p>
            </div>
            <div className="lg:w-1/2 flex flex-col items-center justify-center text-center"  data-aos="fade-left">
              <Image
                src="/hg0aUaY4Of4GIn6vPMX0EH65V5o.png"
                alt="imagetext"
                width={535}
                height={460}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
