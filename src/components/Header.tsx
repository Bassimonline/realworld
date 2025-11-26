import React, { useState, useEffect } from "react";
import { logo } from "../images";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 left-0 w-full z-50 ${isScrolled ? "!bg-black shadow-md" : "!bg-transparent"
        }`}
    >
      <nav className="max-w-[1236px] mx-auto text-white font-semibold px-4 lg:px-8 py-4 flex items-center justify-between">
        {/* Left Section: Branding */}
        <div className="flex items-center space-x-4">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-10 w-auto lg:h-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <Link to="/">
            <motion.span
              className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              THE REAL WORLD
            </motion.span>
          </Link>

        </div>

        {/* Center Section: Desktop Navigation + Social Icons */}
        <div className="hidden lg:flex items-center space-x-8">
          {[
            "HOME",
            "VISION",
            "MISSION",
            "ROADMAP",
            "CORE VALUES",
            "TAGLINE IDEAS",
            "QUOTE",
          ].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="hover:text-[#FFCF23]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}

          {/* Telegram Icon (Desktop) */}
          <motion.a
            href="https://t.me/+Xy3Ea4bUeoZmN2Qy"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#0088CC] flex items-center justify-center hover:bg-[#0077B5] transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current text-white"
              >
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
              </svg>
            </div>
          </motion.a>

          {/* X.com Icon (Desktop) */}
          <motion.a
            href="https://x.com/trwofficialcoin?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-[#111] transition-colors duration-300 border border-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 1227"
                className="w-5 h-5 fill-white"
              >
                <path d="M714.163 546.395L1178.44 0H1071.16L668.04 472.086 357.412 0H0L488.936 749.3 0 1227h107.284l429.18-496.267L842.588 1227H1200L714.163 546.395zM571.019 669.832l-49.5-72.073L145.58 81.274h162.09l258.983 377.064 49.5 72.073 386.694 562.815H940.75L571.019 669.832z" />
              </svg>
            </div>
          </motion.a>
        </div>

        {/* Right Section: Mobile Icons + Menu Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          {/* Telegram Icon (Mobile) */}
          <a
            href="https://t.me/+Xy3Ea4bUeoZmN2Qy"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#0088CC] flex items-center justify-center hover:bg-[#0077B5] transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current text-white"
            >
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>
          </a>

          {/* X.com Icon (Mobile) */}
          <a
            href="https://x.com/trwsol2?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-black flex items-center justify-center hover:bg-[#111] transition-colors duration-300 border border-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 1227"
              className="w-4 h-4 fill-white"
            >
              <path d="M714.163 546.395L1178.44 0H1071.16L668.04 472.086 357.412 0H0L488.936 749.3 0 1227h107.284l429.18-496.267L842.588 1227H1200L714.163 546.395zM571.019 669.832l-49.5-72.073L145.58 81.274h162.09l258.983 377.064 49.5 72.073 386.694 562.815H940.75L571.019 669.832z" />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <motion.div
            className="w-[40px] h-[40px] flex items-center justify-center text-white focus:outline-none"
            onClick={toggleMobileMenu}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-[#060E15] text-white shadow-lg absolute top-[72px] left-0 w-full z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-4 py-6">
              {[
                "HOME",
                "VISION",
                "MISSION",
                "ROADMAP",
                "CORE VALUES",
                "TAGLINE IDEAS",
                "QUOTE",
              ].map((item, index) => (
                <motion.a
                  onClick={toggleMobileMenu}
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-[#FFCF23]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
