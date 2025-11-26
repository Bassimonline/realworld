import React from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

// Change: Import the video file instead of the image

import videoSrc from "../newVideo/Globe_360_animation_fast_v2_WebM 2.webm";



const LiveSession: React.FC = () => {

  const stats = [

    { value: 240, suffix: '+', label: 'Projects success rate 99%' },

    { value: 23, suffix: '+', label: 'Award for digital innovation' },

    { value: 24, suffix: '+', label: 'Years On The Market' }

  ];



  return (

    <section style={{ backgroundColor: "black" }} className="relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-36 overflow-hidden">

      {/* Glow effects */}

      <div className="absolute inset-0 overflow-hidden opacity-20">

        <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>

        <div className="absolute bottom-1/3 -right-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>

      </div>



      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 items-center">

          {/* Content Column */}

          <motion.div

            className="lg:w-1/2 order-2 lg:order-1"

            initial={{ opacity: 0, x: -20 }}

            whileInView={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.8 }}

            viewport={{ once: true }}

          >

            <div className="max-w-lg mx-auto lg:mx-0">

              <motion.span

                className="inline-block mb-3 sm:mb-4 text-xs sm:text-sm font-medium tracking-widest text-cyan-400 uppercase"

                initial={{ opacity: 0, y: 10 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5, delay: 0.2 }}

                viewport={{ once: true }}

                style={{color:"white"}}

              >

                Achieve your goals

              </motion.span>



          <motion.h2

  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6"

  initial={{ opacity: 0, y: 10 }}

  whileInView={{ opacity: 1, y: 0 }}

  transition={{ duration: 0.5, delay: 0.3 }}

  viewport={{ once: true }}

>

  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">

    Daily Live Sessions

  </span>

  <span className="text-white"> With Millionaire Coaches</span>

</motion.h2>





              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-gray-300">

                <motion.p

                  className="text-base sm:text-lg leading-relaxed"

                  initial={{ opacity: 0, y: 10 }}

                  whileInView={{ opacity: 1, y: 0 }}

                  transition={{ duration: 0.5, delay: 0.4 }}

                  viewport={{ once: true }}

                >

                  Every instructor in our program has personally generated over $1 million in profit using the exact methods they teach.

                </motion.p>

                <motion.p

                  className="text-base sm:text-lg leading-relaxed"

                  initial={{ opacity: 0, y: 10 }}

                  whileInView={{ opacity: 1, y: 0 }}

                  transition={{ duration: 0.5, delay: 0.5 }}

                  viewport={{ once: true }}

                >

                  Our team comprises driven, seasoned professionals who deliver structured coursework, fresh daily lessons, and ongoing mentorship to support you throughout your entrepreneurial journey.

                </motion.p>

              </div>



              <motion.div

                initial={{ opacity: 0, y: 10 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5, delay: 0.9 }}

                viewport={{ once: true }}

              >

                <Link

                  to="https://www.jointherealworld.com"

                  className="relative inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3.5 overflow-hidden font-medium group"

                >

                  <span className="absolute inset-0 bg-gradient-to-r from-[#f0b90b] to-[#f8d030] opacity-90 group-hover:opacity-100 transition-all duration-300"></span>

                  <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 bg-white opacity-5 group-hover:h-full"></span>

                  <span style={{borderRadius:"20%"}} className="relative rounded flex items-center text-sm sm:text-base text-black group-hover:translate-x-1 transition-transform duration-200">

                    LEARN MORE

                    <svg

                      className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2"

                      fill="none"

                      stroke="currentColor"

                      viewBox="0 0 24 24"

                      xmlns="http://www.w3.org/2000/svg"

                    >

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>

                    </svg>

                  </span>

                </Link>

              </motion.div>

            </div>

          </motion.div>



          {/* Image/Video Column */}

          <motion.div

            className="lg:w-1/2 relative order-1 lg:order-2 w-full mb-8 lg:mb-0"

            initial={{ opacity: 0, x: 20 }}

            whileInView={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.8 }}

            viewport={{ once: true }}

          >

            <div className="relative h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] rounded-xl overflow-hidden">

              {/* Change: Replaced <img> with <video> and added necessary attributes */}

              <video

                src={videoSrc}

                autoPlay

                loop

                muted

                playsInline // Recommended for mobile playback

                className="absolute inset-0 w-full h-full object-cover"

                // Consider adding a 'poster' attribute for when the video is loading or unsupported, e.g., poster="path/to/poster-image.jpg"

              >

                Your browser does not support the video tag.

              </video>

            </div>

          </motion.div>

        </div>

      </div>

    </section>

  );

};



export default LiveSession;