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
      className=" text-white px-6 py-5 md:py-16"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="grid md:grid-cols-2 gap-8 items-start text-center">
          {/* Temp Email */}
          <div className="bg-[#111313] border  h-full border-[#383838] rounded-md px-9 py-[clamp(60px,5vw,100px)]">
            <h2 className="text-2xl md:text-[clamp(30px,5vw,36px)] font-bold text-teal-300">
              Temp Email
            </h2>
            <p className="mt-4 text-gray-300">
              No sign-up (temp mail only), no hassle. Get your burner phone number or temp email in seconds.
            </p>
         <Link href="">
            <button className="mt-6 bg-teal-400 text-black px-6 py-2 rounded-full font-medium hover:bg-teal-300 transition cursor-pointer">
              Get Started Email
            </button>
         </Link>
          </div>

          {/* Burner Phone */}
          <div className="bg-[#111313] border  h-full border-[#383838] rounded-md px-9 py-[clamp(60px,5vw,100px)]">
            <h2 className="text-2xl md:text-[clamp(30px,5vw,36px)] font-bold text-teal-300">
              Burner Phone
            </h2>
            <p className="mt-4 text-gray-300">
              Keep your real number and inbox hidden. Ghostible protects your identity from spam, scams, and trackers.
            </p>
               <Link href="">
            <button className="mt-6 bg-teal-400 text-black px-6 py-2 rounded-full font-medium hover:bg-teal-300 transition cursor-pointer">
              Get New Number
            </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
    </>
  );
}