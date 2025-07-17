import { Facebook, Link2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="bg-black text-white px-6 py-10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-800 pb-10">
          <div>
            <Link href="/" className="hover:text-white"><Image src="/ghostible-logo.avif" alt="Logo" width={180} height={80} /></Link>
            <p className="text-sm text-gray-300 mb-4">
              Experience financial transformation like never before with Fintec.
            </p>
            <div className="flex space-x-3">
              <button className="bg-gray-800 p-2 rounded-full text-lime-400 hover:bg-lime-500 hover:text-black">
                <Link2 size={16} />
              </button>
              <button className="bg-gray-800 p-2 rounded-full text-lime-400 hover:bg-lime-500 hover:text-black">
                <X size={16} />
              </button>
              <button className="bg-gray-800 p-2 rounded-full text-lime-400 hover:bg-lime-500 hover:text-black">
                <Facebook size={16} />
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Page</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/temp-mail" className="hover:text-white">
                  Temp Mail
                </Link>
              </li>
              <li>
                <Link href="/tempnumber" className="hover:text-white">
                  Temp PhoneNumber
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>tanjimislam27@gmail.com</li>
              <li>+888 777 222</li>
              <li>2405 Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-2 md:space-y-0">
          <p>© 2025 tanjim. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
            </Link>
            <Link href="/cookies-policy" className="hover:text-white">
                Cookies Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white">
                Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
