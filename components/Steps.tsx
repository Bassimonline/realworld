import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player"; // Make sure you have this import
import icon_3 from "../images/icon_3.json";

/* --- Icons --- */
const ArrowDown = () => (
    <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-orange-400 drop-shadow-[0_0_6px_rgba(251,146,60,.6)]"
    >
        <path
            fill="currentColor"
            d="M12 3a1 1 0 0 1 1 1v12.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1z"
        />
    </svg>
);
const CapIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 text-gray-300">
        <path
            fill="currentColor"
            d="M12 3 1 8l11 5 9-4.09V16h2V8L12 3Zm0 7.18L5.97 8 12 4.82 18.03 8 12 10.18ZM4 13v3.5C4 18.43 7.58 20 12 20s8-1.57 8-3.5V13h-2v3.5c0 1-2.69 2.5-6 2.5s-6-1.5-6-2.5V13H4Z"
        />
    </svg>
);
const ChatIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 text-gray-300">
        <path
            fill="currentColor"
            d="M20 2H4a2 2 0 0 0-2 2v16l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 12H5.17L4 15.17V4h16v10Z"
        />
    </svg>
);

/* --- Motion variants --- */
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
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
            className="relative w-full bg-[#0b0d12] text-white overflow-hidden mt-24 sm:mt-32 lg:mt-40 scroll-mt-24 sm:scroll-mt-32"
        >
            <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-14 md:pb-20">


                {/* --- HEADER (responsive) --- */}
                <motion.div
                    initial={reduceMotion ? undefined : "hidden"}
                    animate={controls}
                    variants={containerVariants}
                    className="text-center px-3 sm:px-4"
                >
                    {/* Eyebrow */}
                    <motion.div  className="mb-2 sm:mb-3">
                        <span className="inline-flex items-center gap-1.5 sm:gap-2 uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[10px] sm:text-xs text-orange-300/90 bg-white/5 border border-white/10 rounded-full px-2.5 sm:px-3 py-1 whitespace-nowrap">
                            <span className="text-[12px] sm:text-sm">🚀</span>
                            <span>YOUR PATH TO SUCCESS</span>
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h2
                        
                        custom={0.05}
                        className="switzer uppercase font-extrabold text-white leading-[1.08] sm:leading-[1.06] md:leading-[1.04] mx-auto"
                        style={{
                            /* fluid size: ~28px → 64px */
                            fontSize: "clamp(1.75rem, 6vw, 4rem)",
                            letterSpacing: "clamp(-0.5px, -0.25vw, -3px)",
                            maxWidth: "28ch",
                        }}
                    >
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Transform Your Life
                        </span>
                        {/* optional controlled break for nicer wrap on larger screens */}
                    
                        <span className="block">
                            in{" "}
                            <span
                                className="text-orange-400 inline-block align-baseline"
                                style={{ fontSize: "clamp(1.9rem, 6.4vw, 4.25rem)" }}
                            >
                                4
                            </span>{" "}
                            Simple Steps
                        </span>
                    </motion.h2>

                    {/* Subheading */}
                    <motion.p
                        
                        custom={0.1}
                        className="mt-3.5 sm:mt-4 mx-auto text-gray-300 leading-relaxed"
                        style={{
                            /* fluid size: ~14px → 18px */
                            fontSize: "clamp(0.875rem, 1.3vw, 1.125rem)",
                            maxWidth: "62ch",
                        }}
                    >
                        Join thousands who've already escaped the matrix and built real wealth.{" "}
                        <span className="font-semibold text-white">The clock is ticking</span> — your
                        future starts today.
                    </motion.p>
                </motion.div>



                {/* Steps */}
                <motion.div
                    className="mt-8 sm:mt-10 space-y-4 sm:space-y-6"
                    variants={containerVariants}
                >
                    {/* Card 1 */}
                    <motion.div
                        className="rounded-[999px] border border-white/15 bg-white/5 backdrop-blur-sm px-4 sm:px-6 md:px-7 py-3.5 sm:py-4 md:py-5 flex items-center gap-3 sm:gap-4"
                        custom={0.6}
                    >
                        <div className="shrink-0 grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-yellow-500/90 to-orange-600/90 border border-yellow-500/30">
                            <CapIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] sm:text-xs tracking-widest text-gray-300/90 font-semibold">ANDREW TATE</div>
                            <div className="text-2xl sm:text-3xl md:text-[34px] font-extrabold leading-tight">BACKED & DOXXED</div>
                        </div>
                    </motion.div>

                    <div className="py-1">
                        <ArrowDown />
                    </div>

                    {/* Card 2 */}
                    <motion.div
                        className="rounded-[999px] border border-white/15 bg-white/5 backdrop-blur-sm px-4 sm:px-6 md:px-7 py-3.5 sm:py-4 md:py-5 flex items-center gap-3 sm:gap-4"
                        custom={0.7}
                    >
                        <div className="shrink-0 grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-yellow-500/90 to-orange-600/90 border border-yellow-500/30">
                            <ChatIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] sm:text-xs tracking-widest text-gray-300/90 font-semibold">LIQUIDITY</div>
                            <div className="text-2xl sm:text-3xl md:text-[34px] font-extrabold leading-tight">100% LOCKED</div>
                        </div>
                    </motion.div>

                    <div className="py-1">
                        <ArrowDown />
                    </div>

                    {/* Card 3 */}
                    <motion.div
                        className="rounded-[999px] border border-white/15 bg-white/5 backdrop-blur-sm px-4 sm:px-6 md:px-7 py-3.5 sm:py-4 md:py-5 flex items-center gap-3 sm:gap-4"
                        custom={0.7}
                    >
                        <div className="shrink-0 grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-yellow-500/90 to-orange-600/90 border border-yellow-500/30">
                            <ChatIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] sm:text-xs tracking-widest text-gray-300/90 font-semibold">7-FIGURE</div>
                            <div className="text-2xl sm:text-3xl md:text-[34px] font-extrabold leading-tight">COMMUNITY BACKING</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* CTA Button */}
                <div className="flex justify-center mt-6">
                  <a href="https://t.me/+Xy3Ea4bUeoZmN2Qy">
                      <motion.button
                        aria-label="Join The Real World"
                        className={[
                            "group relative w-full sm:w-auto",
                            "rounded-full px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5",
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
                                    ? "shadow-[0_0_0_8px_rgba(251,146,60,.12)]"
                                    : "shadow-none",
                            ].join(" ")}
                        />
                    </motion.button>
                  </a>
                </div>
            </div>

            {/* Background lines */}
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
