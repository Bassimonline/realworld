import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiPenTool, FiCode } from 'react-icons/fi'; // only three icons now

const GetAccess: React.FC = () => {
  // Assign the actual icon component to each step
  const processSteps = [
    {
      step: "01",
      icon: FiSearch,
      title: "100+ Courses",
      description: "Unlock 100+ on-demand video courses and comprehensive tutorials—master everything from core business principles to specialized income-boosting tactics."
    },
    {
      step: "02",
      icon: FiPenTool,
      title: "Live Session",
      description: "Each of our instructors has personally applied these strategies to generate over $1 million in real-world profits."
    },
    {
      step: "03",
      icon: FiCode,
      title: "Community with 113K+",
      description: "Our online community is a supportive, high-focus environment. Everyone is on the same mission: acquiring an abundance of wealth."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="text-center mb-12 md:mb-20"
>
  <span
    style={{ color: "white" }}
    className="inline-block mb-3 text-sm font-semibold tracking-widest text-cyan-400 uppercase"
  >
    Access
  </span>
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
      You will&nbsp;
    </span>
    <span className="text-white">get access to:</span>
  </h2>
</motion.div>


        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Progress Line (optional) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-full" />

          {/* Updated to 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Step Indicator */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center bg-gray-900 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-lg z-10 group-hover:bg-cyan-400 group-hover:text-gray-900 transition-all duration-300 shadow-lg shadow-cyan-400/20">
                    {step.step}
                  </div>

                  {/* Process Card */}
                  <div className="h-full bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-400/10">
                    <div className="flex flex-col items-center text-center">
                      {/* Icon */}
                      <div  className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-full mb-5 text-cyan-400 text-2xl group-hover:bg-cyan-400/10 transition-all duration-300">
                        <IconComponent />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetAccess;
