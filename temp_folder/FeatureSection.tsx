import { motion } from "framer-motion";
// import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function FeatureSection() {
  return (
    <>
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className=" text-white px-6 mt-28"
    >
      <div className="max-w-6xl mx-auto space-y-16 bg-[#0a0a0a] p-20">
        <div className="grid md:grid-cols-2 gap-8 items-start text-center ">
          {/* Temp Email */}
          <div className="bg-[#111313] border  h-full border-[#383838] rounded-3xl px-9 py-[clamp(60px,5vw,100px)]">
            <h2 className="text-2xl md:text-[clamp(30px,5vw,45px)] font-bold text-white">
              Temp Email
            </h2>
            <p className="mt-4 text-gray-300 text-2xl mb-12 ">
              No sign-up (temp mail only), no hassle. Get your burner phone number or temp email in seconds.
            </p>
           <Link href="/temp-mail" className="inline-block bg-teal-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-teal-300 transition cursor-pointer">
              Get Started Email
         </Link>
          </div>

          {/* Burner Phone */}
          <div className="bg-[#111313] border  h-full border-[#383838] rounded-3xl px-9 py-[clamp(60px,5vw,100px)]">
            <h2 className="text-2xl md:text-[clamp(30px,5vw,45px)] font-bold text-white">
              Burner Phone
            </h2>
            <p className="mt-4 text-gray-300 text-2xl mb-12">
              Keep your real number and inbox hidden. Ghostible protects your identity from spam, scams, and trackers.
            </p>
               <Link href="/tempnumber" className="inline-block bg-teal-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-teal-300 transition cursor-pointer">
                  Get New Number
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
    </>
  );
}