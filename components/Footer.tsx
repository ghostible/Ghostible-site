import { Facebook, Link2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      <footer className="bg-black text-white px-6 py-10 md:text-start text-center">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 md:gap-10 gap-5 border-b border-[#1e2939] pb-10">
          <div>
           <div className="flex md:justify-start justify-center">
             <Link href="/" className="hover:text-white">
              <Image
                src="/ghostible-logo.png"
                alt="Logo"
                width={180}
                height={80}
              />
            </Link>
           </div>
            <p className="text-[16px] text-gray-300 mb-8 mt-8">
              Ghostible gives you privacy-first tools — no logins, no noise, just freedom.
            </p>
            <div className="flex md:justify-start justify-center space-x-3">
              <button className="bg-gray-800 p-2 rounded-full text-[#46edd5] hover:bg-[#00d5be] cursor-pointer hover:text-black">
                <Link2 size={16} />
              </button>
              <button className="bg-gray-800 p-2 rounded-full text-[#46edd5] hover:bg-[#00d5be] cursor-pointer hover:text-black">
                <X size={16} />
              </button>
              <button className="bg-gray-800 p-2 rounded-full text-[#46edd5] hover:bg-[#00d5be] cursor-pointer hover:text-black">
                <Facebook size={16} />
              </button>
            </div>
          </div>
          <div></div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Page</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/"
                  className={`hover:text-teal-400 ${
                    pathname === "/" ? "text-teal-400" : "text-white"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/temp-mail"
                  className={`hover:text-teal-400 ${
                    pathname === "/temp-mail" ? "text-teal-400" : "text-white"
                  }`}
                >
                  Temp Mail
                </Link>
              </li>
              <li>
                <Link
                  href="/tempnumber"
                  className={`hover:text-teal-400 ${
                    pathname === "/tempnumber" ? "text-teal-400" : "text-white"
                  }`}
                >
                  Temp Number
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`hover:text-teal-400 ${
                    pathname === "/contact" ? "text-teal-400" : "text-white"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="mailto:team@ghostible.io"
                  className="hover:text-teal-400">
                  team@ghostible.io
                </Link>
              </li>
              <li>California, United States</li>
            </ul>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto mt-6 flex flex-col-reverse md:flex-row justify-between items-center text-sm text-white space-y-2 md:space-y-0">
          <div className="md:mt-0 mt-7">
            <p>© 2025 Ghostible. All rights reserved.</p>
          </div>
          <div className="md:flex space-x-4">
            <Link
              href="/privacy-policy"
              className={`hover:text-teal-400 ${
                pathname === "/privacy-policy" ? "text-teal-400" : "text-white"
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies-policy"
              className={`hover:text-teal-400 ${
                pathname === "/cookies-policy" ? "text-teal-400" : "text-white"
              }`}
            >
              Cookies Policy
            </Link>
            <Link
              href="/terms-conditions"
              className={`hover:text-teal-400 ${
                pathname === "/terms-conditions"
                  ? "text-teal-400"
                  : "text-white"
              }`}
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
