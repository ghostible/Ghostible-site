import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="bg-black py-3">
      <div className="relative py-4 px-6 md:px-10 border border-gray-800 rounded-full max-w-screen-xl mx-auto mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className=""><Image src="/ghostible-logo.avif" alt="Logo" width={180} height={80} /></Link>
          <nav className="hidden md:flex space-x-6 pl-10 text-sm navbar_link">
            <Link href="/" className="text-white hover:text-teal-400">
                Home
            </Link>
              <Link href="/temp-mail" className="text-white hover:text-teal-400">
                Temp Mail
             </Link>
            <Link href="/tempnumber" className="text-white hover:text-teal-400">
                Temp Number
            </Link>
            <Link href="/contact" className="text-white hover:text-teal-400">
                Contact
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex space-x-3">
            <Link href="/login" className="px-4 py-1.5 bg-teal-400 rounded-full font-medium hover:bg-white transition btn btn-second">
                Login
            </Link>
            <Link href="/signup" className="px-4 py-1.5 border border-white text-white rounded-full hover:bg-white hover:text-black transition btn btn-custon-style">
                Sign Up
            </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isOpen && (
          <div className="absolute top-full mt-4 left-0 w-full bg-zinc-900 border border-gray-700 rounded-lg p-6 z-50 text-center md:hidden">
            <nav className="space-y-4 navbar_link">
              <Link href="#" className="block text-lime-400 cursor-pointer">
                Home
              </Link>
              <Link href="#" className="block text-white hover:text-teal-400 cursor-pointer">
                Feature
              </Link>
              <Link href="#" className="block text-white hover:text-teal-400 cursor-pointer">
                Pricing
              </Link>
              <Link href="#" className="block text-white hover:text-teal-400 cursor-pointer">
                Blog
              </Link>
              <Link href="#" className="block text-white hover:text-teal-400 cursor-pointer">
                About
              </Link>
            </nav>
            <div className="mt-6 flex flex-col space-y-3">
              <button className="px-4 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
                Contact Us
              </button>
              <button className="px-4 py-2 bg-teal-400 text-black rounded-full font-medium hover:bg-teal-300 transition">
                Get the template
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
