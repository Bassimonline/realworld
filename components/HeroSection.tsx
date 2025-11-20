import React from "react";
import logo from "../images/logo-rt.png";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

import icon_3 from "../images/icon_3.json";
import icon_31 from "../images/icon_31.json";

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#000000]">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="flex flex-col items-center gap-8 md:gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">

          {/* Image Section */}
          <div className="relative w-full lg:w-3/5 xl:w-1/2 order-1 ml-[5%]">
            {/* Removed aspect ratio + overflow-hidden */}
            <div className="relative overflow-visible rounded-xl flex justify-center items-center">
              <Player
                autoplay
                loop
                src={icon_3}
                className="w-[80%] max-w-[380px] h-auto"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex w-full flex-col justify-center lg:w-3/5 xl:w-1/2 order-2 lg:pl-8 xl:pl-12 mr-[8%]">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] font-medium leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  A MASSIVE
                </span>
                <span className="text-white"> UPGRADE</span>
              </h1>
              <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-normal text-gray-300">
                The modern education system is designed to make you poor.
              </h2>
              <div className="mt-4 sm:mt-6 max-w-md mx-auto lg:mx-0">
                <p className="text-gray-400 text-base sm:text-lg">
                  Imagine you could get access to multi-millionaire mentors who will give you a step-by-step path to reach your goals as fast as possible...
                </p>
                <p className="mt-2 sm:mt-3 text-white font-medium">
                  That's exactly what you can find inside THE REAL WORLD.
                </p>
                <p className="mt-2 sm:mt-3 text-gray-400 italic">
                  Ready to transform your life?
                </p>
              </div>
              {/* Button Container */}
              {/* <div className="mt-6 sm:mt-8">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
                  <button className="get-started-buy w-full sm:w-fit rounded-lg bg-gradient-to-r from-[#f0b90b] to-[#f8d030] px-6 py-3 text-sm sm:text-base font-medium text-black transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#f0b90b] focus:ring-offset-2 focus:ring-offset-black">
                    <Link to="/">Get Started</Link>
                  </button>
                  <button className="learn-more-buy w-full sm:w-fit rounded-lg border border-[#f0b90b]/50 bg-transparent px-6 py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-[#f0b90b]/10 hover:border-[#f0b90b]/70 focus:outline-none focus:ring-2 focus:ring-[#f0b90b] focus:ring-offset-2 focus:ring-offset-black">
                    <Link to="/">Learn More</Link>
                  </button>
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>

      {/* Decorative backgrounds */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#f0b90b]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#f0b90b]/5 blur-3xl" />
    </section>
  );
};

export default HeroSection;
