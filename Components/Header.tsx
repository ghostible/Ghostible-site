import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "@/utils/supabaseClient";
// import { UserRound } from "lucide-react";

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check auth status
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session?.user);
      setIsMounted(true);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Scroll direction logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // redirect to homepage after logout
  };

  if (!isMounted) return null;

  return (
    <header
      className={`bg-black py-3 sticky top-0 right-0 left-0  w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative py-4 px-6 md:px-10 border border-gray-800 rounded-full w-[var(--custom-width)] mx-auto mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="">
            <Image src="/ghostible-logo.avif" alt="Logo" width={150} height={80} />
          </Link>
          <nav className="hidden md:flex space-x-6 pl-10 text-sm navbar_link">
            <Link href="/" className="text-white hover:text-teal-400">Home</Link>
            <Link href="/temp-mail" className="text-white hover:text-teal-400">Temp Mail</Link>
            <Link href="/tempnumber" className="text-white hover:text-teal-400">Temp Number</Link>
            <Link href="/contact" className="text-white hover:text-teal-400">Contact</Link>
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-3">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="px-4 py-1.5 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
                 Account
              </Link>
              <button onClick={handleLogout} className="px-4 py-1.5 bg-teal-400 text-black rounded-full hover:bg-white transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-1.5 bg-teal-400 rounded-full font-medium hover:bg-white transition">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-1.5 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute top-full mt-4 left-0 w-full bg-zinc-900 border border-gray-700 rounded-lg p-6 z-50 text-center md:hidden">
            <nav className="space-y-4 navbar_link">
              <Link href="/" className="block text-white hover:text-teal-400">Home</Link>
              <Link href="/temp-mail" className="block text-white hover:text-teal-400">Temp Mail</Link>
              <Link href="/tempnumber" className="block text-white hover:text-teal-400">Temp Number</Link>
              <Link href="/contact" className="block text-white hover:text-teal-400">Contact</Link>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="block text-white hover:text-teal-400">My Account</Link>
                  <button onClick={handleLogout} className="block text-white hover:text-red-400 mt-2">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block text-white hover:text-teal-400">Login</Link>
                  <Link href="/signup" className="block text-white hover:text-teal-400">Sign Up</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
