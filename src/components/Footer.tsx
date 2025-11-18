import { useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";

const fadeUp : Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0.7, 0.2, 1] },
  },
};

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const controls = useAnimation();
  if (inView) controls.start("visible");

  return (
    <>
      <div ref={ref}>
        <motion.footer
          className="w-full relative z-10 lg:mt-16 px-4 text-white"
          initial="hidden"
          animate={controls}
          variants={fadeUp}
        >
          {/* Footer Bottom */}
          <motion.div
            className="w-full py-6"
            variants={fadeUp}
          >
            <div className="max-w-[1236px] mx-auto flex flex-col lg:flex-row justify-between items-center">
              <motion.div
                className="text-white/50 text-sm"
                variants={fadeUp}
                transition={{ delay: 0.05, duration: 0.5 }}
              >
                © {new Date().getFullYear()} The Real World - $TRW Cryptocurrency. All Rights Reserved.
              </motion.div>
              <motion.div
                className="text-white/50 text-sm mt-4 lg:mt-0"
                variants={fadeUp}
                transition={{ delay: 0.14, duration: 0.6 }}
              >
                Powered by Andrew Tate's $TRW cryptocurrency for elite financial education.
              </motion.div>
            </div>
          </motion.div>
        </motion.footer>
      </div>
    </>
  );
};

export default Footer;