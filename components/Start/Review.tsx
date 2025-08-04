import React from 'react'

export default function Review() {
  return (
    <div>
            <section className="bg-[#181818] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-duration="5000">
          <div className="bg-black/40 border border-gray-700 hover:border-teal-400 transition rounded-lg p-6 text-white">
            <div className="flex items-center mb-3 text-yellow-400 text-xl">
              ★★★★★
            </div>
            <p className="italic mb-4">
              "Finally got back on dating apps without using my real number.
              Works perfectly with Tinder!"
            </p>
            <p className="text-gray-400">— Sarah M.</p>
          </div>
          <div className="bg-black/40 border border-gray-700 hover:border-teal-400 transition rounded-lg p-6 text-white">
            <div className="flex items-center mb-3 text-yellow-400 text-xl">
              ★★★★★
            </div>
            <p className="italic mb-4">
              "Saved my main number from spam. Used it for Uber and DoorDash
              verification - instant delivery."
            </p>
            <p className="text-gray-400">— Mike R.</p>
          </div>
          <div className="bg-black/40 border border-gray-700 hover:border-teal-400 transition rounded-lg p-6 text-white">
            <div className="flex items-center mb-3 text-yellow-400 text-xl">
              ★★★★★
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
  )
}
