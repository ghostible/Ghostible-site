import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "@/utils/supabaseClient";

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session?.user);
      }
    );

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
    window.location.href = "/";
  };

  if (!isMounted) return null;

  return (
    <header
      className={`py-3 sticky top-0 right-0 left-0  w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-container mx-auto px-3.5">
        <div className="relative py-4 px-6 md:px-10 border border-gray-800 rounded-full mx-auto mt-4 flex items-center justify-between bg-color">
          <div className="flex items-center space-x-2">
            <Link href="/" className=" text-teal-400">
              <Image
                src="/ghostible-logo.png"
                alt="Logo"
                width={150}
                height={80}
              />
            </Link>
            <nav className="hidden md:flex space-x-6 pl-10 text-sm navbar_link">
              <Link
                href="/"
                className={`hover:text-teal-400 ${
                  pathname === "/" ? "text-teal-400" : "text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/temp-mail"
                className={`hover:text-teal-400 ${
                  pathname === "/temp-mail" ? "text-teal-400" : "text-white"
                }`}
              >
                Temp Mail
              </Link>
              <Link
                href="/tempnumber"
                className={`hover:text-teal-400 ${
                  pathname === "/tempnumber" ? "text-teal-400" : "text-white"
                }`}
              >
                Temp Number
              </Link>
              <Link
                href="/contact"
                className={`hover:text-teal-400 ${
                  pathname === "/contact" ? "text-teal-400" : "text-white"
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-1.5 border border-white text-white rounded-full hover:bg-white hover:text-black transition cursor-pointer"
                >
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 bg-teal-400 text-black rounded-full hover:bg-white transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 bg-teal-400 rounded-full font-medium hover:bg-white transition cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 border border-white text-white rounded-full hover:bg-white hover:text-black transition cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="slide-down absolute top-full mt-4 left-0 w-full bg-zinc-900 border border-gray-700 rounded-lg md:p-6 z-50 text-center md:hidden">
              <nav className="space-y-4 navbar_link footer_link_mobile">
                <Link
                  href="/"
                  className={`block hover:text-teal-400 ${
                    pathname === "/" ? "text-teal-400" : "text-white"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/temp-mail"
                  className={`block hover:text-teal-400 ${
                    pathname === "/temp-mail" ? "text-teal-400" : "text-white"
                  }`}
                >
                  Temp Mail
                </Link>
                <Link
                  href="/tempnumber"
                  className={`block hover:text-teal-400 ${
                    pathname === "/tempnumber" ? "text-teal-400" : "text-white"
                  }`}
                >
                  Temp Number
                </Link>
                <Link
                  href="/contact"
                  className={`block hover:text-teal-400 ${
                    pathname === "/contact" ? "text-teal-400" : "text-white"
                  }`}
                >
                  Contact
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className={`block hover:text-teal-400 ${
                        pathname === "/dashboard"
                          ? "text-teal-400"
                          : "text-white"
                      }`}
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className=" text-white hover:text-red-400 mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={`block hover:text-teal-400 ${
                        pathname === "/login" ? "text-teal-400" : "text-white"
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className={`block hover:text-teal-400 ${
                        pathname === "/signup" ? "text-teal-400" : "text-white"
                      }`}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
