import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { bg2, logo2 } from "../images"; 

// Animation variants (Adjusted y-offset for subtle motion on smaller elements)
const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.03 } // Tighter stagger
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 }, // Reduced y-offset
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0.7, 0.2, 1] } }
};

const phaseFade: Variants = {
  hidden: { opacity: 0, x: -30 }, // Changed from y to x for a slide-in effect
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.42, 0.8, 0.2, 1] } }
};

const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.4, 0.7, 0.2, 1] } }
};

const PHASES = [
  {
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
      const scrollY = window.scrollY + window.innerHeight / 3;
      let progress = (scrollY - sectionTop) / sectionHeight;
      progress = Math.max(0, Math.min(1, progress));
      // Adjusted height calculation for a tighter roadmap design
      setTrailHeight(progress * (sectionHeight * 0.95)); 
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
      <div id="roadmap" className="pt-12 sm:pt-16" ref={sectionRef}> {/* Reduced top padding */}
        <motion.section
          className="w-full relative z-20 flex flex-col items-center timeline pb-12 sm:pb-16" // Added bottom padding
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          {/* Background (Adjusted height for removed content) */}
          <motion.div
            className="lg:block w-full absolute top-0 left-0 z-0 h-full"
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
              className="w-full h-full object-cover" // h-full to adapt to the reduced content size
              src={bg2}
              style={{ color: "transparent" }}
            />
            <div className="top-fade-b pointer-events-none"></div>
            <div className="left-fade-b pointer-events-none"></div>
            <div className="right-fade-b pointer-events-none"></div>
            <div className="bottom-fade-b pointer-events-none"></div>
          </motion.div>

          {/* Header Content */}
          <motion.div
            className="max-w-[1236px] mx-auto flex flex-col items-center z-50 relative px-4"
            variants={fadeUp}
            custom={0}
          >
              <motion.h3
                className="uppercase text-center text-sm lg:text-[16px] mb-2 text-gradient"
                variants={fadeUp}
              >
                🚀 $TRW Roadmap
              </motion.h3>
              <motion.h2
                className="mb-6 text-center lg:px-4 max-w-[668px] capitalize switzer tracking-[-1px] lg:tracking-[-3px] !text-[36px] lg:!text-[55px] leading-tight" // Reduced mobile font size
                variants={fadeUp}
                custom={0.1}
              >
                <span className="texture-text">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    From Vision
                  </span>{" "}
                  to Reality
                </span>
              </motion.h2>

            </motion.div>

            {/* Timeline Trail & PHASES Container */}
            <motion.div className="relative w-full max-w-5xl mx-auto mt-2" variants={sectionVariants}>

              {/* Vertical Timeline Line (Mobile) */}
              <div className="lg:hidden absolute left-4 top-0 bottom-0 z-10">
                <div className="w-[2px] h-full bg-white/10"></div>
                {/* Animated Gradient Trail (Mobile Only) */}
                <motion.div
                  ref={trailLineRef}
                  className="absolute top-0 left-0 w-full highlight bg-gradient-to-b from-[#ffcf23] via-[#ff8d3a] to-transparent"
                  initial={{ height: 0 }}
                  animate={{ height: trailHeight }}
                  transition={{ duration: 0.7, ease: [0.4, 0.7, 0.2, 1] }}
                  style={{ boxShadow: "0 0 15px 1px #ffcf2377" }}
                />
              </div>
              
              {/* Vertical Timeline Line (Desktop - fixed width) */}
              <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-10">
                <div className="w-[2px] h-full bg-white/10"></div>
              </div>

              {/* PHASES MAPPED */}
              {PHASES.map((phase, i) => {
                const isEven = i % 2 === 0;
                
                return (
                  <motion.div
                    key={phase.title}
                    // Alternating justification for desktop layout
                    className={`relative flex flex-row items-start lg:items-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'} ${i > 0 ? "mt-6 sm:mt-8" : ""} px-4 lg:px-0`}
                    variants={phaseFade}
                    custom={i}
                  >
                    
                    {/* Timeline Dot (Mobile) */}
                    <div className="flex-shrink-0 w-6 h-6 mr-4 lg:hidden z-20">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white/40"></div>
                    </div>

                    {/* Timeline Dot (Desktop - absolute positioning at center line) */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 z-20 top-0 lg:top-auto"> 
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white/40"></div>
                    </div>

                    
                    {/* Content Block */}
                    
                    {/* For odd indices (1, 3, ...), place an empty div first to push content right */}
                    {!isEven && <div className="hidden lg:block lg:w-1/2"></div>}
                    
                    <div 
                      // Alternating text alignment for desktop layout
                      className={`lg:w-1/2 w-full lg:px-16 text-left ${!isEven ? 'lg:text-right' : 'lg:text-left'}`}
                    >
                      <h2 className="gradient-text capitalize subtitle switzer text-xl sm:text-2xl lg:text-[36px] mb-3"> 
                        {phase.title}
                      </h2>
                      <ul 
                        // Adjust list alignment based on content alignment
                        className={`list-disc text-gray-300 text-sm sm:text-base leading-relaxed space-y-1 ${!isEven ? 'lg:pr-5' : 'ml-5'}`}
                        style={{ listStylePosition: !isEven ? 'inside' : 'outside' }}
                      > 
                        {phase.items.map((item, idx) => (
                          <li key={idx} className="marker:text-yellow-400">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* For even indices (0, 2, ...), place an empty div last to push content left */}
                    {isEven && <div className="hidden lg:block lg:w-1/2"></div>}
                    
                  </motion.div>
              )
            })}
              </motion.div>
          
        </motion.section>
      </div>
    </>
  );
};

export default Roadmap;