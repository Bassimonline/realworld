import { useEffect, useState } from "react";
// note: no additional event types required here
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { heroBg } from "../images";
// `Link` and `globe` were removed in favour of minimal hero changes — re-add if used elsewhere

// Utility for device detection (simple)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const videoVariants: Variants = {
  initial: { opacity: 0, scale: 1.03 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.4, 0.7, 0.2, 1] },
  },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.3 } },
};

const textFade: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.4, 0.7, 0.2, 1] },
  }),
};

const btnVariants: Variants = {
  initial: { scale: 1, boxShadow: "0 4px 32px 0 rgba(255,207,35,0.16)" },
  animate: {
    scale: [1, 1.03, 1],
    boxShadow: [
      "0 4px 32px 0 rgba(255,207,35,0.16)",
      "0 12px 44px 0 rgba(255,207,35,0.23)",
      "0 4px 32px 0 rgba(255,207,35,0.16)",
    ],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.97,
    boxShadow: "0 2px 12px 0 rgba(255,207,35,0.25)",
    transition: { duration: 0.13 },
  },
};

// VideoThumbnail removed per user request: thumbnails, overlay, and play button are disabled.

// JoinButton removed per user request: CTA hidden.

/**
 * Fixed global end date (UTC) so every device shows the same remaining time.
 * Chosen so that at the moment of this change it equals 22d 23h 23m 59s left.
 * If you need to change later, update this ISO string.
 */
const SALE_END_ISO = "2025-12-16T23:59:59Z"; // ✅ global, consistent across devices
const SALE_END_TS = Date.parse(SALE_END_ISO);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diffMs = SALE_END_TS - Date.now();
      const totalSeconds = Math.max(0, Math.ceil(diffMs / 1000)); // round up → clean display

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick(); // prime immediately
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-3 sm:py-6 px-4 bg-gray-900 rounded-xl lg:rounded-3xl w-full max-w-4xl mx-auto">
      <h2
        style={{ color: "white" }}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3 sm:mb-6 tracking-wider"
      >
        TOKEN SALE ENDS IN:
      </h2>

      <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
        {/* Days */}
        <div className="relative flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
          <div className="relative bg-gray-800 rounded-lg p-2 sm:p-3 md:p-4 border-t border-cyan-400/30 border-l border-cyan-400/20 border-r border-cyan-400/10 border-b border-cyan-400/5">
            <div style={{ color: "white" }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-cyan-400">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div style={{ color: "white" }} className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-widest text-cyan-300/70 mt-1 font-medium">
              Days
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"></div>
          </div>

        {/* Colon */}
        <div style={{ color: "white" }} className="text-lg sm:text-2xl md:text-3xl font-bold text-cyan-300 animate-pulse -mx-1 sm:-mx-1.5">:</div>

        {/* Hours */}
        <div className="relative flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
          <div className="relative bg-gray-800 rounded-lg p-2 sm:p-3 md:p-4 border-t border-blue-400/30 border-l border-blue-400/20 border-r border-blue-400/10 border-b border-blue-400/5">
            <div style={{ color: "white" }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-400">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div style={{ color: "white" }} className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-widest text-blue-300/70 mt-1 font-medium">
              Hours
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></div>
        </div>

        {/* Colon */}
        <div style={{ color: "white" }} className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-300 animate-pulse -mx-1 sm:-mx-1.5">:</div>

        {/* Minutes */}
        <div className="relative flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
          <div className="relative bg-gray-800 rounded-lg p-2 sm:p-3 md:p-4 border-t border-purple-400/30 border-l border-purple-400/20 border-r border-purple-400/10 border-b border-purple-400/5">
            <div style={{ color: "white" }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-400">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div style={{ color: "white" }} className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-widest text-purple-300/70 mt-1 font-medium">
              Minutes
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30"></div>
        </div>

        {/* Colon */}
        <div style={{ color: "white" }} className="text-lg sm:text-2xl md:text-3xl font-bold text-purple-300 animate-pulse -mx-1 sm:-mx-1.5">:</div>

        {/* Seconds */}
        <div className="relative flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
          <div className="relative bg-gray-800 rounded-lg p-2 sm:p-3 md:p-4 border-t border-pink-400/30 border-l border-pink-400/20 border-r border-pink-400/10 border-b border-pink-400/5">
            <div style={{ color: "white" }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-pink-400">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div style={{ color: "white" }} className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-widest text-pink-300/70 mt-1 font-medium">
              Seconds
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  return (
    <>
      <div id="home" className="relative overflow-hidden">
        {/* bg image */}
        <motion.div
          className="absolute inset-0 z-[-1]"
          initial={{ opacity: 0.5, scale: 1.06 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.1, ease: [0.4, 0.7, 0.2, 1] },
          }}
        >
          <img
            style={{ backgroundPosition: "top" }}
            src={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover md:object-contain"
            draggable={false}
            loading="eager"
          />
        </motion.div>

        {/* Hero Section */}
        <div style={{ opacity: 1, transform: "translateY(0px)" }}>
          <section className="pb-8 lg:pb-32 flex flex-col items-center max-w-[1059px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12">

            <motion.div
              className="mb-4 w-full px-4"
              variants={textFade}
              initial="initial"
              animate="animate"
              custom={0.16}
            >
              {/* smaller logo sizes — reduced defaults for a tighter hero */}
              <img
                src="the-real-world-logo.webp"
                alt="The Real World logo"
                className="max-w-[50px] sm:max-w-[70px] md:max-w-[90px] lg:max-w-[100px] mx-auto h-auto mb-3"
              />
              
              {/* Replace smaller heading with 'The Real World Starts Here.' (moved from below) */}
              <motion.h2
                className="special text-center switzer max-w-[330px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-full py-2 mt-2 texture-text capitalize switzer tracking-[-1px] lg:tracking-[-3px]"
                variants={textFade}
                initial="initial"
                animate="animate"
                custom={0.17}
              >
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-[1.8rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[3rem]">
                  The Real
                </span>{" "}
                <span className="text-[1.8rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[3rem] texture-text">
                  World Starts Here
                </span>
                <span className="text-[1.8rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[3rem] gradient-text-2">.</span>
              </motion.h2>
              
              {/* New Sub Text: by Andrew Tate */}
              <motion.p
                  className="text-gray-400 text-lg font-medium text-center mb-8"
                  variants={textFade}
                  custom={0.18}
              >
                  by Andrew Tate
              </motion.p>


              {/* Promotional video (public/promovideo.mp4) placed directly under the logo */}
              <motion.div className="w-full relative z-[999] max-w-4xl mx-auto">
                <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl bg-black">
                  <video 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src="/promovideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>

            </motion.div>
            
            {/* New CTA Button: Join The Real World */}
            <motion.button
              onClick={() => navigate("/token-sale")}
              type="button"
              className="block w-full max-w-[280px] sm:max-w-[340px] rounded-full mx-auto px-2 mt-8 lg:mt-10"
              variants={btnVariants}
              initial="initial"
              animate="animate"
              whileTap="tap"
              whileHover="animate"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-label="Join The Real World"
            >
              <motion.div
                className="relative w-full rounded-full overflow-hidden"
                style={{ background: "linear-gradient(91deg,#ffd600 0%,#ff8d3a 100%)" }}
                layout
                transition={{ duration: 0.28, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-1/2 h-full pointer-events-none z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.18, 0], x: ["-55%", "120%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.28 }}
                  style={{
                    background:
                      "linear-gradient(120deg,rgba(255,255,255,0.0) 40%,rgba(255,255,255,0.16) 55%,rgba(255,255,255,0.0) 70%)",
                    filter: "blur(8px)",
                  }}
                />
                <div className="flex items-center justify-center h-[48px] sm:h-[56px] md:h-[68px] w-full min-w-[140px] max-w-[340px] m-auto select-none">
                  <span className="font-extrabold text-neutral-900 text-xl sm:text-2xl md:text-3xl tracking-tight drop-shadow-[0_1px_8px_rgba(255,255,255,0.10)]">
                    BUY $TRW
                  </span>
                </div>
              </motion.div>
            </motion.button>

            {/* Student Count and Image - CORRECTED BOLDING and INCREASED IMAGE SIZE */}
            <motion.div className="flex items-center space-x-3">
              {/* Smaller image with preserved aspect ratio */}
              <img
                src="https://www.therealworldportal.com/wp-content/uploads/the-real-world-students-icon.webp"
                alt="Students icon"
                className="w-20 sm:w-24 h-auto" // smaller width, height adjusts automatically
              />

              {/* Text with bold number */}
              <p className="text-white text-sm sm:text-base">
                <span className="font-bold">213,500+</span> like-minded students
              </p>
            </motion.div>

            {/* Mobile countdown section */}
            {isMobile && (
              <motion.div className="relative w-full mt-8 z-50" initial="initial" animate="animate" exit="exit">
                <motion.div
                  style={{ opacity: 1, transform: "translateY(20px)" }}
                  initial="initial"
                  animate="animate"
                  variants={textFade}
                  custom={0.22}
                >
                  <div className="relative">
                    <div className="w-full relative">
                      <div className="relative max-w-[100%]">
                        <motion.div className="w-full h-full" style={{ position: "relative" }} variants={videoVariants} initial="initial" animate="animate" exit="exit">
                          <div className="rounded-lg w-full h-full flex items-center justify-center">
                            <CountdownTimer />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Desktop countdown section */}
            {!isMobile && (
              <div className="hidden lg:block w-full mt-2 px-4 relative max-w-[960px] mx-auto">
                <motion.div className="relative z-30 mt-6" initial="initial" animate="animate" exit="exit">
                  <div className="glowbox left-[calc(50%-250px)] bottom-[-250px] z-0" style={{ opacity: 0, display: 'none' }}></div>
                  <div className="w-full flex justify-center">
                    <motion.div className="w-full max-w-[800px]" variants={videoVariants} initial="initial" animate="animate" exit="exit">
                      <CountdownTimer />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}


          </section>
        </div>

        {/* Background glows */}
        <motion.div
          className="glow-c hidden sm:block max-w-full"
          style={{ opacity: 0, display: 'none' }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.13, duration: 0.55 } }}
        ></motion.div>
        <motion.div
          className="glow-orange-c max-w-full right-[-500px] top-1/4"
          style={{ opacity: 0, display: 'none' }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.22, duration: 0.89 } }}
        ></motion.div>
        <motion.div
          className="glow-#ffa600-c max-w-full left-[-500px] top-1/4"
          style={{ opacity: 0, display: 'none' }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.27, duration: 0.89 } }}
        ></motion.div>
      </div>
    </>
  );
};

export default Hero;