import React from 'react'
import { Heart } from 'lucide-react';
import { Car } from 'lucide-react';
import { Users } from 'lucide-react';
export default function PerfectApp() {
  return (
    <div>
      
      <section className=" py-16 px-6" data-aos="fade-up" data-aos-duration="5000">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Perfect for Every App You Use
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Whether you're dating, working, or shopping online – Ghostible works
            with 200+ apps
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/40 border border-gray-700 rounded-lg p-6 text-left hover:border-teal-400  transition">
              <div className="text-teal-400 text-3xl mb-4"><Heart size="40"/></div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Dating Apps
              </h3>
              <p className="text-teal-400 font-bold mb-2 text-sm">
                Tinder, Hinge, Bumble, OkCupid
              </p>
              <p className="text-gray-400 text-sm">
                Get back on dating apps after bans or protect your privacy
              </p>
            </div>
            <div className="bg-black/40 border border-gray-700 rounded-lg p-6 text-left hover:border-teal-400  transition">
              <div className="text-teal-400 text-3xl mb-4"><Car size="40"/></div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Delivery &amp; Rideshare
              </h3>
              <p className="text-teal-400 font-bold mb-2 text-sm">
                Uber, DoorDash, Lyft, Instacart
              </p>
              <p className="text-gray-400 text-sm">
                Multiple accounts for better earnings and opportunities
              </p>
            </div>
            <div className="bg-black/40 border border-gray-700 rounded-lg p-6 text-left hover:border-teal-400  transition">
              <div className="text-teal-400 text-3xl mb-4"><Users size="40"/></div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Social Media
              </h3>
              <p className="text-teal-400 font-bold mb-2 text-sm">
                Instagram, WhatsApp, Telegram
              </p>
              <p className="text-gray-400 text-sm">
                Create accounts without exposing your real number
              </p>
            </div>
            <div className="bg-black/40 border border-gray-700 rounded-lg p-6 text-left hover:border-teal-400  transition">
              <div className="text-teal-400 text-3xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Marketplaces
              </h3>
              <p className="text-teal-400 font-bold mb-2 text-sm">
                Facebook Marketplace, OfferUp
              </p>
              <p className="text-gray-400 text-sm">
                Buy and sell without sharing personal contact info
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
