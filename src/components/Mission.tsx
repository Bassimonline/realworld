import { useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { bg2, logo2 } from "../images";

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0.7, 0.2, 1],
      delay: i * 0.07,
    },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.64, ease: [0.4, 0.7, 0.2, 1] },
  },
};

const cardContent = [
  {
    title: "Unstoppable Hustle",
    desc: "Unlock the mindset and tactics of elite performers. Build multiple income streams, outwork the competition, and break free from the status quo. Success favors the relentless.",
  },
  {
    title: "Elite Brotherhood",
    desc: "Join a tribe of forward-thinkers and high achievers. Share strategies, access exclusive opportunities, and grow wealth together using $TRW cryptocurrency.",
  },
  {
    title: "Wealth Strategies",
    desc: "Transform from average to exceptional with advanced investing, trading, and risk management. Master the moves that separate the top 1% from the rest—no luck, just skill.",
  },
  {
    title: "Digital Dominance",
    desc: "Harness the power of online platforms to build influence and wealth. Learn how to create content, build audiences, and monetize your expertise in the digital age.",
  },
  {
    title: "Real Wealth Access",
    desc: "No gatekeepers, no limits—just actionable paths to prosperity. Leverage $TRW cryptocurrency, community, knowledge, and technology to make real wealth attainable for all who dare.",
  },
];

const Mission = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();
  if (inView) controls.start("visible");

  return (
    <>
      <div id="mission" className="pt-20" ref={ref}>
        <motion.section
          className="w-full relative   z-20"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 1.2,
                      ease: [0.4, 0.7, 0.2, 1],
                    },
                  }
                : {}
            }
          >
            <img
              src={bg2}
              alt="Mission Background"
              className="w-full h-full object-cover"
              draggable={false}
              loading="eager"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.6] to-black/[0.9]"></div> */}
          </motion.div>
          <motion.div
            className="lg:block w-full absolute top-0 left-0 z-0 max-h-[1800px] bg-background"
            initial={{ opacity: 0 }}
            animate={
              inView
                ? { opacity: 1, transition: { duration: 0.7, delay: 0.2 } }
                : {}
            }
          >
            <div className="top-fade-b pointer-events-none"></div>
            <div className="left-fade-b pointer-events-none"></div>
            <div className="right-fade-b pointer-events-none"></div>
            <div className="bottom-fade-b pointer-events-none"></div>
          </motion.div>
          <motion.div
            style={{ opacity: 1, transform: "translateY(0px)" }}
            variants={fadeUp}
            custom={0}
          >
            <div className="z-10 relative px-4">
              <motion.h3
                className="uppercase switzer text-center mb-3 text-xl lg:text-2xl text-gradient"
                variants={fadeUp}
                custom={0}
              >
                🎯 The Real Mission
              </motion.h3>
             <motion.h2
  className="capitalize switzer tracking-[-1px] lg:tracking-[-3px] text-center texture-text text-4xl lg:text-6xl"
  variants={fadeUp}
  custom={0.12}
>
  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
    Unite Hustlers
  </span>
  , Entrepreneurs, and Winners
</motion.h2>

              <motion.p
                className="text-center text-white mt-4 text-lg lg:text-2xl max-w-[900px] mx-auto"
                variants={fadeUp}
                custom={0.17}
                style={{color:"gray"}}
              >
                We're not just{" "}
                talking.
                We're doing. Turning{" "}
                average people{" "}
                into exceptional performers, making real wealth actually accessible through $TRW, and fueling
                the elite brotherhood of winners.
              </motion.p>
            </div>
            <motion.div
              className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative max-w-[1280px] mx-auto gap-8 lg:gap-6 mt-12 lg:mt-24"
              variants={containerVariants}
            >
              {cardContent.map((card, idx) => (
                <motion.article
                  key={card.title}
                  className="bg-gradient-to-br from-[#101924] via-[#151e2a] to-[#0a1017] hover:from-[#171D27] hover:via-[#222b39] hover:to-[#111a27] group relative campus  rounded-xl shadow-lg border border-[#FFCF23]/20"
                  variants={cardVariants}
                  custom={idx}
                  style={{
                    boxShadow: "0 10px 40px 0 #000500",
                  }}
                  
                >
                  <img
                    src={logo2}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl "
                    draggable={false}
                    loading="eager"
                  />
                  <div className="absolute inset-0 z-0 w-full h-full rounded-xl pointer-events-none flex justify-center backdrop-blur-xl"></div>

                  <div className="lg:h-[260px] py-10 flex flex-col items-center text-center px-6">
                    <div className="title gradient-text capitalize z-10 relative switzer text-lg lg:text-xl font-bold mb-5 tracking-tight">
                      {card.title}
                    </div>
                    <div className="description !text-white  z-10 relative switzer text-sm lg:text-base font-medium leading-relaxed">
                      <span>{card.desc}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default Mission;
