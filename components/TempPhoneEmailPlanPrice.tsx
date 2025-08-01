// import { CircleCheck } from "lucide-react";
// import Link from "next/link";

import CustomSelect from "./CustomSelect";


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
            Get Verified Instantly on Any App – No VOIP, No Limits.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-4">
            <span className="font-medium text-white">
              Number pricing for:
            </span>
             <CustomSelect options={["Option 1", "Option 2", "Option 3"]}
                               defaultText="Select Second" />
          </div>
        </section>
      </div>
    </>
  );
}
