import React from "react";
const Star = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#fdc700" : "#fdc700"}
    stroke="#fdc700"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);
export default function Review({ rating }: { rating: number }) {
  return (
    <div>
      <section className="bg-[#181818] py-16 px-6">
        <div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-aos="fade-up"
          data-aos-duration="5000"
        >
          <div className="bg-black/40 border border-gray-700 hover:border-teal-400 transition rounded-lg p-6 text-white">
            <div className="flex items-center mb-3 text-yellow-400 text-xl">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star key={num} filled={num <= rating} />
              ))}
            </div>
            <p className="italic mb-4">
              "Finally got back on dating apps without using my real number.
              Works perfectly with Tinder!"
            </p>
            <p className="text-gray-400">— Sarah M.</p>
          </div>
          <div className="bg-black/40 border border-gray-700 hover:border-teal-400 transition rounded-lg p-6 text-white">
             <div className="flex items-center mb-3 text-yellow-400 text-xl">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star key={num} filled={num <= rating} />
              ))}
            </div>
            <p className="italic mb-4">
              "Saved my main number from spam. Used it for Uber and DoorDash
              verification - instant delivery."
            </p>
            <p className="text-gray-400">— Mike R.</p>
          </div>
          <div className="bg-black/40 border border-gray-700 hover:border-teal-400 transition rounded-lg p-6 text-white">
             <div className="flex items-center mb-3 text-yellow-400 text-xl">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star key={num} filled={num <= rating} />
              ))}
            </div>
            <p className="italic mb-4">
              "No signup hassle, just pay and get the number. Used it for
              Instagram verification in seconds."
            </p>
            <p className="text-gray-400">— Jessica L.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
