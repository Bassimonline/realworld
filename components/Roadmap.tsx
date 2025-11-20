import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { andrew1, bg2, logo2, roadmap2, roadmap4 } from "../images";
import icon_3 from "../images/icon_3.json";

// Animation variants
const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.06 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.4, 0.7, 0.2, 1] } }
};

const phaseFade: Variants = {
  hidden: { opacity: 0, y: 64, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.42, 0.8, 0.2, 1] } }
};

const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.4, 0.7, 0.2, 1] } }
};

const PHASES = [
  {
    img: andrew1,
    title: "🥚 Phase 1: Foundation Launch",
    items: [
      "Launch $TRW cryptocurrency on major exchanges",
      "Build The Real World platform and community",
      "Establish core educational content and courses",
      "Launch website and mobile app",
      "Create exclusive member benefits accessible with $TRW",
    ],
    alt: "Phase 1 Illustration"
  },
  {
    img: roadmap2,
    title: "🛡️ Phase 2: Community Growth",
    items: [
      "Build advanced member features and tools",
      "Launch exclusive investment opportunities for $TRW holders",
      "Create premium content and mentorship programs",
      "Partner with industry leaders and experts",
    ],
    alt: "Phase 2 Illustration"
  },
  {
    img: logo2,
    title: "💼 Phase 3: Wealth Creation",
    items: [
      "Launch exclusive investment funds and opportunities",
      "Create business development programs",
      "Establish global networking events",
      "Develop advanced wealth-building tools powered by $TRW",
    ],
    alt: "Phase 3 Illustration"
  },
  {
    img: roadmap4,
    title: "🏛️ Phase 4: Global Empire",
    items: [
      "Expand to international markets and communities",
      "Launch real estate and business ventures",
      "Create educational institutions and academies",
      "Establish global wealth management services using $TRW",
    ],
    alt: "Phase 4 Illustration"
  },
];

const Roadmap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trailLineRef = useRef<HTMLDivElement>(null);
  const [trailHeight, setTrailHeight] = useState(0);

  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  if (inView) controls.start("visible");

  // Roadmap trail animation - grows as section comes into view and on scroll
  useEffect(() => {
    const updateTrail = () => {
      if (!sectionRef.current || !trailLineRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollY = window.scrollY + window.innerHeight / 3; // start animation a bit before full view
      let progress = (scrollY - sectionTop) / sectionHeight;
      progress = Math.max(0, Math.min(1, progress));
      setTrailHeight(progress * (sectionHeight * 0.85)); // 85% of section height for perfect roadmap feel
    };

    if (inView) {
      updateTrail();
      window.addEventListener("scroll", updateTrail, { passive: true });
      window.addEventListener("resize", updateTrail);
      return () => {
        window.removeEventListener("scroll", updateTrail);
        window.removeEventListener("resize", updateTrail);
      };
    }
  }, [inView]);

  return (
    <>
      <div id="roadmap" className="pt-20" ref={sectionRef}>
        <motion.section
          className="w-full relative z-20   flex flex-col items-center timeline"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          {/* Background */}
          <motion.div
            className="lg:block w-full absolute top-0 left-0 z-0 max-h-[1728px] h-full lg:h-auto"
            variants={bgVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <img
              alt="Background 1"
              loading="lazy"
              width="1729"
              height="1728"
              decoding="async"
              data-nimg="1"
              className="w-full h-[2000px] lg:h-[1450px] object-cover"
              src={bg2}
              style={{ color: "transparent" }}
            />
            <div className="top-fade-b pointer-events-none"></div>
            <div className="left-fade-b pointer-events-none"></div>
            <div className="right-fade-b pointer-events-none"></div>
            <div className="bottom-fade-b pointer-events-none"></div>
          </motion.div>
          <motion.div
            style={{ opacity: 1, transform: "translateY(20px)" }}
            variants={fadeUp}
          >
            <div className="max-w-[1236px] mx-auto flex flex-col items-center z-50 relative">
              <motion.h3
                className="uppercase  text-center  lg:text-[16px] mb-3 text-gradient"
                variants={fadeUp}
              >
                🚀 $TRW Roadmap
              </motion.h3>
              <motion.h2
                className="mb-8 text-center lg:px-4 max-w-[668px] capitalize switzer tracking-[-1px] lg:tracking-[-3px] !text-[44px] lg:!text-[55px]"
                variants={fadeUp}
              >
                <span className="texture-text">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    From Vision
                  </span>{" "}
                  to Reality
                </span>
              </motion.h2>

            </div>
            {/* Roadmap trail and ball */}
            <motion.div className="relative flex justify-start w-full"  >
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex flex-col items-center w-[22px]">
                {/* The roadmap vertical line */}
                <motion.div
                  ref={trailLineRef}
                  className="highlight bg-gradient-to-b from-[#ffcf23] via-[#ff8d3a] to-transparent rounded-full"
                  initial={{ height: 0 }}
                  animate={{ height: trailHeight }}
                  transition={{ duration: 0.7, ease: [0.4, 0.7, 0.2, 1] }}
                  style={{
                    width: "7px",
                    boxShadow: "0 0 30px 5px #ffcf2377",
                    position: "relative",
                  }}
                />
                {/* Trail ball at the end of the line */}
                {/* <motion.div
                  className="ball"
                  style={{
                    position: "absolute",
                    left: "-7px",
                    top: trailHeight - 18,
                    transition: "top .3s cubic-bezier(.4,.7,.2,1)",
                  }}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <img
                    alt="Arrow down"
                    loading="lazy"
                    width="22"
                    height="22"
                    decoding="async"
                    data-nimg="1"
                    className="max-w-[40px] transition-all duration-300"
                    src={andrew1}
                    style={{ color: "transparent" }}
                  />
                </motion.div> */}
              </div>
            </motion.div>
            {/* PHASES */}
            <motion.div className="relative mt-4 z-50" variants={sectionVariants}>
              {PHASES.map((phase, i) => (
                <motion.div
                  key={phase.title}
                  className={`flex flex-col lg:flex-row items-center justify-between ${i > 0 ? "mt-16" : ""} gap-4 lg:gap-12 pl-4 lg:pl-0`}
                  variants={phaseFade}
                >
                  <figure className="lg:w-1/2 flex justify-center relative px-4 lg:px-0 w-full">
                    <div className="hidden lg:block newglow left-[-200px] z-0 top-20"></div>
                    <div className="border-[1px] overflow-hidden border-white/25 rounded-[25px] bg-white/10  hidden lg:block w-[520px] h-[320px] relative pointer-events-none">
                      <img
                        alt={phase.alt}
                        loading="lazy"
                        decoding="async"
                        data-nimg="1"
                        className="absolute z-10 w-full h-full object-fill pointer-events-none"
                        src={phase.img}
                        style={{ color: "transparent" }}
                      />
                    </div>
                  </figure>
                  <div className="lg:w-1/2 lg:pl-16 px-4 lg:pr-0">
                    <h2 className="gradient-text capitalize subtitle switzer text-[32px] lg:text-[36px] mb-6">
                      {phase.title}
                    </h2>
                    <ul className="list-disc ml-5 text-white">
                      {phase.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default Roadmap;