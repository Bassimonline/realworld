import { useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { bg2 } from "../images";

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.10, delayChildren: 0.07 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0.7, 0.2, 1], delay: i * 0.05 },
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

const quotes = [
  {
    text: "“Success is always a result of hard work, consistency, and unrelenting belief in yourself.”",
    author: "— Andrew Tate",
  },
  {
    text: "“Your mind must be stronger than your emotions.”",
    author: "— Andrew Tate",
  },
  {
    text: "“Freedom is earned, not given. Hustle for it.”",
    author: "— Andrew Tate",
  },
  {
    text: "“You will never be successful without taking risks.”",
    author: "— Andrew Tate",
  },
  {
    text: "“Discipline is the bridge between goals and accomplishment.”",
    author: "— Andrew Tate",
  },
  {
    text: "“Don’t waste energy complaining. Channel it into action.”",
    author: "— Andrew Tate",
  },
];

const Qoute = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();
  if (inView) controls.start("visible");

  return (
    <>
      <div id="quote" ref={ref}>
        <motion.section
          className="w-full relative mb-14"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* background image  */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.4, 0.7, 0.2, 1] } }
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
            style={{ opacity: 1, transform: "translateY(0px)" }}
            variants={fadeUp}
            custom={0}
          >
            <div className="z-10 relative flex flex-col items-center px-4">
              {/* Header - This section was removed: STILL THINKING? Words of Wisdom */}
              {/* Quotes Section - This section was removed: All quote cards */}
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default Qoute;