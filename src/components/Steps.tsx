import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player"; // Make sure you have this import
import icon_3 from "../images/icon_3.json";

/* --- Icons --- */
const ArrowDown = () => (
    <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-orange-400 drop-shadow-[0_0_4px_rgba(251,146,60,.5)]" // Smaller size and shadow
    >
        <path
            fill="currentColor"
            d="M12 3a1 1 0 0 1 1 1v12.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1z"
        />
    </svg>
);
const CapIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300"> {/* Smaller icons */}
        <path
            fill="currentColor"
            d="M12 3 1 8l11 5 9-4.09V16h2V8L12 3Zm0 7.18L5.97 8 12 4.82 18.03 8 12 10.18ZM4 13v3.5C4 18.43 7.58 20 12 20s8-1.57 8-3.5V13h-2v3.5c0 1-2.69 2.5-6 2.5s-6-1.5-6-2.5V13H4Z"
        />
    </svg>
);
const ChatIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300"> {/* Smaller icons */}
        <path
            fill="currentColor"
            d="M20 2H4a2 2 0 0 0-2 2v16l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 12H5.17L4 15.17V4h16v10Z"
        />
    </svg>
);

/* --- Motion variants --- */
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }, // Slightly faster stagger
};
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0.7, 0.2, 1], delay: i * 0.05 },
    }),
};

const Steps = () => {
    const [pulse, setPulse] = useState(false);
    useEffect(() => {
        const id = setInterval(() => setPulse((p) => !p), 1600);
        return () => clearInterval(id);
    }, []);

    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (inView) controls.start("visible");
    }, [inView, controls]);

    return (
        <section
            ref={ref}
            style={{marginTop:"-10%"}}
            className="relative w-full bg-[#0b0d12] text-white overflow-hidden mt-16 sm:mt-24 lg:mt-32 scroll-mt-24 sm:scroll-mt-32" // Reduced top margin
        >
            <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12 md:pb-16"> {/* Reduced padding */}


                {/* --- HEADER (responsive) --- */}
                <motion.div
                    initial={reduceMotion ? undefined : "hidden"}
                    animate={controls}
                    variants={containerVariants}
                    className="text-center px-3 sm:px-4"
                >
                    {/* Eyebrow (Slightly more compact) */}
                    <motion.div className="mb-2">
                        <span className="inline-flex items-center gap-1 uppercase tracking-[0.3em] text-[10px] text-orange-300/90 bg-white/5 border border-white/10 rounded-full px-2 py-0.5 whitespace-nowrap">
                            <span className="text-[11px]">🚀</span>
                            <span>YOUR PATH TO SUCCESS</span>
                        </span>
                    </motion.div>

                    {/* Main heading (Adjusted clamp for smaller mobile size) */}
                    <motion.h2
                        custom={0.05}
                        className="switzer uppercase font-extrabold text-white leading-[1.08] sm:leading-[1.06] md:leading-[1.04] mx-auto"
                        style={{
                            /* fluid size: ~24px → 56px (Smaller min size) */
                            fontSize: "clamp(1.5rem, 6vw, 3.5rem)",
                            letterSpacing: "clamp(-0.5px, -0.25vw, -3px)",
                            maxWidth: "28ch",
                        }}
                    >
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Transform Your Life
                        </span>
                        <span className="block">
                            in{" "}
                            <span
                                className="text-orange-400 inline-block align-baseline"
                                style={{ fontSize: "clamp(1.7rem, 6.4vw, 4rem)" }} // Smaller number size
                            >
                                4
                            </span>{" "}
                            Simple Steps
                        </span>
                    </motion.h2>

                    {/* Subheading (Reduced top margin and max width) */}
                    <motion.p
                        custom={0.1}
                        className="mt-3 mx-auto text-gray-300 leading-relaxed"
                        style={{
                            /* fluid size: ~14px → 16px (Tighter font range) */
                            fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
                            maxWidth: "55ch", // Reduced max width for tighter mobile look
                        }}
                    >
                        Join thousands who've already escaped the matrix and built real wealth.{" "}
                        <span className="font-semibold text-white">The clock is ticking</span> — your
                        future starts today.
                    </motion.p>
                </motion.div>



                {/* Steps */}
                <motion.div
                    className="mt-6 sm:mt-8 space-y-3 sm:space-y-4" // Reduced vertical gap between cards
                    variants={containerVariants}
                >
                    {/* Card 1 */}
                    <motion.div
                        className="rounded-[999px] border border-white/15 bg-white/5 backdrop-blur-sm px-4 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4 flex items-center gap-3 sm:gap-4" // Reduced vertical padding
                        custom={0.6}
                    >
                        <div className="shrink-0 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-500/90 to-orange-600/90 border border-yellow-500/30"> {/* Smaller icon circle */}
                            <CapIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[9px] sm:text-[10px] tracking-[.3em] text-gray-300/90 font-semibold">ANDREW TATE</div> {/* Smaller eyebrow text */}
                            <div className="text-xl sm:text-2xl md:text-[28px] font-extrabold leading-tight">BACKED & DOXXED</div> {/* Smaller main text */}
                        </div>
                    </motion.div>

                    <div className="py-0.5"> {/* Reduced vertical spacing around arrow */}
                        <ArrowDown />
                    </div>

                    {/* Card 2 */}
                    <motion.div
                        className="rounded-[999px] border border-white/15 bg-white/5 backdrop-blur-sm px-4 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4 flex items-center gap-3 sm:gap-4" // Reduced vertical padding
                        custom={0.7}
                    >
                        <div className="shrink-0 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-500/90 to-orange-600/90 border border-yellow-500/30"> {/* Smaller icon circle */}
                            <ChatIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[9px] sm:text-[10px] tracking-[.3em] text-gray-300/90 font-semibold">LIQUIDITY</div> {/* Smaller eyebrow text */}
                            <div className="text-xl sm:text-2xl md:text-[28px] font-extrabold leading-tight">100% LOCKED</div> {/* Smaller main text */}
                        </div>
                    </motion.div>

                    <div className="py-0.5"> {/* Reduced vertical spacing around arrow */}
                        <ArrowDown />
                    </div>

                    {/* Card 3 */}
                    <motion.div
                        className="rounded-[999px] border border-white/15 bg-white/5 backdrop-blur-sm px-4 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4 flex items-center gap-3 sm:gap-4" // Reduced vertical padding
                        custom={0.8} // Adjusted custom value for step 3
                    >
                        <div className="shrink-0 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-500/90 to-orange-600/90 border border-yellow-500/30"> {/* Smaller icon circle */}
                            <ChatIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[9px] sm:text-[10px] tracking-[.3em] text-gray-300/90 font-semibold">7-FIGURE</div> {/* Smaller eyebrow text */}
                            <div className="text-xl sm:text-2xl md:text-[28px] font-extrabold leading-tight">COMMUNITY BACKING</div> {/* Smaller main text */}
                        </div>
                    </motion.div>
                </motion.div>

                {/* CTA Button (Reduced padding) */}
                <div className="flex justify-center mt-6">
                  <a href="https://t.me/trwverifychannel">
                      <motion.button
                        aria-label="Join The Real World"
                        className={[
                            "group relative w-full sm:w-auto",
                            "rounded-full px-5 sm:px-7 md:px-9 py-3 sm:py-3.5 md:py-4", // Reduced padding
                            "font-semibold text-base sm:text-lg",
                            "bg-gradient-to-r from-yellow-400 to-orange-500",
                            "shadow-[inset_0_0_0_2px_rgba(255,255,255,.1),0_10px_30px_rgba(234,179,8,.35)]",
                            "hover:scale-[1.01] active:scale-[.99] transition-transform",
                        ].join(" ")}
                        initial={reduceMotion ? undefined : "hidden"}
                        animate={controls}
                        custom={0.35}
                    >
                        <span className="flex items-center justify-center gap-2 sm:gap-3">
                            Join The Real World
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M5 12h14M13 5l7 7-7 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <span
                            className={[
                                "pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20 transition-all",
                                pulse
                                    ? "shadow-[0_0_0_6px_rgba(251,146,60,.12)]" // Reduced pulse size
                                    : "shadow-none",
                            ].join(" ")}
                        />
                    </motion.button>
                  </a>
                </div>
            </div>

            {/* Background lines (Unchanged) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[.07]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(90deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 80px)",
                }}
            />
        </section>
    );
};

export default Steps;