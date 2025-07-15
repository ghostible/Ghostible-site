import { useEffect, useState } from 'react'
import axios from 'axios'
import FAQSection from "./Components/FAQSection";

const ContactPage: React.FC = ({ }) => {
    return (
   <>
   <section className=" text-white  px-6 py-5 md:py-16 md:px-20 contact">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-10">
                Need assistance or have questions? Don't hesitate to reach out to us.
                Our dedicated team is here to help.
              </p>
            </div>
            <div className="bg-zinc-900 p-6 md:p-10 rounded-lg space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="bg-gray-100 text-black p-3 rounded outline-none" />
                <input type="email" placeholder="Email" className="bg-gray-100 text-black p-3 rounded outline-none" />
              </div>
              <textarea placeholder="Message" rows={6} className="bg-gray-100 text-black p-3 w-full rounded outline-none" defaultValue={""} />
              <button className="w-full bg-lime-400 text-black font-semibold py-3 rounded hover:bg-lime-500 transition">
                Sign Up
              </button>
            </div>
          </div>
             <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto  mt-4 md:mt-28">
                <div>
                  <div className="bg-lime-400 w-8 h-8 flex items-center justify-center rounded mb-4">
                    <span className="text-black text-xl">✉️</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-sm text-white mb-2">
                    Are you tired of juggling endless spreadsheets, emails, and sticky notes to manage your projects?
                  </p>
                  <p className="font-semibold text-white mt-5">tanjimislam27@gmail.com</p>
                </div>
                <div>
                  <div className="bg-lime-400 w-8 h-8 flex items-center justify-center rounded mb-4">
                    <span className="text-black text-xl">💬</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-white mb-2">
                    Are you tired of juggling endless spreadsheets, emails, and sticky notes to manage your projects?
                  </p>
                  <p className="font-semibold text-white mt-5">+1 (555) 000-0000</p>
                </div>
                <div>
                  <div className="bg-lime-400 w-8 h-8 flex items-center justify-center rounded mb-4">
                    <span className="text-black text-xl">📞</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-sm text-white mb-2">
                    Are you tired of juggling endless spreadsheets, emails, and sticky notes to manage your projects?
                  </p>
                  <p className="font-semibold text-white mt-5">123 Sample St, Sydney NSW 2000 AU</p>
                </div>
              </div>
        </section>

        <FAQSection/>
   </>
  );
}

export default ContactPage;