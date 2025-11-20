"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Wallet,
  QrCode, // QrCode is kept in imports for now, but its usage is removed
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
const RATE_PER_SOL = 50000
const BONUS_PERCENT = 0.10 // 10%
const WALLET_ADDRESS = "Hgrhwnue9nsBTRfy6S6xtqNVeQjiDUByTaT6yxYgYwaV"

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
}

// --- 2. HELPER COMPONENTS ---

// QRCodePlaceholder component is no longer used, but kept for completeness based on original structure.
const QRCodePlaceholder = ({ data }: { data: string }) => (
  <div className="bg-white p-1 rounded-lg shadow-sm">
            {/* NOTE TO USER: To display a working QR Code, you must install a library 
              like 'qrcode.react' (npm install qrcode.react).
              
              Then, replace the div below with: 
              <QRCodeSVG value={data} size={160} />
            */}
    <img
      src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(data)}`}
      alt="QR code"
      className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] object-cover rounded-md"
    />
  </div>
)

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
 * STEP 1: PURCHASE CONFIGURATION (Benefit cards moved)
 */
const StepOnePurchase = ({
  details,
  setDetails,
  onNext
}: {
  details: any,
  setDetails: any,
  onNext: () => void
}) => {

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

  return (
    <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8" {...fadeInUp}>

      {/* LEFT COLUMN: Page Title & Description (No Benefit Cards here anymore) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
            Join the <span className="text-yellow-500">Presale</span> Revolution
          </h1>
          <p className="text-gray-400 text-sm">
            Secure your $TRW allocation at the lowest entry price before the public launch.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Form Area + Moved Benefit Cards */}
      <div className="lg:col-span-7 flex flex-col gap-4">

        {/* 1. Coin Summary Box */}
        <div className="bg-[#121214] border border-white/10 rounded-xl p-4 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-500" /> Your Purchase
            </h3>
            <span className="bg-yellow-500/20 text-yellow-500 text-xs font-bold px-2 py-0.5 rounded-full border border-yellow-500/20">
              Stage 1 Live
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-yellow-500/20">
                  $
                </div>
                <div>
                  <div className="text-gray-400 text-xs uppercase font-bold tracking-wider">Base Coins</div>
                  <div className="text-white font-bold text-base">{details.baseTokens.toLocaleString()} TRW</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-2 bg-yellow-500/5 rounded-lg border border-yellow-500/20 relative overflow-hidden">
              <div className="flex items-center gap-2 relative z-10">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold text-sm">
                  +
                </div>
                <div>
                  <div className="text-yellow-500/80 text-xs uppercase font-bold tracking-wider">10% Bonus Applied</div>
                  <div className="text-yellow-400 font-bold text-base">+{details.bonusTokens.toLocaleString()} TRW</div>
                </div>
              </div>
            </div>

            <div className="pt-1 mt-1 border-t border-white/6 flex justify-between items-end">
              <span className="text-gray-400 text-sm font-medium">Total Allocation</span>
              <span className="text-white font-bold text-lg">{details.totalTokens.toLocaleString()} <span className="text-yellow-500 text-xs">TRW</span></span>
            </div>
          </div>
        </div>

        {/* 2. Payment Details Input */}
        <div className="bg-[#121214] border border-white/10 rounded-xl p-4 shadow-2xl">
          <h3 className="text-white font-bold text-base tracking-wide uppercase mb-3">Payment Details</h3>

          <div className="relative">
            <label className="text-gray-500 text-xs font-bold uppercase tracking-wider ml-1 mb-1 block">
              Enter Amount (SOL)
            </label>
            <div className="relative group">
              <input
                type="text"
                value={details.solAmount}
                onChange={handleAmountChange}
                className="w-full bg-black/50 border border-white/8 rounded-md py-1.5 pl-2 pr-10 text-white text-base font-semibold focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 focus:outline-none transition-all placeholder:text-gray-700"
                placeholder="0.0"
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
          </div>

          <div className="mt-3">
            <button
              onClick={onNext}
              className="w-full group relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-sm py-2 rounded-md transition-all transform active:scale-[0.99] shadow-md shadow-yellow-500/20 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Proceed to Payment</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={16} strokeWidth={3} />
              <div className="absolute inset-0 h-full w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </div>
        </div>

        {/* 3. Benefit Cards (MOVED HERE) */}
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
 * STEP 2: PAYMENT (Tabs) (QR code removed, now only Wallet view)
 */
const StepTwoPayment = ({
  details,
  onBack,
  onNext
}: {
  details: any,
  onBack: () => void,
  onNext: () => void
}) => {
  // Removed activeTab state as there is only one view now.
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // qrData is no longer needed

  return (
    <motion.div className="max-w-xl mx-auto" {...fadeInUp}>
      <div className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden shadow-2xl">

        {/* Tabs Header - Simplified to a single static header */}
        <div className="flex border-b border-white/10 bg-black/20">
          <div className="flex-1 py-2 text-sm font-semibold uppercase tracking-wider transition-all relative bg-yellow-500 text-black">
            <span className="flex items-center justify-center gap-2"><Wallet size={16} /> Crypto Wallet Payment</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500" />
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-6">
            <div className="text-center mb-3">
              <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/20 animate-pulse">
                Awaiting Payment
              </span>
              <h2 className="text-white font-bold text-xl mt-2">Send SOL</h2>
              <p className="text-gray-500 text-sm mt-1">Order ID: {details.orderId}</p>
            </div>

            {/* Amount Card */}
            <div className="space-y-1">
              <label className="text-gray-400 text-xs font-bold uppercase ml-1">Amount to Send</label>
              <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-lg p-3 group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2b2b30] flex items-center justify-center">
                    <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=029" alt="SOL" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-mono font-bold text-base">{details.solAmount} SOL</div>
                    <div className="text-gray-600 text-xs">Exact amount required</div>
                  </div>
                </div>
                <div className="shrink-0" />
              </div>
            </div>

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
            <div className="flex gap-3 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
              <AlertCircle className="text-yellow-500 shrink-0" size={18} />
              <p className="text-yellow-500/80 text-xs leading-relaxed">
                Only send SOL via the Solana network. Sending any other asset may result in permanent loss.
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-black/20 border-t border-white/10 flex gap-3">
          <button
            onClick={onBack}
            // FIX 1: Solid Red Button with White Text
            className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-md transition-colors shadow-sm shadow-red-600/20 text-sm"
          >
            Cancel Order
          </button>
          <button
            onClick={onNext}
            // FIX 1: Solid Green Button with White Text (Verified correct)
            className="flex-[2] py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-md transition-colors shadow-sm shadow-green-600/20 text-sm"
          >
            I've Sent Payment
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * STEP 3: VERIFICATION
 */
const StepThreeVerification = ({ details }: { details: any }) => {
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
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const [purchaseDetails, setPurchaseDetails] = useState({
    solAmount: "0.2",
    baseTokens: 10000,
    bonusTokens: 1000,
    totalTokens: 11000,
    orderId: "#702682031"
  })

  useEffect(() => {
    // Initialize tokens based on initial SOL amount
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
          <div className={`w-8 h-0.5 ${step > 2 ? 'bg-yellow-500' : 'bg-gray-800'} transition-colors`} />
          <StepDot current={step} stepNum={3} />
        </div>
      </header>

      {/* CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 mt-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepOnePurchase
              key="step1"
              details={purchaseDetails}
              setDetails={setPurchaseDetails}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <StepTwoPayment
              key="step2"
              details={purchaseDetails}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <StepThreeVerification
              key="step3"
              details={purchaseDetails}
            />
          )}
        </AnimatePresence>
      </main>

    </div>
  )
}