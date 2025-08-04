import React from 'react'
import { MapPin } from 'lucide-react';
import { Framer } from 'lucide-react';
import { ShieldMinus } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
export default function TrustGhostible() {
  return (
    <div>
      
      <section className=" py-16 px-6" data-aos="fade-up" data-aos-duration="5000">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Americans Trust Ghostible
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Built specifically for U.S. users who need reliable, private phone
            verification
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-cyan-500/10 text-teal-400 w-14 h-14 flex items-center justify-center rounded-full text-2xl mb-4">
             <MapPin size="30"/>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Real U.S. Numbers
              </h3>
              <p className="text-gray-400 text-sm">
                Authentic phone numbers from major U.S. carriers, not VoIP
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-cyan-500/10 text-teal-400 w-14 h-14 flex items-center justify-center rounded-full text-2xl mb-4">
               <Framer size="30"/>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Guaranteed Delivery
              </h3>
              <p className="text-gray-400 text-sm">
                SMS codes arrive in seconds, or we'll refund your money
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-cyan-500/10 text-teal-400 w-14 h-14 flex items-center justify-center rounded-full text-2xl mb-4">
                <ShieldMinus size="30"/>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No Signup Required
              </h3>
              <p className="text-gray-400 text-sm">
                Get your temp number instantly without creating accounts
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-cyan-500/10 text-teal-400 w-14 h-14 flex items-center justify-center rounded-full text-2xl mb-4">
                <RotateCcw size="30"/>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Money Back Guarantee
              </h3>
              <p className="text-gray-400 text-sm">
                If it doesn't work with your app, get a full refund
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
