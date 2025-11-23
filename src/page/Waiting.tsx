"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Wallet,
  CheckCircle,
  Clock,
  Zap,
  Star,
  TrendingUp,
  Lock,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Clipboard
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// --- 1. CONFIGURATION & ANIMATIONS ---
const RATE_PER_SOL = 50000 // Tokens per SOL
const BONUS_PERCENT = 0.10 // 10%
const WALLET_ADDRESS = "Hgrhwnue9nsBTRfy6S6xtqNVeQjiDUByTaT6yxYgYwaV"

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
}

// --- 2. HELPER COMPONENTS ---

const BenefitCard = ({ icon, title, desc, highlight = false }: { icon: any, title: string, desc: string, highlight?: boolean }) => (
  <div className={`flex gap-3 p-3 rounded-lg border transition-all duration-300 ${highlight ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}>
    <div className="shrink-0 mt-1">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${highlight ? 'bg-yellow-500/10' : 'bg-black/50'}`}>
        {icon}
      </div>
    </div>
    <div>
      <h4 className={`font-bold text-sm mb-0.5 ${highlight ? 'text-yellow-500' : 'text-white'}`}>{title}</h4>
      <p className="text-gray-400 text-xs leading-tight">{desc}</p>
    </div>
  </div>
)

const SummaryRow = ({ label, value, valueColor = "text-white" }: { label: string, value: string, valueColor?: string }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-500 text-sm font-medium">{label}</span>
    <span className={`font-bold font-mono text-sm ${valueColor}`}>{value}</span>
  </div>
)

const StepDot = ({ current, stepNum }: { current: number, stepNum: number }) => (
  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${current >= stepNum ? 'bg-yellow-500 text-black shadow-[0_0_6px_rgba(234,179,8,0.25)]' : 'bg-gray-800 text-gray-500'}`}>
    {stepNum}
  </div>
)

// --- 3. MAIN STEP COMPONENTS ---

/**
 * STEP 1: PAYMENT/CONFIGURATION
 */
const StepOnePayment = ({
  details,
  setDetails,
  onNext
}: {
  details: any,
  setDetails: any,
  onNext: () => void
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      const sol = parseFloat(val) || 0
      const base = sol * RATE_PER_SOL
      const bonus = base * BONUS_PERCENT
      setDetails({
        ...details,
        solAmount: val,
        baseTokens: base,
        bonusTokens: bonus,
        totalTokens: base + bonus
      })
    }
  }

  const isSolAmountValid = useMemo(() => {
    const sol = parseFloat(details.solAmount)
    return !isNaN(sol) && sol >= 0.1
  }, [details.solAmount])

  return (
    <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8" {...fadeInUp}>
        
        {/* LEFT COLUMN: Page Title & Description */}
        <div className="lg:col-span-5 space-y-4">
            <div className="mb-4">
                <h1 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                    <span className="text-yellow-500">Fast Track</span> Presale Payment
                </h1>
                <p className="text-gray-400 text-sm">
                    Enter the SOL amount below and send the exact funds to the provided wallet address to secure your $TRW allocation instantly.
                </p>
            </div>
        </div>

        {/* RIGHT COLUMN: Payment/Input Area + Benefit Cards */}
        <div className="lg:col-span-7 flex flex-col gap-4">

            {/* 1. Payment Details Input */}
            <div className="bg-[#121214] border border-white/10 rounded-xl p-4 shadow-2xl">
                <h3 className="text-white font-bold text-base tracking-wide uppercase mb-3 flex items-center gap-2">
                    <Wallet size={16} className="text-yellow-500"/> Configure Purchase
                </h3>

                <div className="relative mb-4">
                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider ml-1 mb-1 block">
                        Enter Amount (SOL)
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={details.solAmount}
                            onChange={handleAmountChange}
                            className={`w-full bg-black/50 border ${!isSolAmountValid && details.solAmount !== "" ? 'border-red-500' : 'border-white/8'} rounded-md py-1.5 pl-2 pr-10 text-white text-base font-semibold focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none transition-all placeholder:text-gray-700`}
                            placeholder="0.1 (Minimum)"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                            <span className="text-gray-500 text-xs font-medium">SOL</span>
                            <div className="w-6 h-6 rounded-full bg-[#2b2b30] flex items-center justify-center">
                                <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=029" alt="SOL" className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs">
                        <span className="text-gray-500">Min: 0.1 SOL</span>
                        <span className="text-gray-400">Rate: 1 SOL = {RATE_PER_SOL.toLocaleString()} TRW</span>
                    </div>
                    {!isSolAmountValid && details.solAmount !== "" && (
                      <p className="text-red-500 text-xs mt-1">Minimum purchase is 0.1 SOL.</p>
                    )}
                </div>

                {/* Coin Summary Box */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-3 shadow-inner relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold text-sm tracking-wide uppercase flex items-center gap-2">
                            <ShieldCheck size={16} className="text-green-500" /> Your Allocation
                        </h3>
                        <span className="bg-yellow-500/20 text-yellow-500 text-xs font-bold px-2 py-0.5 rounded-full border border-yellow-500/20">
                            Stage 1 Live
                        </span>
                    </div>
            
                    <div className="space-y-1">
                        <SummaryRow label="Base Tokens" value={`${details.baseTokens.toLocaleString()} TRW`} />
                        <SummaryRow label={`Bonus (${BONUS_PERCENT * 100}%)`} value={`+${details.bonusTokens.toLocaleString()} TRW`} valueColor="text-yellow-400" />
                        <div className="h-px bg-white/10 my-2" />
                        <div className="flex justify-between items-end pt-1">
                            <span className="text-gray-400 text-sm font-medium">TOTAL $TRW</span>
                            <span className="text-white font-bold text-lg">{details.totalTokens.toLocaleString()} <span className="text-yellow-500 text-xs">TRW</span></span>
                        </div>
                    </div>
                </div>

            </div>

            {/* 2. Recipient Address/Warning Area */}
            <div className="bg-[#121214] border border-white/10 rounded-xl p-4 shadow-2xl">
                <h3 className="text-white font-bold text-base tracking-wide uppercase mb-3">
                    Payment Transfer
                </h3>
                
                <div className="space-y-4">
                    {/* Address Card */}
                    <div className="space-y-1">
                        <label className="text-gray-400 text-xs font-bold uppercase ml-1">Recipient Address</label>
                        <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-lg p-3 group">
                            <div
                                className="overflow-hidden mr-4"
                            >
                                <div className="text-gray-300 font-mono text-xs truncate">{WALLET_ADDRESS}</div>
                                <div className="text-gray-600 text-xs mt-1">Solana Network (SPL)</div>
                            </div>
                            {/* Clipboard/Check Button */}
                            <div className="shrink-0">
                                <button
                                    onClick={() => copyToClipboard(WALLET_ADDRESS, "address")}
                                    className="p-1 rounded-full text-gray-400 hover:text-yellow-500 transition-colors"
                                    aria-label="Copy Address"
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        {copiedField === "address" ? (
                                            <motion.div
                                                key="check"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <CheckCircle size={16} className="text-green-500" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <Clipboard size={16} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="flex gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <AlertCircle className="text-red-500 shrink-0" size={18} />
                      <p className="text-red-500/80 text-xs leading-relaxed">
                        **CRITICAL:** Only send the **EXACT** amount of **{details.solAmount} SOL** via the Solana network. Sending any other asset or amount may result in permanent loss.
                      </p>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={!isSolAmountValid}
                        className={`w-full group relative ${isSolAmountValid ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 shadow-yellow-500/20' : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'} text-black font-bold text-sm py-2 rounded-md transition-all transform active:scale-[0.99] shadow-md flex items-center justify-center gap-2 overflow-hidden`}
                    >
                        <span className="relative z-10">I've Sent {details.solAmount} SOL - Proceed to Verification</span>
                        <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={16} strokeWidth={3} />
                        {isSolAmountValid && <div className="absolute inset-0 h-full w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent" />}
                    </button>
                </div>
            </div>
            
            {/* 3. Benefit Cards (MOVED TO THE END OF THE RIGHT COLUMN) */}
            <div className="space-y-3">
                <BenefitCard icon={<Zap className="text-yellow-400" size={20} />} title="Early Investor Advantage" desc="Get in early with pre-launch pricing before exchange listing." />
                <BenefitCard icon={<Star className="text-yellow-400" size={20} />} title="Presale Bonuses" desc="Current stage offers 10% bonus coins on all purchases." highlight />
                <BenefitCard icon={<Lock className="text-yellow-400" size={20} />} title="Limited Supply" desc="Only 40% of total supply available during presale." />
                <BenefitCard icon={<TrendingUp className="text-yellow-400" size={20} />} title="Limited Time Offer" desc="Price increases in the next stage. Act fast." />
            </div>
            
        </div>
    </motion.div>
  )
}

/**
 * STEP 2: VERIFICATION
 */
const StepTwoVerification = ({ details }: { details: any }) => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(3600)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <motion.div className="max-w-xl mx-auto" {...fadeInUp}>
      <div className="bg-[#121214] border border-white/10 rounded-xl p-8 text-center shadow-2xl relative overflow-hidden">

        {/* Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-500/5 rounded-full blur-2xl animate-pulse" />

        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-yellow-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Clock className="text-yellow-500" size={28} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Processing Transaction</h2>
          <p className="text-gray-400 text-sm mb-4">Please wait while the blockchain confirms your transfer.</p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 rounded-full border border-yellow-500/20 text-yellow-500 font-mono text-base mb-8">
            <span>{formatTime(timeLeft)}</span>
          </div>

          <div className="bg-black/40 rounded-lg p-4 text-left space-y-2 border border-white/5">
            <SummaryRow label="Status" value="Verifying..." valueColor="text-yellow-500" />
            <SummaryRow label="Order ID" value={details.orderId} />
            <div className="h-px bg-white/10 my-1" />
            <SummaryRow label="Amount Sent" value={`${details.solAmount} SOL`} />
            <SummaryRow label="Total Coins" value={`${details.totalTokens.toLocaleString()} TRW`} />
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 text-gray-500 hover:text-white text-sm font-medium transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// --- 4. MAIN PAGE COMPONENT ---

export default function WaitingForPaymentPage() {
  const navigate = useNavigate()
  // Start at the new Step 1 (Payment)
  const [step, setStep] = useState<1 | 2>(1)

  const [purchaseDetails, setPurchaseDetails] = useState({
    solAmount: "0.2", // Initial default value
    baseTokens: 0,
    bonusTokens: 0,
    totalTokens: 0,
    orderId: "#702682031" // Example order ID
  })

  useEffect(() => {
    // Initial calculation based on default solAmount
    const initialSol = parseFloat(purchaseDetails.solAmount) || 0
    const base = initialSol * RATE_PER_SOL
    const bonus = base * BONUS_PERCENT
    setPurchaseDetails(prev => ({
      ...prev,
      baseTokens: base,
      bonusTokens: bonus,
      totalTokens: base + bonus
    }))
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className="min-h-screen bg-[#08080a] bg-gradient-to-b from-[#08080a] to-[#0c0c0f] text-white font-sans selection:bg-yellow-500/30 pb-20 relative overflow-x-hidden">

      {/* Background Glows (Unchanged) */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[128px] pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex items-center justify-center">

        {/* Small Back Button (Absolute positioning for top left) */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="absolute left-4 top-4 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white transition-all rounded-full bg-transparent border border-white/5 hover:bg-white/5"
        >
          <ArrowLeft size={16} />
        </button>

        {/* Step Indicator at Top Center */}
        <div className="flex items-center gap-3">
          <StepDot current={step} stepNum={1} />
          <div className={`w-8 h-0.5 ${step > 1 ? 'bg-yellow-500' : 'bg-gray-800'} transition-colors`} />
          <StepDot current={step} stepNum={2} />
        </div>
      </header>

      {/* CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 mt-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepOnePayment
              key="step1"
              details={purchaseDetails}
              setDetails={setPurchaseDetails}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <StepTwoVerification
              key="step2"
              details={purchaseDetails}
            />
          )}
        </AnimatePresence>
      </main>

    </div>
  )
}