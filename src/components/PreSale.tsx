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
  const defaultRate = 100 * 100; // 10,000 TRW per SOL

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
    // Note: The date is set far in the future (Jan 5, 2026) in the original code.
    const SALE_END_DATE = new Date("2025-12-16T23:59:59Z"); 
    const tick = () => {
      // Create a UTC time object for consistent calculation
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
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
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

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
    const orderId = `#${Math.floor(10000 + Math.random() * 90000)}`;

    const details = {
      solAmount: amount,
      baseTokenAmount: baseTokens.toLocaleString("en-US"),
      bonusTokenAmount: bonusTokens.toLocaleString("en-US"),
      totalTokenAmount: totalTokens.toLocaleString("en-US"),
      orderId,
    };

    sessionStorage.setItem("paymentDetails", JSON.stringify(details));
    navigate("/waiting", { state: details });
  };

  const numericAmount = Number(amount);
  const baseTokensNum = Number(tokenAmount.replace(/,/g, ""));
  const bonusPct = numericAmount >= 5 ? 0.35 : numericAmount >= 1 ? 0.1 : 0;
  const bonusTokens = Math.floor(baseTokensNum * bonusPct);
  const totalTokens = baseTokensNum + bonusTokens;

  const benefits = [
    { icon: <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />, title: "Early Access", description: "Get in early with pre-launch pricing", bgColor: "bg-purple-500/10" },
    { icon: <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />, title: "35% Bonus", description: "Purchase 5+ SOL to receive 35% bonus", bgColor: "bg-yellow-500/10" },
    { icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />, title: "10% Bonus", description: "Purchase 1+ SOL to receive 10% bonus", bgColor: "bg-orange-500/10" },
    { icon: <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />, title: "Limited Supply", description: "Only 40% available during presale", bgColor: "bg-green-500/10" },
  ];

  return (
    <div style={{ backgroundColor: "black" }} className="min-h-screen bg-gradient-to-br">
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              <span className="text-white font-medium text-sm sm:text-base">Back</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700">
                <Clock className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-gray-300">Ends in {timeLeft.days}d {timeLeft.hours}h</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
          
          {/* Purchase Card (Column 1) */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 rounded-2xl shadow-2xl overflow-hidden border border-gray-800/50 backdrop-blur-sm">
            {/* Reduced padding from p-6 to p-4 on mobile */}
            <div className="p-4 sm:p-6 border-b border-gray-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Purchase $TRW</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-300 text-xs sm:text-sm">Presale Price:</span>
                    <span className="text-white text-xs sm:text-sm font-medium">1 SOL = {defaultRate.toLocaleString()} $TRW</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg">
                  <Player autoplay loop src={icon_31} className="w-8 h-8 sm:w-10 sm:h-10" style={{ transform: "translateY(1px)" }} />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {/* Input Section */}
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-300 text-xs sm:text-sm font-medium">Amount in SOL</label>
                  <div className="flex items-center space-x-1 bg-gray-800/50 px-2 py-0.5 sm:py-1 rounded-md border border-gray-700/50">
                    <Clock className="h-3 w-3 text-green-400" />
                    <span className="text-[10px] sm:text-xs text-green-400 font-medium">Last buy: 2 min ago</span>
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
                    // Reduced py-3 to py-2.5 on mobile
                    className={`w-full bg-gray-800/70 border ${error ? "border-red-500/80" : "border-gray-700/50"} rounded-t-xl rounded-b-none py-2.5 sm:py-3 px-4 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all placeholder-gray-500`}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 text-sm font-medium">SOL</span>
                </div>

                <div className="flex items-center space-x-2 px-3 py-1 sm:py-1.5 rounded-b-lg border border-gray-700/50">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
                  <span className="text-xs sm:text-sm text-gray-300 whitespace-nowrap">
                    Ends in:{" "}
                    <span className="font-medium text-white">
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </span>
                  </span>
                </div>
                {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
              </div>

              {/* Slider - Reduced vertical spacing drastically */}
              <div className="mt-3 mb-4 sm:mt-6 sm:mb-6">
                <div className="flex justify-between items-center mb-1">
                   <label htmlFor="quick-slider" className="block text-gray-400 text-xs font-medium">Quick select</label>
                </div>
                
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
                    const str = value.toString();
                    setAmount(str);
                    setTokenAmount(calculateTokens(str));
                  }}
                  className="w-full h-2 bg-gray-800/70 rounded-lg accent-orange-500 transition-all focus:outline-none cursor-pointer"
                />
                <div className="flex justify-between text-gray-500 text-[10px] sm:text-xs mt-2">
                  {[5, 10, 15, 20].map((v) => (
                    <div key={v} className="relative flex flex-col items-center cursor-pointer" onClick={() => {
                        setQuickValue(v);
                        setAmount(v.toString());
                        setTokenAmount(calculateTokens(v.toString()));
                    }}>
                      {v === 10 && (
                        <span className="absolute -top-4 sm:-top-5 bg-green-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">
                          Popular
                        </span>
                      )}
                      <span>{v} SOL</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Token Calculation - ALIGNMENT FIXES APPLIED HERE */}
              <div className="mt-4 sm:mt-8 bg-gray-800/30 rounded-xl p-3 sm:p-4 mb-4 border border-gray-700/50 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  
                  {/* Receive Box */}
                  <div className="bg-gray-800/40 p-2 sm:p-4 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-colors">
                    {/* Added justify-center for vertical alignment */}
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="text-[10px] sm:text-xs font-medium text-gray-400 mb-1">YOU RECEIVE</span>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-sm sm:text-lg font-bold text-white truncate max-w-[80px] sm:max-w-none">{tokenAmount}</span>
                          <span className="text-xs sm:text-base font-medium text-green-400">$TRW</span>
                        </div>
                        {/* Consistent structural element */}
                        <div className="mt-1 text-[9px] sm:text-xs text-green-300/80">Per SOL Rate active</div>
                      </div>
                    </div>
                  </div>

                  {/* Bonus Box */}
                  <div className="bg-gray-800/40 p-2 sm:p-4 rounded-lg border border-gray-700/50 hover:border-yellow-500/30 transition-colors">
                    {/* Added justify-center for vertical alignment */}
                    <div className="flex flex-col items-center justify-center h-full">
                      {/* Adjusted margin to match the top line spacing */}
                      <div className="flex items-center space-x-1 mb-1"> 
                        <span className="text-[10px] sm:text-xs font-medium text-gray-400">BONUS</span>
                        {numericAmount >= 1 ? (
                          <span className={`text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${numericAmount >= 5 ? "bg-purple-900/30 text-purple-300" : "bg-orange-900/30 text-orange-300"}`}>
                            {numericAmount >= 5 ? "35%" : "10%"}
                          </span>
                        ) : (
                          <span className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-gray-700/30 text-gray-500">
                            0%
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-sm sm:text-lg font-bold text-yellow-300 truncate max-w-[80px] sm:max-w-none">
                            +{numericAmount >= 1 ? bonusTokens.toLocaleString("en-US") : "0"}
                          </span>
                          <span className="text-xs sm:text-base font-medium text-yellow-200">$TRW</span>
                        </div>
                        {/* Placeholder line to match the height of the "Per SOL Rate active" line */}
                        <div className="mt-1 text-[9px] sm:text-xs text-transparent select-none">
                          &nbsp; 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total - Compacted */}
              <div className="flex justify-between items-center py-2 sm:py-4 px-3 sm:px-5 bg-gray-800/30 rounded-xl mb-4 border border-gray-700/50">
                <div>
                  <span className="text-gray-300 font-medium text-sm sm:text-base">Total</span>
                  <p className="text-gray-500 text-[10px] sm:text-sm">Including bonus</p>
                </div>
                <span className="text-white font-bold text-lg sm:text-2xl">
                  {totalTokens.toLocaleString("en-US")}
                </span>
              </div>

              {/* Info Box */}
              <div className="bg-[#111] p-2 sm:p-4 rounded-lg border border-[#f0b90b]/20 flex items-start mb-4">
                <div className="text-[#f0b90b] mr-2 mt-0.5">
                  <AlertCircle className="w-3 h-3 sm:w-5 sm:h-5" />
                </div>
                <p className="text-gray-300 text-[10px] sm:text-xs leading-tight">
                  Tokens distributed automatically after payment.
                </p>
              </div>

              {/* Proceed Button */}
              <motion.button
                onClick={handleProceedToPayment}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-base hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                Proceed to Payment
              </motion.button>

              <p className="text-gray-500 text-[10px] sm:text-xs mt-3 text-center">
                By proceeding, you agree to our{" "}
                <a href="#" className="text-orange-400 hover:underline">Terms</a>
              </p>
            </div>
          </div>

          {/* Benefits Section (Column 2) - Kept mostly same but touch responsive adjustments */}
          <div className="space-y-4 sm:space-y-6">
            
            {/* Bonus Progress Box */}
            <div className="bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-gray-900/50 rounded-2xl shadow-2xl overflow-hidden border border-yellow-500/30 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                {/* Compact Mobile Layout for Progress */}
                <div className="block sm:hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold text-sm">Bonus Progress</span>
                    <span className={`text-xs font-bold ${numericAmount >= 5 ? "text-purple-400" : numericAmount >= 1 ? "text-orange-400" : "text-gray-500"}`}>
                        Current: {numericAmount >= 5 ? "35%" : numericAmount >= 1 ? "10%" : "0%"}
                    </span>
                  </div>
                   <div className="relative h-2 bg-gray-800/70 rounded-full overflow-hidden mb-2">
                     <div className={`absolute inset-0 rounded-full ${numericAmount >= 5 ? "bg-purple-500/20" : "bg-orange-500/20"} blur-sm`} />
                     <motion.div
                       className="absolute inset-y-0 left-0 rounded-full"
                       initial={{ width: 0 }}
                       animate={{
                         width: `${Math.min(100, (numericAmount / 5) * 100)}%`,
                         background: numericAmount >= 5
                           ? "linear-gradient(90deg, rgba(168,85,247,0.8) 0%, rgba(236,72,153,0.8) 100%)"
                           : "linear-gradient(90deg, rgba(249,115,22,0.8) 0%, rgba(234,179,8,0.8) 100%)",
                       }}
                       transition={{ duration: 0.5 }}
                     />
                   </div>
                   <div className="flex justify-between text-[10px] text-gray-500">
                      <span>0%</span>
                      <span className={numericAmount >= 1 ? "text-green-400" : ""}>10% (1 SOL)</span>
                      <span className={numericAmount >= 5 ? "text-purple-400" : ""}>35% (5 SOL)</span>
                   </div>
                </div>

                {/* Desktop Layout (Original) */}
                <div className="hidden sm:block">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                        <Star className="h-6 w-6 text-yellow-400" fill="currentColor" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Bonus <span className="mobile-view-result">{numericAmount >= 5 ? "35%" : numericAmount >= 1 ? "10%" : "0%"}</span>{" "}
                          <span className="bonus-main-heading">Tiers</span>
                        </h3>
                        <p className="text-yellow-200/80 text-sm bonus-sub-heading">Unlock higher rewards</p>
                      </div>
                    </div>

                    <div className="flex-1 w-full max-w-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${numericAmount >= 1 ? "bg-green-900/50 text-green-300 border border-green-500/30" : "bg-gray-800/70 text-gray-500 border border-gray-700"}`}>1 SOL → 10%</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${numericAmount >= 5 ? "bg-purple-900/50 text-purple-300 border border-purple-500/30" : "bg-gray-800/70 text-gray-500 border border-gray-700"}`}>5 SOL → 35%</span>
                      </div>

                      <div className="relative h-2.5 bg-gray-800/70 rounded-full overflow-hidden">
                        <div className={`absolute inset-0 rounded-full ${numericAmount >= 5 ? "bg-purple-500/20" : "bg-orange-500/20"} blur-sm`} />
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(100, (numericAmount / 5) * 100)}%`,
                            background: numericAmount >= 5
                              ? "linear-gradient(90deg, rgba(168,85,247,0.8) 0%, rgba(236,72,153,0.8) 100%)"
                              : "linear-gradient(90deg, rgba(249,115,22,0.8) 0%, rgba(234,179,8,0.8) 100%)",
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Card - Compacted */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 rounded-2xl shadow-xl overflow-hidden border border-gray-800/50 backdrop-blur-sm">
              <div className="p-4 sm:p-6 border-b border-gray-800/50">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Presale Benefits</h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -3 }}
                      className={`p-3 sm:p-4 rounded-lg border ${benefit.bgColor} border-gray-700/50 hover:border-orange-500/30 transition-all`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-1.5 sm:p-2 rounded-md ${benefit.bgColor}`}>{benefit.icon}</div>
                        <div>
                          <h4 className="text-sm sm:text-lg font-bold text-white">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">{benefit.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreSale;