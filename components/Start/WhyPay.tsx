import React from 'react'
import { Check, X } from 'lucide-react';

export default function WhyPay() {
  return (
    <div>
      
      <section className=" py-16 px-6" data-aos="fade-up" data-aos-duration="5000">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Pay When Free Sites Exist?
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-1xl">
            Free temp number sites are broken, unreliable, and don &apos;t work with
            the apps you need. Here&apos;s why Ghostible actually works:
          </p>
          <div className="overflow-x-auto border border-white rounded-xl">
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden text-left text-white">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="px-6 py-4" />
                  <th className="px-6 py-4 text-teal-400 text-center">Ghostible</th>
                  <th className="px-6 py-4 text-center">Free Sites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="px-6 py-4">
                    Works with Tinder &amp; dating apps
                  </td>
                  <td className="px-6 py-4 text-green-500 text-center"><Check className='mx-auto'/></td>
                  <td className="px-6 py-4 text-[#811d1d] text-center"><X className='mx-auto'/></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Guaranteed SMS delivery</td>
                  <td className="px-6 py-4 text-green-500 text-center"><Check className='mx-auto'/></td>
                  <td className="px-6 py-4 text-[#811d1d] text-center"><X className='mx-auto'/></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Real U.S. phone numbers</td>
                  <td className="px-6 py-4 text-green-500 text-center"><Check className='mx-auto'/></td>
                  <td className="px-6 py-4 text-[#811d1d] text-center"><X className='mx-auto'/></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">No ads or delays</td>
                  <td className="px-6 py-4 text-green-500 text-center"><Check className='mx-auto'/></td>
                  <td className="px-6 py-4 text-[#811d1d] text-center"><X className='mx-auto'/></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Customer support</td>
                  <td className="px-6 py-4 text-green-500 text-center"><Check className='mx-auto'/></td>
                  <td className="px-6 py-4 text-[#811d1d] text-center"><X className='mx-auto'/></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Refund guarantee</td>
                  <td className="px-6 py-4 text-green-500 text-center"><Check className='mx-auto'/></td>
                  <td className="px-6 py-4 text-[#811d1d] text-center"><X className='mx-auto'/></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Works with Uber/DoorDash</td>
                  <td className="px-6 py-4 text-green-500 text-center"><Check className='mx-auto'/></td>
                  <td className="px-6 py-4 text-[#811d1d] text-center"><X className='mx-auto'/></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Private inbox</td>
                  <td className="px-6 py-4 text-green-500 text-center"><Check className='mx-auto'/></td>
                  <td className="px-6 py-4 text-[#811d1d] text-center"><X className='mx-auto'/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
