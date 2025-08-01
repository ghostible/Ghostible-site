import React from "react";
import { UserRound, TicketSlash, FolderLock, Spool, UserRoundCheck, RefreshCcwDot } from "lucide-react";

export default function HowWorks() {
  return (
    <>
        <section
          className="how-work text-white py-3 md:py-20 howWorks"
          data-aos="fade-up"
          data-aos-duration="5000"
        >
          <div className="text-center mb-12" data-aos="fade-up"
              data-aos-duration="4000">
            <div className="inline-block bg-[#1d1e1f] text-[#46edd5] text-sm font-semibold px-3 py-1 rounded-full mb-4">
              * HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-teal-300">
              How it Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto md:px-0 px-3" data-aos="fade-up"
              data-aos-duration="3000">
            <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
              <div className="flex justify-center">
                <div className="bg-[#1e1e1e] p-3 rounded-lg text-cyan-400 md:h-12 md:w-12 w-12 h-12 flex flex-wrap justify-center gap-3 items-center">
                  <UserRound className="text-[#48e0d3]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6 md:text-start text-center">
                  Pick a Tool
                </h3>
                <p className="text-gray-300 text-sm mt-1 md:text-start text-center">
                  Choose between a <strong>temporary phone number</strong> or a{" "}
                  <strong>disposable email address</strong> — no signup needed.
                </p>
              </div>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
              <div className="flex justify-center">
                <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 md:h-12 md:w-12 w-12 h-12 flex flex-wrap justify-center gap-3 align-center">
                  <TicketSlash className="text-[#48e0d3]" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6 md:text-start text-center">
                  Use Instantly
                </h3>
                <p className="text-gray-300 mt-1">
                  Get your number or email instantly. Use it to receive SMS
                  verifications, sign up to websites, or avoid spam.
                </p>
              </div>
            </div>

            <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
              <div className="flex justify-center">
                <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 md:h-12 md:w-12 w-12 h-12 flex flex-wrap justify-center gap-3 align-center">
                  <FolderLock className="text-[#48e0d3]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6 md:text-start text-center">
                  Stay Private
                </h3>
                <p className="text-gray-300 text-sm mt-1 md:text-start text-center">
                  Your real identity stays protected. Messages and emails are
                  automatically deleted after a short time.
                </p>
              </div>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
              <div className="flex justify-center">
                <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 md:h-12 md:w-12 w-12 h-12 flex flex-wrap justify-center gap-3 align-center">
                  <Spool className="text-[#48e0d3]" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6 md:text-start text-center">
                  Add What You Need
                </h3>
                <p className="text-gray-300 text-sm mt-1 md:text-start text-center">
                  Need a number that lasts longer? Upgrade to a{" "}
                  <strong>weekly or monthly burner number</strong> plan with
                  auto-renewal. More features, same privacy.
                </p>
              </div>
            </div>

            <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
              <div className="flex justify-center">
                <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 md:h-12 md:w-12 w-12 h-12 flex flex-wrap justify-center gap-3 align-center">
                  <UserRoundCheck className="text-[#48e0d3]" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6 md:text-start text-center">
                  Done. Vanish.
                </h3>
                <p className="text-gray-300 text-sm mt-1 md:text-start text-center">
                  Once you&apos;re finished, your details disappear. No
                  tracking, no inbox clutter, just peace of mind.
                </p>
              </div>
            </div>

            <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
              <div className="flex justify-center">
                <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 md:h-12 md:w-12 w-12 h-12 flex flex-wrap justify-center gap-3 align-center">
                  <RefreshCcwDot className="text-[#48e0d3]" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6 md:text-start text-center">
                  Reuse or Rotate
                </h3>
                <p className="text-gray-300 text-sm mt-1 md:text-start text-center">
                  Need another one? Get a fresh number or email anytime with a
                  single click. Stay in control, stay anonymous — every time.
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
