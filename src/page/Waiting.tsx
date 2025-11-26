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

  Clipboard,

  ListOrdered

} from "lucide-react"

import { useNavigate, useLocation } from "react-router-dom" // Added useLocation



// --- 1. CONFIGURATION & ANIMATIONS ---

// KEEPING THESE CONSTANTS, but initial purchase details will come from previous page data

const RATE_PER_SOL = 50000 // Tokens per SOL

const BONUS_PERCENT = 0.10 // 10% (This may be overridden by data from the previous page's calculation)

const WALLET_ADDRESS = "Hgrhwnue9nsBTRfy6S6xtqNVeQjiDUByTaT6yxYgYwaV"



const fadeInUp = {

  initial: { opacity: 0, y: 10 },

  animate: { opacity: 1, y: 0 },

  exit: { opacity: 0, y: -10 },

  transition: { duration: 0.3 }

}



// --- 2. HELPER COMPONENTS ---



// BenefitCard is no longer needed as Step 1 is removed. Keeping helper components.



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



/**

 * Reusable component for copying text

 */

const CopyField = ({ label, textToCopy, displayValue, fieldName, copiedField, setCopiedField }: { 

    label: string, 

    textToCopy: string, 

    displayValue: string, 

    fieldName: string, 

    copiedField: string | null, 

    setCopiedField: (field: string | null) => void 

}) => {

    const copyToClipboard = () => {

        navigator.clipboard.writeText(textToCopy)

        setCopiedField(fieldName)

        setTimeout(() => setCopiedField(null), 2000)

    }



    return (

        <div className="space-y-1">

            <label className="text-gray-400 text-xs font-bold uppercase ml-1">{label}</label>

            <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-lg p-3 group">

                <div className="overflow-hidden mr-4">

                    <div className="text-gray-300 font-mono text-sm truncate">{displayValue}</div>

                </div>

                {/* Clipboard/Check Button */}

                <div className="shrink-0">

                    <button

                        onClick={copyToClipboard}

                        className="p-1 rounded-full text-gray-400 hover:text-yellow-500 transition-colors"

                        aria-label={`Copy ${label}`}

                    >

                        <AnimatePresence mode="wait" initial={false}>

                            {copiedField === fieldName ? (

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

    )

}





// Step 1 component is removed.



/**

 * STEP 2: TRANSFER (Payment Instructions)

 * NOTE: details.solAmount and details.totalTokens are now mandatory props,

 * pre-filled from the previous page's calculation.

 */

const StepTwoTransfer = ({ details, onNext }: { details: any, onNext: () => void }) => {

    const [copiedField, setCopiedField] = useState<string | null>(null)

    

    // Remove commas for accurate display in critical warning

    const solAmountDisplay = details.solAmount ? String(details.solAmount).replace(/,/g, "") : "N/A";



    // Payment Instruction Items

    const paymentSteps = [

        `Copy the address and exact amount: ${solAmountDisplay} SOL.`,

        "Send payment from your external Solana wallet or exchange.",

        "Wait for blockchain confirmation (usually 5–10 min).",

        "Click 'I've Sent Payment' below once complete."

    ]



    return (

        <motion.div className="max-w-xl mx-auto" {...fadeInUp}>

            <div className="bg-[#121214] border border-white/10 rounded-xl p-6 shadow-2xl relative">

                <h2 className="text-2xl font-bold text-white mb-2 text-center">Complete Your Payment</h2>

                <p className="text-gray-400 text-sm mb-6 text-center">

                    To secure your **{details.totalTokens.toLocaleString()} $TRW** tokens, send the **exact amount** of **{solAmountDisplay} SOL** to the wallet address below.

                </p>



                <div className="space-y-4">

                    

                    {/* Recipient Address */}

                    <CopyField

                        label="Recipient Wallet Address (Solana Network)"

                        textToCopy={WALLET_ADDRESS}

                        // Truncate display for better fit, but copy full address

                        displayValue={`${WALLET_ADDRESS.substring(0, 10)}...${WALLET_ADDRESS.substring(WALLET_ADDRESS.length - 10)}`}

                        fieldName="address"

                        copiedField={copiedField}

                        setCopiedField={setCopiedField}

                    />



                    {/* How to Pay - Updated Styling */}

                    <div className="bg-black/40 border border-white/10 rounded-lg p-4">

                        <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">

                            <ListOrdered size={16} className="text-yellow-500" /> How to Pay

                        </h3>

                        <ul className="space-y-2">

                            {paymentSteps.map((step, index) => (

                                <li key={index} className="flex items-start gap-2">

                                    <CheckCircle size={16} className="text-yellow-500 mt-[2px] shrink-0" />

                                    <span className="text-gray-300 font-medium text-sm leading-snug">

                                        {step}

                                    </span>

                                </li>

                            ))}

                        </ul>

                    </div>



                

                    <button

                        onClick={onNext}

                        className="w-full mt-2 group relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 shadow-yellow-500/20 text-black font-bold text-sm py-2 rounded-md transition-all transform active:scale-[0.99] shadow-md flex items-center justify-center gap-2 overflow-hidden"

                    >

                        <span className="relative z-10">I've Sent Payment - Proceed to Verification</span>

                        <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={16} strokeWidth={3} />

                        <div className="absolute inset-0 h-full w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent" />

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

    

  // Ensure we use the proper string values coming from the parent component

    const solAmountDisplay = details.solAmount ? String(details.solAmount).replace(/,/g, "") : "N/A";

    const totalTokensDisplay = details.totalTokens ? details.totalTokens.toLocaleString() : "N/A";





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

            <SummaryRow label="Order ID" value={details.orderId || "#N/A"} />

            <div className="h-px bg-white/10 my-1" />

            <SummaryRow label="Amount Sent" value={`${solAmountDisplay} SOL`} />

            <SummaryRow label="Total Coins" value={`${totalTokensDisplay} TRW`} />

          </div>



          {/* UPDATED BUTTON STYLE */}

          <button

            onClick={() => navigate("/")}

            className="w-full mt-6 group relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 shadow-yellow-500/20 text-black font-bold text-sm py-2 rounded-md transition-all transform active:scale-[0.99] shadow-md flex items-center justify-center gap-2 overflow-hidden"

          >

            <span className="relative z-10">Return to Dashboard</span>

            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={16} strokeWidth={3} />

            <div className="absolute inset-0 h-full w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          </button>

        </div>

      </div>

    </motion.div>

  )

}



// --- 4. MAIN PAGE COMPONENT ---



// Define the expected structure of data coming from the previous page

interface PurchaseDetails {

    solAmount: string;

    totalTokenAmount: string;

    orderId: string;

    // Includes baseTokenAmount and bonusTokenAmount from the PreSale component

    [key: string]: any; 

}





export default function WaitingForPaymentPage() {

  const navigate = useNavigate()

  const location = useLocation() // Hook to access navigation state



  // 1. Start flow directly at Step 2 (Transfer/Payment)

  const [step, setStep] = useState<1 | 2 | 3>(2) 



  // Default state, which will be immediately updated by useEffect

  const [purchaseDetails, setPurchaseDetails] = useState({

    solAmount: "0.0", 

    totalTokens: 0,

    orderId: "#000000000"

  })



  // 2. Load data from previous page (PreSale) on mount

  useEffect(() => {

    let loadedDetails: PurchaseDetails | null = null;



    // Check location state first (passed via navigate('/waiting', { state: details }))

    if (location.state) {

        loadedDetails = location.state as PurchaseDetails;

    } else {

        // Fallback: Check sessionStorage (passed via sessionStorage.setItem("paymentDetails", JSON.stringify(details)))

        const sessionData = sessionStorage.getItem("paymentDetails");

        if (sessionData) {

            try {

                loadedDetails = JSON.parse(sessionData) as PurchaseDetails;

            } catch (e) {

                console.error("Failed to parse payment details from sessionStorage", e);

            }

        }

    }



    if (loadedDetails) {

        // Clean up token amount strings (remove commas) and convert to number for totalTokens property

        const totalTokensNum = Number(String(loadedDetails.totalTokenAmount).replace(/,/g, ""));



        setPurchaseDetails({

            solAmount: loadedDetails.solAmount,

            totalTokens: totalTokensNum,

            orderId: loadedDetails.orderId,

            // You can spread any other details you need here

        });

    } else {

        // Handle case where data is missing (e.g., redirect back to configuration)

        console.warn("No purchase details found. Redirecting to home.");

        navigate("/"); // Redirect user if data is missing

    }



    window.scrollTo(0, 0)

  }, [location.state, navigate]) // Depend on location.state and navigate



  // Back button handler: now only navigates back to configuration page (step 1 is skipped)

  const handleBack = () => {

    if (step === 3) {

        setStep(2); // Allow going back from verification to transfer screen

    } else {

        navigate(-1); // Go back to the PreSale component

    }

  }



  // Map the current step: 1 (skipped) -> 2 (Transfer) -> 3 (Verification)

  const currentStep = step;



  return (

    <div className="min-h-screen bg-[#08080a] bg-gradient-to-b from-[#08080a] to-[#0c0c0f] text-white font-sans selection:bg-yellow-500/30 pb-20 relative overflow-x-hidden">



      {/* Background Glows (Unchanged) */}

      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[128px] pointer-events-none" />



      {/* HEADER */}

      <header className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex items-center justify-center">



        {/* Small Back Button */}

        <button

          onClick={handleBack}

          aria-label="Back"

          className="absolute left-4 top-4 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white transition-all rounded-full bg-transparent border border-white/5 hover:bg-white/5"

        >

          <ArrowLeft size={16} />

        </button>



        {/* Step Indicator at Top Center (Now 3 steps, but starting at 2) */}

        <div className="flex items-center gap-3">

          <StepDot current={currentStep} stepNum={1} /> {/* Still show dots, just start at step 2 */}

          <div className={`w-8 h-0.5 ${currentStep > 1 ? 'bg-yellow-500' : 'bg-gray-800'} transition-colors`} />

          <StepDot current={currentStep} stepNum={2} />

          <div className={`w-8 h-0.5 ${currentStep > 2 ? 'bg-yellow-500' : 'bg-gray-800'} transition-colors`} />

          <StepDot current={currentStep} stepNum={3} />

        </div>

      </header>



      {/* CONTENT */}

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 mt-4">

        <AnimatePresence mode="wait">

          {/* Step 1 Rendering Logic REMOVED here */}

          {step === 2 && (

            <StepTwoTransfer

              key="step2"

              details={purchaseDetails}

              onNext={() => setStep(3)} // Go to Step 3: Verification

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