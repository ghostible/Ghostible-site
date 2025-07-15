import React from "react";
import { UserRound } from "lucide-react";
import { TicketSlash } from "lucide-react";
export default function HowWorks() {
  return (
    <div>
      <section className=" text-white py-3 md:py-20 howWorks" data-aos="fade-up" data-aos-duration="3000">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#1d1e1f] text-lime-400 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            * HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 ">
            How it Works
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
            <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 h-12 w-24 flex flex-wrap justify-center gap-3 align-center">
              <UserRound />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6">Pick a Tool</h3>
              <p className="text-gray-300 text-sm mt-1">
                Choose between a <strong>temporary phone number</strong> or a{" "}
                <strong>disposable email address</strong> — no signup needed.
              </p>
            </div>
          </div>
          <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
            <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 h-12 w-24 flex flex-wrap justify-center gap-3 align-center">
              <TicketSlash />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6">Use Instantly</h3>
              <p className="text-gray-300 mt-1">
                Get your number or email instantly. Use it to receive SMS
                verifications, sign up to websites, or avoid spam.
              </p>
            </div>
          </div>

          <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
            <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 h-12 w-24 flex flex-wrap justify-center gap-3 align-center">
              <UserRound />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6">Stay Private</h3>
              <p className="text-gray-300 text-sm mt-1">
                Your real identity stays protected. Messages and emails are
                automatically deleted after a short time.
              </p>
            </div>
          </div>
          <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
            <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 h-12 w-24 flex flex-wrap justify-center gap-3 align-center">
              <UserRound />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6">Add What You Need</h3>
              <p className="text-gray-300 text-sm mt-1">
                Need a number that lasts longer? Upgrade to a{" "}
                <strong>weekly or monthly burner number</strong> plan with
                auto-renewal. More features, same privacy.
              </p>
            </div>
          </div>

          <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
            <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 h-12 w-24 flex flex-wrap justify-center gap-3 align-center">
              <UserRound />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6">Done. Vanish.</h3>
              <p className="text-gray-300 text-sm mt-1">
                Once you're finished, your details disappear. No tracking, no
                inbox clutter, just peace of mind.
              </p>
            </div>
          </div>

          <div className="bg-[#111111] p-6 rounded-xl md:flex d-block gap-4">
            <div className="bg-[#1e1e1e] p-3  rounded-lg text-cyan-400 h-12 w-24 flex flex-wrap justify-center gap-3 align-center">
              <UserRound />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-5 md:mt-0 mt-6">Reuse or Rotate</h3>
              <p className="text-gray-300 text-sm mt-1">
                Need another one? Get a fresh number or email anytime with a
                single click. Stay in control, stay anonymous — every time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}