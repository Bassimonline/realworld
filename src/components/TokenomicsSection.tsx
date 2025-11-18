import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from "../images/logo-rt.png"
import { Player } from "@lottiefiles/react-lottie-player";
import icon_31 from "../images/icon_31.json";

<motion.h3
  className="uppercase text-center lg:text-[16px] mb-3 text-gradient flex items-center justify-center gap-2"
>
  <Player
    autoplay
    loop
    src={icon_31}
    className="w-6 h-6" // Adjust size as needed
    style={{ transform: 'translateY(1px)' }} // Fine-tune vertical alignment
  />
  $TRW Tokens
</motion.h3>
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

  const btnVariants = {
    initial: { scale: 1 },
    animate: { scale: 1 },
    tap: { scale: 0.95 }
  };

  return (
    <div style={{ marginTop: "5%" }} className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
     <motion.h3
  className="uppercase text-center lg:text-[16px] mb-3 text-gradient flex items-center justify-center gap-2"
>
  <Player
    autoplay
    loop
    src={icon_31}
    className="w-6 h-6" // Adjust size as needed
    style={{ transform: 'translateY(1px)' }} // Fine-tune vertical alignment
  />
  $TRW Tokens
</motion.h3>
      <motion.h2
        className="text-center text-4xl md:text-5xl font-bold mb-16 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Token
        </span>{" "}
        Allocation
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tokenomicsData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item.delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700/50 relative overflow-hidden group"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

            {/* Icon container */}
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/20">
                {React.cloneElement(item.icon, { className: "w-5 h-5 text-white" })}
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  {item.subtitle && (
                    <p className="text-sm text-gray-400 mt-1">{item.subtitle}</p>
                  )}
                </div>
                <span style={{ color: "white" }} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                  {item.percentage}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-2">Allocation Amount</p>
                <p className="text-xl font-mono font-bold text-white">{item.amount}</p>
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-2 bg-gray-700 rounded-full overflow-hidden">
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

      {/* Pie Chart Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex flex-col items-center"
      >
        {/* <div className="relative w-64 h-64 sm:w-80 sm:h-80"> */}
        {/* <svg viewBox="0 0 100 100" className="w-full h-full">
          
            {tokenomicsData.map((item, index) => {
              const startAngle = tokenomicsData
                .slice(0, index)
                .reduce((acc, curr) => acc + (parseInt(curr.percentage, 10) / 100) * 360, 0);
              const endAngle = startAngle + (parseInt(item.percentage, 10) / 100) * 360;
              const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
              const startX = 50 + 50 * Math.cos(toRad(startAngle));
              const startY = 50 + 50 * Math.sin(toRad(startAngle));
              const endX = 50 + 50 * Math.cos(toRad(endAngle));
              const endY = 50 + 50 * Math.sin(toRad(endAngle));
              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

              return (
                <motion.path
                  key={index}
                  d={`
              M50,50 
              L${startX},${startY} 
              A50,50 0 ${largeArcFlag},1 ${endX},${endY} 
              Z
            `}
                  fill={item.color}
                  stroke="#0a0a0a"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: 0.9 + index * 0.1,
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                />
              );
            })}

            <circle cx="50" cy="50" r="30" fill="#0a0a0a" />

            
            <foreignObject x="25" y="25" width="50" height="50">
              <div className="w-full h-full flex items-center justify-center">
           
                <div className="w-10 h-10 sm:w-12 sm:h-12">
                  <img
                    src={logo}
                    alt="Token Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </foreignObject>

         
          </svg> */}
        {/* </div> */}

        {/* Legend - unchanged from your original */}
        {/* <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
          {tokenomicsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              className="flex items-center px-4 py-2 bg-gray-800/50 rounded-lg backdrop-blur-sm"
            >
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{ background: item.color }}
              />
              <div>
                <span className="text-white text-sm font-medium">{item.title}</span>
                <span className="block text-yellow-400 text-xs">{item.percentage}</span>
              </div>
            </motion.div>
          ))}
        </div> */}
      </motion.div>
    </div>
  );
};

export default TokenomicsSection;