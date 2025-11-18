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
              {/* Header */}
              <motion.h3
                className="uppercase text-center mb-3 text-gradient"
                variants={fadeUp}
                custom={0}
              >
                STILL THINKING?
              </motion.h3>
              <motion.h2
                className="text-center mb-8 capitalize switzer tracking-[-1px] lg:tracking-[-3px] !text-[44px] lg:!text-[55px]"
                variants={fadeUp}
                custom={0.08}
              >
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Words
                </span>{" "}
                <span className="text-white">of Wisdom</span>
              </motion.h2>


              {/* Quotes Section */}
              <motion.div
                className="max-w-[856px] mx-auto fade-in visible"
                variants={containerVariants}
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                >
                  {quotes.map((q, idx) => (
                    <motion.div
                      key={q.text}
                      className="quote-card bg-[#0C1021] hover:bg-[#171D27] border-[1px] border-[rgba(255,255,255,.2)] rounded-[20px] p-6 group  shadow-md"
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
                      <p className="text-white text-base leading-loose">
                        {q.text}
                      </p>
                      <p style={{ color: "gray" }} className="text-right text-[#FFCF23] font-bold mt-4">{q.author}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>


            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default Qoute;