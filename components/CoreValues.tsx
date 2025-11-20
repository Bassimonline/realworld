import { useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { bg2, core1, core2, core3, core4 } from "../images";

const coreValues = [
  {
    title: "Freedom",
    description:
      "Escape wage slavery, embrace financial independence, and take control of your future.",
    src: core1,
  },
  {
    title: "Brotherhood",
    description: "Strength in network, power in unity. Together, we conquer.",
    src: core2,
  },
  {
    title: "Discipline",
    description:
      "Consistency with purpose, not just for show. Stay focused on your goals.",
    src: core3,
  },
  {
    title: "Excellence",
    description: "Because nothing is more powerful than a community of winners.",
    src: core4,
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.07 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0.7, 0.2, 1], delay: i * 0.05 },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 64, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.4, 0.7, 0.2, 1] },
  },
};

const CoreValues = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();
  if (inView) controls.start("visible");

  return (
    <div id="core-values" className="pt-12 sm:pt-20" ref={ref}>
      <motion.section
        className="w-full relative lg:mt-0 z-20"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={
            inView
              ? { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.4, 0.7, 0.2, 1] } }
              : {}
          }
        >
          {/* Background */}
          <motion.div className="absolute inset-0 z-0">
            <img
              src={bg2}
              alt="Background C"
              className="w-full h-full object-cover"
              draggable={false}
              loading="eager"
            />
          </motion.div>

          {/* Header Section */}
          <motion.div
            className="relative z-10 px-4 text-center max-w-6xl mx-auto py-8 sm:py-12"
            variants={containerVariants}
          >
            <motion.h3
              className="uppercase text-xs sm:text-sm lg:text-lg text-gradient mb-2 sm:mb-4 hidden lg:block tracking-widest"
              variants={fadeUp}
              custom={0}
            >
              🔑 Core Values
            </motion.h3>
            <motion.div
              className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4"
              variants={containerVariants}
            >
              <motion.h3
                className="uppercase text-sm sm:text-base lg:text-lg text-gradient my-2 lg:hidden tracking-widest"
                variants={fadeUp}
                custom={0.1}
              >
                🔑 Core Values
              </motion.h3>
              <motion.h2
  className="text-lg sm:text-2xl lg:text-5xl capitalize texture-text switzer tracking-[-0.5px] sm:tracking-[-1px] lg:tracking-[-3px] max-w-4xl leading-snug sm:leading-tight lg:leading-tight"
  variants={fadeUp}
  custom={0.15}
>
  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
    Our Foundation
  </span>{" "}
  of Success
</motion.h2>

            </motion.div>
          </motion.div>

          {/* Core Values Cards */}
          <motion.div
            className="relative z-10 px-4 sm:px-8 max-w-[1170px] mx-auto mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-11"
            variants={containerVariants}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="
                  group flex flex-col items-center justify-end
                  bg-gradient-to-br from-[#161d28] via-[#202a3a] to-[#191c24]
                  border-[2.5px] border-[#232b37] 
                  hover:border-[#FFCF23]
                  rounded-[24px] sm:rounded-[28px] overflow-hidden relative
                  shadow-[0_6px_32px_0_rgba(24,24,32,0.23)]
                  
                  hover:scale-[1.045] hover:shadow-[0_12px_40px_0_rgba(255,207,35,0.14)]
                  min-h-[280px] sm:min-h-[350px] md:min-h-[420px]
                  p-0
                "
                style={{
                  aspectRatio: "1/1.1",
                  minHeight: "280px",
                  height: "100%",
                }}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  boxShadow: "0 16px 48px 0 #ffcf2340",
                  borderColor: "#FFCF23",
                  transition: { duration: 0.18 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-full h-full absolute inset-0 z-0">
                  <img
                    src={value.src}
                    alt={value.title}
                    className="w-full h-full object-cover object-center transition-opacity duration-500 opacity-80 group-hover:opacity-85"
                    style={{ filter: "brightness(0.95) contrast(1.03) saturate(1.07)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                </div>
                <div className="relative z-10 flex flex-col gap-2 sm:gap-3 w-full px-5 sm:px-7 pb-6 sm:pb-8 pt-24 sm:pt-32 text-center items-center justify-end h-full">
                  <h3 className="text-lg sm:text-2xl font-bold gradient-text capitalize switzer mt-2 tracking-tight drop-shadow-md">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100 group-hover:text-white transition-colors duration-500 p-1 rounded-md font-medium drop-shadow-md">
                    {value.description}
                  </p>
                </div>
                {/* animated gradient glow on hover */}
                <div className="absolute inset-0 pointer-events-none z-0"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default CoreValues;