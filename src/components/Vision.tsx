import { useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { bg2 } from "../images";
import { Link } from "react-router-dom";
import icon_3 from "../images/icon_3.json";
import { Player } from "@lottiefiles/react-lottie-player";

// Animation variants (Keeping these for motion effects)
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.4, 0.7, 0.2, 1],
      delay: i * 0.05,
    },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0.8, 0.2, 1],
    },
  },
  hover: {
    backgroundColor: "rgba(26,26,33,0.95)", // Slightly brighter on hover
    boxShadow: "0 4px 15px rgba(255,141,58,0.1)", 
    transition: { duration: 0.2 },
  },
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
    boxShadow: "0 2px 12px 0 rgba(255,255,255,0.25)",
    transition: { duration: 0.13 },
  },
};

// --- Card Component Refactoring for Compactness ---
const CompactVisionCard = ({ number, title, text, custom }: { number: number, title: string, text: React.ReactNode, custom: number }) => (
    <motion.article
        className="relative rounded-xl overflow-hidden bg-[rgba(26,26,33,0.8)] border border-[rgba(255,255,255,.1)] cursor-pointer h-full"
        variants={cardVariants}
        whileHover="hover"
        custom={custom}
    >
        {/* Accent Bar - Takes minimal vertical space */}
        <div 
            className="h-1" 
            style={{ background: "linear-gradient(90deg, #FFD600 0%, #FF8D3A 100%)" }}
        ></div>

        <div className="p-4 sm:p-5 lg:p-6 text-left flex flex-col justify-start space-y-2"> 
            
            {/* Title Block: Number + Text */}
            <div className="flex items-center space-x-3 mb-1">
                {/* Number as a simple, small accent */}
                <div className="switzer text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    {number}.
                </div>
                {/* Title */}
                <h3 className="text-white text-lg lg:text-xl font-bold leading-snug"> 
                    {title}
                </h3>
            </div>
            
            {/* Description */}
            <p className="text-sm lg:text-base leading-snug text-gray-400">
                {text}
            </p>
        </div>
    </motion.article>
);


const Vision = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  if (inView) controls.start("visible");

  return (
    <>
      <div id="vision" className="pt-20" ref={ref}>
        <motion.section
          className="w-full relative z-20"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Background Section (Unchanged) */}
          <motion.div
            className="lg:block w-full absolute top-0 left-0 z-0 max-h-[1020px]"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 1.1, ease: [0.4, 0.7, 0.2, 1] },
                  }
                : {}
            }
          >
            <img
              alt="Background C"
              loading="lazy"
              width="1728"
              height="1669"
              decoding="async"
              data-nimg="1"
              className="w-full lg:w-full h-[800px] lg:h-auto mx-auto"
              src={bg2}
              style={{ color: "transparent" }}
            />
            <div className="top-fade-b pointer-events-none"></div>
            <div className="left-fade-b pointer-events-none"></div>
            <div className="right-fade-b pointer-events-none"></div>
            <div className="bottom-fade-b pointer-events-none"></div>
          </motion.div>
          {/* Content Section */}
          <motion.div
            style={{ opacity: 1, transform: "translateY(20px)" }}
            variants={fadeUp}
            custom={0}
          >
            <div className="z-10 relative px-4">
              <motion.h3
                className="uppercase text-center lg:text-[16px] mb-3 text-gradient"
                variants={fadeUp}
              >
                🚀 Our Vision
              </motion.h3>
              <motion.h2
                className="uppercase text-center switzer tracking-[-1px] lg:tracking-[-3px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                variants={fadeUp}
                custom={0}
                style={{ color: "white" }}
              >
                <div className="inline-flex items-center justify-center">
                  <Player
                    autoplay
                    loop
                    src={icon_3}
                    className="w-10 h-10 mr-3 sm:mr-4"
                    style={{
                      transform: "translateY(2px)",
                    }}
                  />
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Welcome to the
                  </span>
                </div>{" "}
                Future of Freedom
              </motion.h2>
              <motion.p
                className="text-center text-white mt-4 text-lg lg:text-2xl max-w-[900px] mx-auto"
                variants={fadeUp}
                custom={0.2}
              >
                To become the{" "}
                <span className="font-bold">ultimate cryptocurrency platform</span>{" "}
                for financial freedom and personal development — where $TRW holders access exclusive
                knowledge, build wealth, and dominate every aspect of life.
              </motion.p>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 max-w-[1200px] mx-auto mt-10 lg:mt-20"
                variants={containerVariants}
              >
                {/* Card 1: Time is Running Out */}
                <CompactVisionCard
                    number={1}
                    title="Time is Running Out"
                    custom={0}
                    text={
                        <>
                            The world is transforming in 2025. Are you ready to take
                            on the change or will you be left behind?{" "}
                            <span className="font-bold text-white">
                                Act now before it's too late!
                            </span>
                        </>
                    }
                />

                {/* Card 2: Embrace the AI Revolution */}
                <CompactVisionCard
                    number={2}
                    title="Embrace the AI Revolution"
                    custom={1}
                    text={
                        <>
                            Leverage the power of AI to 10x your productivity and
                            income.{" "}
                            <span className="font-bold text-white">
                                Don't sleep on the robots that can revolutionize your
                                life.
                            </span>
                        </>
                    }
                />

                {/* Card 3: Invest in Yourself */}
                <CompactVisionCard
                    number={3}
                    title="Invest in Yourself"
                    custom={2}
                    text={
                        <>
                            Learning a skill is the key to unlocking freedom, income,
                            and success.{" "}
                            <span className="font-bold text-white">
                                Your future starts with the actions you take today.
                            </span>
                        </>
                    }
                />
              </motion.div>
              {/* Buy $TRW Button (Unchanged) */}
              <Link to="token-sale">
                <motion.a
                  href="#"
                  className="block w-full max-w-[340px] mx-auto px-2 mt-6 lg:mt-10"
                  variants={btnVariants}
                  initial="initial"
                  animate="animate"
                  whileTap="tap"
                  whileHover="animate"
                  style={{ WebkitTapHighlightColor: "transparent", borderRadius:"50px" }}
                >
                  <motion.div
                    className="relative w-full rounded-full overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(91deg,#ffd600 0%,#ff8d3a 100%)",
                    }}
                    layout
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  >
                    {/* Subtle shine effect */}
                    <motion.div
                      className="absolute left-0 top-0 w-1/2 h-full pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.18, 0],
                        x: ["-55%", "120%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: 0.28,
                      }}
                      style={{
                        background:
                          "linear-gradient(120deg,rgba(255,255,255,0.0) 40%,rgba(255,255,255,0.16) 55%,rgba(255,255,255,0.0) 70%)",
                        filter: "blur(8px)",
                      }}
                    />

                    <div className="flex items-center justify-center h-[56px] sm:h-[68px] w-full min-w-[140px] max-w-[340px] m-auto select-none">
                      <span className="font-extrabold text-neutral-900 text-2xl sm:text-3xl tracking-tight drop-shadow-[0_1px_8px_rgba(255,255,255,0.10)]">
                        <Link to="token-sale">  BUY $TRW</Link>
                      </span>
                    </div>
                  </motion.div>
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default Vision;