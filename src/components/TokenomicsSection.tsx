import React from 'react';
import { motion } from 'framer-motion';
// Link is not used, so we remove the import
// import { Link } from 'react-router-dom'; 
// logo is not used in the final version, so we remove the import
// import logo from "../images/logo-rt.png" 
import { Player } from "@lottiefiles/react-lottie-player";
import icon_31 from "../images/icon_31.json";

import {
  Coins,
  Users,
  Waves,
  RefreshCw,
  Megaphone,
  Banknote
} from 'lucide-react';

const TokenomicsSection = () => {
  const tokenomicsData = [
    {
      title: "Presale",
      percentage: "30%",
      amount: "300,000,000",
      color: "#f0b90b",
      icon: <Coins className="w-5 h-5" />,
      delay: 0.1
    },
    {
      title: "Tate Team",
      percentage: "15%",
      amount: "150,000,000",
      color: "#00c4cc",
      icon: <Users className="w-5 h-5" />,
      delay: 0.2
    },
    {
      title: "Liquidity",
      percentage: "15%",
      amount: "150,000,000",
      color: "#a855f7",
      icon: <Waves className="w-5 h-5" />,
      delay: 0.3,
      subtitle: "DEX/CEX"
    },
    {
      title: "Ecosystem",
      percentage: "20%",
      amount: "200,000,000",
      color: "#3b82f6",
      icon: <RefreshCw className="w-5 h-5" />,
      delay: 0.4,
      subtitle: "Rewards"
    },
    {
      title: "Marketing",
      percentage: "10%",
      amount: "100,000,000",
      color: "#ec4899",
      icon: <Megaphone className="w-5 h-5" />,
      delay: 0.5,
      subtitle: "Partners"
    },
    {
      title: "Reserve",
      percentage: "10%",
      amount: "100,000,000",
      color: "#f97316",
      icon: <Banknote className="w-5 h-5" />,
      delay: 0.6,
      subtitle: "Treasury"
    },
  ];

  // Removed unused btnVariants

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8"> {/* Reduced vertical padding (py-16 -> py-10) */}
      {/* The Lottie animation and text block you provided */}
      <motion.h3
        className="uppercase text-center lg:text-[16px] mb-2 text-gradient flex items-center justify-center gap-2" // Reduced bottom margin (mb-3 -> mb-2)
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Player
          autoplay
          loop
          src={icon_31}
          className="w-5 h-5" // Reduced Lottie size
          style={{ transform: 'translateY(1px)' }}
        />
        $TRW Tokens
      </motion.h3>

      <motion.h2
        className="text-center text-3xl md:text-4xl font-bold mb-10 text-white" // Reduced font size and bottom margin (mb-16 -> mb-10)
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Token
        </span>{" "}
        Allocation
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Reduced gap (gap-8 -> gap-6) */}
        {tokenomicsData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item.delay }}
            whileHover={{ y: -3, scale: 1.01 }} // Subtle hover effect
            className="bg-gray-900/70 rounded-xl p-4 shadow-xl border border-gray-700/50 relative overflow-hidden group backdrop-blur-sm" // Reduced padding (p-6 -> p-4)
          >
            {/* Animated gradient border and Glow effect kept */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

            <div className="relative z-10">
              
              {/* COMBINED Title, Subtitle, and Percentage on one line for compactness */}
              <div className="flex justify-between items-center mb-4"> {/* Added margin-bottom */}
                <div className="flex items-center gap-3">
                  {/* Icon container (Reduced size) */}
                  <div className="w-8 h-8 rounded-md flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-md shadow-yellow-500/20">
                    {React.cloneElement(item.icon, { className: "w-4 h-4 text-white" })}
                  </div>
                  
                  <div>
                    <h3 className="text-base font-semibold text-white leading-none">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs text-gray-400 leading-none mt-0.5">{item.subtitle}</p>
                    )}
                  </div>
                </div>

                <span className="text-lg font-bold text-yellow-400"> {/* Smaller percentage font size */}
                  {item.percentage}
                </span>
              </div>

              {/* Allocation Amount */}
              <div className="mt-2"> {/* Reduced margin (mt-6 -> mt-2) */}
                <p className="text-xs text-gray-400 mb-1">Total Allocation</p>
                <p className="text-base font-mono font-bold text-white">{item.amount}</p> {/* Reduced amount font size */}
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 bg-gray-700 rounded-full overflow-hidden"> {/* Reduced margin (mt-6 -> mt-4) and height (h-2 -> h-1.5) */}
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                  initial={{ width: 0 }}
                  animate={{ width: item.percentage }}
                  transition={{ delay: item.delay + 0.2, duration: 1, type: "spring" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Removed the entire large commented-out Pie Chart Visualization block */}
    </div>
  );
};

export default TokenomicsSection;