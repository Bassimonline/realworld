import { useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import {  andrew2, bg2 } from "../images";

// Animation variants
const containerVariants : Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.07 },
  },
};

const fadeUp : Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0.7, 0.2, 1], delay: i * 0.04 },
  }),
};

const cardVariants : Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.4, 0.7, 0.2, 1] },
  },
};

const taglineData = [
  {
    title: "“Don’t buy dreams. Buy $TRW.”",
    desc: "A bold statement for bold individuals. Leave the dreams behind and invest in reality.",
  },
  {
    title: "“Matrix hates us. $TRW made us.”",
    desc: "For the rebels of the system. Escape the chains of mediocrity.",
  },
  {
    title: "“Red pill. Real world.”",
    desc: "The perfect tagline for those who want to break free and achieve their potential.",
  },
  {
    title: "“From average to exceptional.”",
    desc: "A journey from mediocrity to excellence, powered by The Real World and $TRW.",
  },
];

const TaglineIdeas = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();
  if (inView) controls.start("visible");

  return (
    <>
      <div id="tagline-ideas" className="pt-20" ref={ref}>
        <motion.section
          className="w-full relative  z-20 overflow-hidden"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Background */}
          <motion.div
            className="lg:block w-full absolute top-0 left-0 z-0 max-h-[1020px]"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.4, 0.7, 0.2, 1] } }
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

          {/* Content */}
          <motion.div
            style={{ opacity: 1, transform: "translateY(0px)" }}
            variants={fadeUp}
            custom={0}
          >
            <div className="z-10 relative px-4">
              {/* Header */}
              <motion.h3
                className="uppercase text-center mb-3 switzer text-gradient text-lg"
                variants={fadeUp}
                custom={0}
              >
                🧠 Tagline Ideas
              </motion.h3>
             <motion.h2
  className="capitalize switzer tracking-[-1px] lg:tracking-[-3px] text-center texture-text max-w-[280px] mx-auto lg:max-w-full !text-[44px] lg:!text-[55px]"
  variants={fadeUp}
  custom={0.08}
>
  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
    The Words
  </span>{" "}
  That Drive Us
</motion.h2>


              {/* Tagline Cards */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-[1200px] mx-auto z-10 mb-10"
                variants={containerVariants}
              >
                {taglineData.map((tag, idx) => (
                  <motion.div
                    key={tag.title}
                    className="tagline-card bg-[#171D27] hover:bg-[#171D27] backdrop-blur border-[1px] border-[rgba(255,255,255,.27)] rounded-[20px] p-6 group  shadow-md relative overflow-hidden"
                    variants={cardVariants}
                    custom={idx}
                    whileHover={{
                    
                      boxShadow: "0 12px 40px 0 #0007",
                      borderColor: "#FFCF23",
                      transition: { duration: 0.18 },
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <div className="absolute top-0 left-0 z-0 w-full h-full pointer-events-none  flex justify-center backdrop-blur-xl "></div>
                    <img
                      alt="Act Now"
                      loading="lazy"
                      width="936"
                      height="1492"
                      decoding="async"
                      data-nimg="1"
                      className="w-full object-cover h-full opacity-30"
                      src={andrew2}
                      style={{ color: "transparent", position: "absolute", top: 0, left: 0, zIndex: -1 }}
                    />
                    <div className="relative z-10">
                      <h3 style={{color:"white"}} className="text-xl text-[#FFCF23] lg:text-2xl font-bold ">
                      {tag.title}
                    </h3>
                    <p style={{color:"gray"}} className="text-white text-base mt-4">
                      {tag.desc}
                    </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default TaglineIdeas;