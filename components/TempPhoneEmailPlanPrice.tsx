// import { CircleCheck } from "lucide-react";
// import Link from "next/link";


export default function TempPhoneEmailPlanPrice() {
  return (
    <>
      <div className="w-full">
        <section className="lg:max-w-7xl w-full mx-auto px-4 lg:py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Rent private numbers that work with
            <span className="underline text-white"> all apps and websites</span>.
          </h2>
          <p className="text-white w-full lg:max-w-3xl mx-auto mb-6">
            Get a new non-voip phone number accessible from anywhere in the
            world. Perfect for account activation and SMS verification on any
            platform.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-4">
            <label className="font-medium text-white">
              Number pricing for:
            </label>
            <select id="country" className="px-4 py-2 border rounded w-60 text-white bg-[#111111]">
              <option>United States</option>
            </select>
          </div>
        </section>
      </div>
    </>
  );
}
