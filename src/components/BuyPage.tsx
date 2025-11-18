import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket, Star, ShoppingCart, ArrowLeft, Clock, Zap, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import icon_31 from "../images/icon_31.json";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const PreSale = () => {
  const navigate = useNavigate();
  const defaultSOLAmount = "0.2";
  const defaultRate = 100 * 100;

  const [amount, setAmount] = useState(defaultSOLAmount);
  const [tokenAmount, setTokenAmount] = useState(
    (parseFloat(defaultSOLAmount) * defaultRate).toLocaleString("en-US", { maximumFractionDigits: 0 })
  );
  const [error, setError] = useState<string | null>(null);

  const calculateTokens = (solAmount: string) => {
    if (!solAmount || isNaN(Number(solAmount))) return "0";
    return (Number(solAmount) * defaultRate).toLocaleString("en-US", { maximumFractionDigits: 0 });
  };

  const [quickValue, setQuickValue] = useState<number>(5);

  // Removed the effect that overwrote amount with quickValue on mount,
  // so the input stays prefilled at 0.2 until the user moves the slider.

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setTokenAmount(calculateTokens(value));
    if (error) setError(null);
  };

  const handleBlur = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value < 0.2) {
      setError("Amount must be at least 0.2");
      setAmount(defaultSOLAmount);
      setTokenAmount(calculateTokens(defaultSOLAmount));
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const SALE_END_DATE = new Date('2025-09-12T23:59:59Z');

    const tick = () => {
      const now = new Date();
      const diff = SALE_END_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Run once immediately so it doesn't wait for 1 second
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);
  // ========================================================================

  const handleProceedToPayment = () => {
    const solValue = parseFloat(amount);
    if (isNaN(solValue)) {
      setError("Please enter a valid amount");
      return;
    }
    if (solValue < 0.2) {
      setError("Minimum purchase is 0.2 SOL");
      return;
    }

    const baseTokens = Number(tokenAmount.replace(/,/g, ""));
    const bonusPercentage = solValue >= 5 ? 0.35 : solValue >= 1 ? 0.1 : 0;

    const bonusTokens = Math.floor(baseTokens * bonusPercentage);
    const totalTokens = baseTokens + bonusTokens;

    sessionStorage.setItem(
      "paymentDetails",
      JSON.stringify({
        solAmount: amount,
        baseTokenAmount: baseTokens.toLocaleString(),
        bonusTokenAmount: bonusTokens.toLocaleString(),
        totalTokenAmount: totalTokens.toLocaleString(),
      })
    );

    navigate("/waiting");
  };

  const benefits = [
    {
      icon: <Rocket className="h-6 w-6 text-purple-400" />,
      title: "Early Access",
      description: "Get in early with pre-launch pricing before exchange listing",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-400" />,
      title: "35% Bonus",
      description: "Purchase 5+ SOL to receive 35% bonus tokens",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-400" />,
      title: "10% Bonus",
      description: "Purchase 1+ SOL to receive 10% bonus tokens",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-green-400" />,
      title: "Limited Supply",
      description: "Only 40% of total supply available during presale",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div style={{ backgroundColor: "black" }} className="min-h-screen bg-gradient-to-br">
      {/* Header */}



   <div className="max-w-[1236px] mx-auto flex flex-col items-center z-50 relative">
        <motion.h3
          className="uppercase  text-center  lg:text-[16px] mb-3 text-gradient"

        >
          🚀Buy $TRW
        </motion.h3>
        <motion.h2
          className="mb-8 text-center lg:px-4 max-w-[668px] capitalize switzer tracking-[-1px] lg:tracking-[-3px] !text-[44px] lg:!text-[55px]"

        >
          <span className="texture-text">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Buy Some
            </span>{" "}
            $TRW
          </span>
        </motion.h2>

      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bonus Tier Section */}
        <div className="bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-gray-900/50 rounded-2xl shadow-2xl overflow-hidden border border-yellow-500/30 mb-8 backdrop-blur-sm">
          <div className="p-4 sm:p-6">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                    <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Bonus</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div
                    className={`p-1.5 rounded-md ${
                      Number(amount) >= 5
                        ? "bg-purple-500/10 border border-purple-500/30"
                        : Number(amount) >= 1
                        ? "bg-orange-500/10 border border-orange-500/30"
                        : "bg-gray-800/70 border border-gray-700"
                    }`}
                  >
                    <Zap
                      className={`h-4 w-4 ${
                        Number(amount) >= 5
                          ? "text-purple-400"
                          : Number(amount) >= 1
                          ? "text-orange-400"
                          : "text-gray-500"
                      }`}
                      fill="currentColor"
                    />
                  </div>
                  <span
                    className={`text-base font-bold ${
                      Number(amount) >= 5
                        ? "text-purple-400"
                        : Number(amount) >= 1
                        ? "text-orange-400"
                        : "text-gray-500"
                    }`}
                  >
                    {Number(amount) >= 5 ? "35%" : Number(amount) >= 1 ? "10%" : "0%"}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      Number(amount) >= 1
                        ? "bg-green-900/50 text-green-300 border border-green-500/30"
                        : "bg-gray-800/70 text-gray-500 border border-gray-700"
                    }`}
                  >
                    1 SOL = 10 %
                  </span>
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      Number(amount) >= 5
                        ? "bg-purple-900/50 text-purple-300 border border-purple-500/30"
                        : "bg-gray-800/70 text-gray-500 border border-gray-700"
                    }`}
                  >
                    5 SOL = 35 %
                  </span>
                </div>

                <div className="relative h-2 bg-gray-800/70 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-0 rounded-full ${
                      Number(amount) >= 5 ? "bg-purple-500/20" : "bg-orange-500/20"
                    } blur-sm`}
                  ></div>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(100, (Number(amount) / 5) * 100)}%`,
                      background:
                        Number(amount) >= 5
                          ? "linear-gradient(90deg, rgba(168,85,247,0.8) 0%, rgba(236,72,153,0.8) 100%)"
                          : "linear-gradient(90deg, rgba(249,115,22,0.8) 0%, rgba(234,179,8,0.8) 100%)",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                  <Star className="h-6 w-6 text-yellow-400" fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Bonus <span className="mobile-view-result"> {Number(amount) >= 5 ? "20%" : Number(amount) >= 1 ? "10%" : "0%"}</span>{" "}
                    <span className="bonus-main-heading">Tiers</span>
                  </h3>
                  <p className="text-yellow-200/80 text-sm bonus-sub-heading">Unlock higher rewards with larger purchases</p>
                </div>
              </div>

              <div className="flex-1 w-full max-w-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${Number(amount) >= 1 ? "bg-green-900/50 text-green-300 border border-green-500/30" : "bg-gray-800/70 text-gray-500 border border-gray-700"}`}>
                    1 SOL → 10%
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${Number(amount) >= 5 ? "bg-purple-900/50 text-purple-300 border border-purple-500/30" : "bg-gray-800/70 text-gray-500 border border-gray-700"}`}>
                    5 SOL → 35%
                  </span>
                </div>

                <div className="relative h-2.5 bg-gray-800/70 rounded-full overflow-hidden">
                  <div className={`absolute inset-0 rounded-full ${Number(amount) >= 5 ? "bg-purple-500/20" : "bg-orange-500/20"} blur-sm`}></div>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(100, (Number(amount) / 5) * 100)}%`,
                      background:
                        Number(amount) >= 5
                          ? "linear-gradient(90deg, rgba(168,85,247,0.8) 0%, rgba(236,72,153,0.8) 100%)"
                          : "linear-gradient(90deg, rgba(249,115,22,0.8) 0%, rgba(234,179,8,0.8) 100%)",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    Number(amount) >= 5
                      ? "bg-purple-500/10 border icon-bonus border-purple-500/30"
                      : Number(amount) >= 1
                      ? "bg-orange-500/10 border border-orange-500/30"
                      : "bg-gray-800/70 border border-gray-700"
                  }`}
                >
                  <Zap
                    className={`h-5 w-5 ${
                      Number(amount) >= 5 ? "text-purple-400 icon-bonus" : Number(amount) >= 1 ? "text-orange-400" : "text-gray-500"
                    }`}
                    fill="currentColor"
                  />
                </div>
                <div className="your-bonus">
                  <p className="text-xs text-gray-400">Your Bonus</p>
                  <p
                    className={`text-lg font-bold ${
                      Number(amount) >= 5 ? "text-purple-400" : Number(amount) >= 1 ? "text-orange-400" : "text-gray-500"
                    }`}
                  >
                    {Number(amount) >= 5 ? "35%" : Number(amount) >= 1 ? "10%" : "0%"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Purchase Card */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 rounded-2xl shadow-2xl overflow-hidden border border-gray-800/50 backdrop-blur-sm">
            <div className="p-6 border-b border-gray-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Purchase $TRW</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-300 text-sm">Presale Price:</span>
                    <span className="text-white font-medium">1 SOL = {defaultRate.toLocaleString()} $TRW</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg">
                  <Player autoplay loop src={icon_31} className="w-10 h-10" style={{ transform: "translateY(1px)" }} />
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Input field for custom amount */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-300 text-sm font-medium">Amount in SOL</label>
                  <div className="flex items-center space-x-1 bg-gray-800/50 px-2 py-1 rounded-md border border-gray-700/50">
                    <Clock className="h-3 w-3 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">Last buy: 2 min ago</span>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="0.2"
                    step="0.1"
                    value={amount}
                    onChange={handleAmountChange}
                    onBlur={handleBlur}
                    placeholder="Enter amount"
                    className={`
                      w-full
                      bg-gray-800/70
                      border ${error ? "border-red-500/80" : "border-gray-700/50"}
                      rounded-t-xl
                      rounded-b-none
                      py-3 px-4
                      text-white
                      focus:outline-none
                      focus:ring-2 focus:ring-orange-500/50 focus:border-transparent
                      transition-all
                      placeholder-gray-500
                    `}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 font-medium">SOL</span>
                </div>

                {/* dynamic small timer */}
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-b-lg border border-gray-700/50">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-gray-300 whitespace-nowrap">
                    Token sale Ends in:{" "}
                    <span className="font-medium text-white">
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </span>
                  </span>
                </div>
                {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
              </div>

              {/* Slider for quick selection */}
              <div style={{ marginTop: "8%" }} className="mt-4 mb-6">
                <label htmlFor="quick-slider" className="block text-gray-400 text-sm font-medium mb-2">
                  Quick select:
                </label>

                <input
                  id="quick-slider"
                  type="range"
                  min={5}
                  max={20}
                  step={5}
                  value={quickValue}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setQuickValue(value);
                    setAmount(value.toString());
                    setTokenAmount(calculateTokens(value.toString()));
                  }}
                  className="
                    w-full h-2
                    bg-gray-800/70 rounded-lg
                    accent-orange-500 transition-all focus:outline-none
                  "
                />

                <div className="flex justify-between text-gray-500 text-xs mt-3">
                  {[5, 10, 15, 20].map((v) => (
                    <div key={v} className="relative flex flex-col items-center">
                      {v === 10 && (
                        <span
                          style={{ marginTop: "100%" }}
                          className="absolute -top-5 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10"
                        >
                          Popular
                        </span>
                      )}
                      <span>{v} SOL</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Token Calculation */}
              <div className="mt-6 lg:mt-8 bg-gray-800/30 rounded-xl p-4 mb-6 border border-gray-700/50 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-colors">
                    <div className="flex flex-col items-center h-full justify-between">
                      <span className="text-xs font-medium text-gray-400 mb-1">YOU RECEIVE</span>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-lg font-bold text-white">{tokenAmount}</span>
                          <span className="text-base font-medium text-green-400">$TRW</span>
                        </div>
                        <div className="mt-1 text-xs text-green-300/80">{defaultRate.toLocaleString()} $TRW per SOL</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/50 hover:border-yellow-500/30 transition-colors">
                    <div className="flex flex-col items-center h-full justify-between">
                      {/* Label + Tier */}
                      <div className="flex items-center space-x-1">
                        <span className="text-xs font-medium text-gray-400">BONUS</span>
                        {Number(amount) >= 1 && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              Number(amount) >= 5 ? "bg-purple-900/30 text-purple-300" : "bg-orange-900/30 text-orange-300"
                            }`}
                          >
                            {Number(amount) >= 5 ? "35%" : "10%"}
                          </span>
                        )}
                      </div>

                      {/* Amount of bonus tokens */}
                      <div className="flex items_center justify-center space-x-1 mt-1">
                        <span className="text-lg font-bold text-yellow-300">
                          +
                          {Math.floor(
                            Number(tokenAmount.replace(/,/g, "")) * (Number(amount) >= 5 ? 0.35 : 0.1)
                          ).toLocaleString()}
                        </span>
                        <span className="text-base font-medium text-yellow-200">$TRW</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4 px-5 bg-gray-800/30 rounded-xl mb-6 border border-gray-700/50">
                <div>
                  <span className="text-gray-300 font-medium">Total Tokens</span>
                  <p className="text-gray-500 text-sm">Including bonus</p>
                </div>
                <span className="text-white font-bold text-2xl">
                  {Math.floor(
                    Number(tokenAmount.replace(/,/g, "")) * (1 + (Number(amount) >= 5 ? 0.35 : Number(amount) >= 1 ? 0.1 : 0))
                  ).toLocaleString()}{" "}
                  $TRW
                </span>
              </div>

              {/* Info Box */}
              <div className="bg-[#111] p-3 sm:p-4 rounded-lg border border-[#f0b90b]/20 flex items-start mb-6">
                <div className="text-[#f0b90b] mr-2 sm:mr-3 mt-0.5">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Tokens will be automatically distributed to your wallet immediately after payment confirmation. No manual claiming required.
                </p>
              </div>

              {/* Proceed Button */}
              <motion.button
                onClick={handleProceedToPayment}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                Proceed to Payment
              </motion.button>

              <p className="text-gray-500 text-xs mt-4 text-center">
                By proceeding, you agree to our{" "}
                <a href="#" className="text-orange-400 hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            {/* Mobile-only Roadmap Section */}
            <div className="lg:hidden max-w-[1236px] mx-auto flex flex-col items-center z-50 relative">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  {/* 3D Icon added here */}
                  <Player autoplay loop src={icon_31} className="w-10 h-10 mr-3 sm:mr-4" style={{ marginTop: "-115%", marginLeft: "-29%" }} />
                  <motion.h2 className="mb-2 text-center capitalize switzer tracking-[-1px] lg:tracking-[-3px] text-3xl sm:text-4xl md:text-[44px] lg:text-[55px]">
                    <span className="texture-text flex flex-col sm:block">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">$TRW Launches</span>
                      <span className="sm:inline-block mt-1 sm:mt-0 sm:ml-2">at $0.25</span>
                    </span>
                  </motion.h2>
                </div>

                <motion.h3 className="uppercase text-center lg:text-[16px] mb-3 text-gradient leading-tight sm:leading-normal mt-2 sm:mt-0">
                  <span className="inline-block">
                    Real opportunities don't wait. $TRW enters the market at just $0.25,<br className="hidden sm:block" />
                    your chance to escape the matrix now!
                  </span>
                </motion.h3>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 rounded-2xl shadow-xl overflow-hidden border border-gray-800/50 backdrop-blur-sm">
              <div className="p-6 border-b border-gray-800/50">
                <h3 className="text-xl font-bold text-white mb-2">Presale Benefits</h3>
                <p className="text-gray-400 text-sm">Why participate in our token presale</p>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -3 }}
                      className={`p-4 rounded-lg border ${benefit.bgColor} border-gray-700/50 hover:border-orange-500/30 transition-all`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-md ${benefit.bgColor}`}>{benefit.icon}</div>
                        <div>
                          <h4 style={{ fontSize: "1.5rem" }} className="text-white font-medium">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">{benefit.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 rounded-2xl shadow-xl overflow-hidden border border-gray-800/50 backdrop-blur-sm">
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreSale;
