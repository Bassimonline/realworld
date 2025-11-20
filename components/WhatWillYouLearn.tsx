import React from "react";
import { motion } from "framer-motion";
import ecom from "../images/ecom.jpeg"
import stocks from "../images/stocks.jpeg"
import business from "../images/business.jpeg"
import crypto from "../images/crypto.jpeg"
import ai from "../images/AI.jpeg"

const WhatYoullLearn: React.FC = function () {
  const learningCards = [
    {
      title: "E-COMMERCE",
      description: "Launch a high-margin online business with step-by-step coaching from top e-commerce veterans—learn how to spot breakout products, build a conversion-optimized store, and drive targeted traffic that converts.",
      image: ecom,
      color: "from-purple-600 to-indigo-600",
      icon: "🔗"
    },
    {
      title: "STOCKS",
      description: "Supercharge your wealth in the stock market—our expert-led course teaches you proven technical analysis techniques to spot trades with outsized upside and controlled risk.",
      image: stocks,
      color: "from-amber-500 to-yellow-500",
      icon: "💰"
    },
    {
      title: "BUSINESS & FINANCE",
      description: "Master the fundamental skills of business. We'll teach you every skill the hyper successful entrepreneur of tomorrow needs to master.",
      image: business,
      color: "from-emerald-500 to-teal-500",
      icon: "🖼️"
    },
    {
      title: "CRYPTO INVESTING",
      description: "Capitalize on crypto’s top performers—our strategy covers long-term holds, medium-term swings, and short-term scalps for maximum gains.",
      image: crypto,
      color: "from-red-500 to-pink-500",
      icon: "🔒"
    },
    {
      title: "CYRPTO TRADING",
      description: "Harness the power of digital assets: learn to trade with three timeframes—HODL for the long haul, swing trade mid-cycle, and scalp intraday opportunities..",
      image: crypto,
      color: "from-blue-500 to-cyan-500",
      icon: "🏛️"
    },
    {
      title: "CONTENT CREATION & AI",
      description: "We live in a digital age. There are websites worth more than skyscrapers. Videos worth more than houses. We will teach youhow to create valuable digital assets and how to sell them.",
      image: ai,
      color: "from-violet-500 to-purple-500",
      icon: "👨‍💻"
    }
  ];

  return (
    <section className="w-full py-20 bg-[#000000]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="text-4xl md:text-5xl font-bold mb-4"
>
  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
    What
  </span>
  <span className="text-white"> You’ll Learn</span>
</motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Comprehensive crypto education covering the most valuable skills in Web3
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-all duration-500 blur-xl" />
              
              <div className="relative h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 group-hover:border-amber-400/30 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-70`} />
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/70 flex items-center justify-center text-2xl backdrop-blur-sm">
                    {card.icon}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${card.color} mr-2`}></span>
                    {card.title}
                  </h3>
                  <p className="text-gray-300 mb-5">{card.description}</p>
                  
                
                </div>
                
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYoullLearn;