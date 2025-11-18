import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CreditCard, Copy, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Instructions = () => {
    const navigate = useNavigate();
    const [copiedAmount, setCopiedAmount] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState<{
        solAmount: string;
        baseTokenAmount: string;
        bonusTokenAmount: string;
        totalTokenAmount: string;
        rate: string;
    }>({
        solAmount: "0.2",
        baseTokenAmount: "4,000",
        bonusTokenAmount: "400",
        totalTokenAmount: "4,400",
        rate: "20,000",
    });

    const walletAddress = "HLmpqDuJaJFq4EjMWfTaiaphDbfETyqvsCZMKa3zpRJ9";
    const orderId = "#" + Math.floor(Math.random() * 10000000000).toString();

    const formatNumber = (num: number): string => {
        return num.toLocaleString('en-US');
    };

    const calculateTokenAmounts = (solAmount: number) => {
        const baseRate = 20000;
        const bonusPercentage = 0.10;

        const baseTokens = solAmount * baseRate;
        const bonusTokens = baseTokens * bonusPercentage;
        const totalTokens = baseTokens + bonusTokens;

        return {
            baseTokenAmount: formatNumber(baseTokens),
            bonusTokenAmount: formatNumber(bonusTokens),
            totalTokenAmount: formatNumber(totalTokens)
        };
    };

    const copyToClipboard = (text: string, type: 'amount' | 'address') => {
        navigator.clipboard.writeText(text);
        if (type === 'amount') {
            setCopiedAmount(true);
            setTimeout(() => setCopiedAmount(false), 2000);
        } else {
            setCopiedAddress(true);
            setTimeout(() => setCopiedAddress(false), 2000);
        }
    };

    useEffect(() => {
        const storedDetails = sessionStorage.getItem("paymentDetails");
        if (storedDetails) {
            const details = JSON.parse(storedDetails);
            const solAmount = parseFloat(details.solAmount) || 0.2;
            const validSolAmount = Math.max(solAmount, 0.2);
            const tokenAmounts = calculateTokenAmounts(validSolAmount);

            setPaymentDetails({
                solAmount: validSolAmount.toString(),
                baseTokenAmount: tokenAmounts.baseTokenAmount,
                bonusTokenAmount: tokenAmounts.bonusTokenAmount,
                totalTokenAmount: tokenAmounts.totalTokenAmount,
                rate: "20,000",
            });
        }
    }, []);

    const handleSentPayment = () => {
        sessionStorage.setItem(
            "paymentConfirmation",
            JSON.stringify({
                solAmount: paymentDetails.solAmount,
                baseTokenAmount: paymentDetails.baseTokenAmount,
                bonusTokenAmount: paymentDetails.bonusTokenAmount,
                totalTokenAmount: paymentDetails.totalTokenAmount,
                walletAddress,
                orderId,
            }),
        );

        navigate("/waiting");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#f0b90b]/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center">
                    <Link
                        to="/token-sale"
                        className="flex items-center text-[#f0b90b] hover:text-[#f0b90b]/80 transition-colors mr-4 group"
                    >
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-sm sm:text-base">Back</span>
                    </Link>
                    <h1 className="text-lg sm:text-xl font-bold text-white">Payment Instructions</h1>
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-between w-full max-w-md">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1 transition-all 
                  ${step < 3 ? 'bg-[#f0b90b] text-black' : 'bg-[#1a1a1a] border border-[#333] text-gray-400'}`}>
                                    {step}
                                </div>
                                <span className={`text-xs ${step < 3 ? 'text-[#f0b90b]' : 'text-gray-500'}`}>
                                    {step === 1 ? 'Details' : step === 2 ? 'Payment' : 'Confirmation'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 text-xs text-gray-500">Step 2 of 3</div>
                </div>
            </div>

            {/* Token Purchase Summary */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-[#f0b90b]/10 rounded-xl p-5 mb-6 shadow-sm">
                    <h3 className="text-white font-semibold mb-4 text-base sm:text-lg flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#f0b90b] mr-2 animate-pulse"></span>
                        Purchase Summary
                    </h3>
                    <div className="space-y-3 text-sm sm:text-base">
                        <div className="flex justify-between py-2 border-b border-[#f0b90b]/5">
                            <span className="text-gray-400">SOL Amount:</span>
                            <span className="text-white font-mono">{paymentDetails.solAmount} SOL</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#f0b90b]/5">
                            <span className="text-gray-400">Base WLFI Tokens:</span>
                            <span className="text-white font-mono">{paymentDetails.baseTokenAmount} WLFI</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#f0b90b]/5">
                            <span className="text-gray-400">Bonus (10%):</span>
                            <span className="text-[#f0b90b] font-mono">+{paymentDetails.bonusTokenAmount} WLFI</span>
                        </div>
                        <div className="pt-3 mt-2">
                            <div className="flex justify-between font-semibold py-3 bg-[#f0b90b]/5 rounded-lg px-4 border border-[#f0b90b]/10">
                                <span className="text-white">Total WLFI Tokens:</span>
                                <span className="text-[#f0b90b] font-mono">{paymentDetails.totalTokenAmount} WLFI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Crypto Wallet Payment Section */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="space-y-6 max-w-2xl mx-auto">
                    {/* Payment Card */}
                    <div className="bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] border border-[#f0b90b]/20 rounded-xl p-6 shadow-lg shadow-[#f0b90b]/5">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                                    <CreditCard size={20} className="text-[#f0b90b] mr-3" />
                                    <span style={{ fontFamily: "monospace" }} className="bg-clip-text text-transparent bg-gradient-to-r from-[#f0b90b] to-[#f8d35a]">
                                        Crypto Wallet
                                    </span>
                                </h3>
                                <p style={{ marginTop: "5%" }} className="text-gray-400 text-xs sm:text-sm mt-1 font-mono tracking-wider">
                                    Order: <span className="text-gray-300">{orderId}</span>
                                </p>
                            </div>
                            <span className="bg-[#f0b90b]/10 text-[#f0b90b] text-xs font-medium px-3 py-1 rounded-full border border-[#f0b90b]/20">
                                Awaiting Payment
                            </span>
                        </div>

                        <div className="space-y-6">
                            {/* Amount Card */}
                            <div className="bg-[#0f0f0f] border border-[#f0b90b]/15 rounded-lg p-5">
                                <div className="flex items-center mb-3">
                                    <div className="w-2 h-2 rounded-full bg-[#f0b90b] mr-3 animate-pulse" />
                                    <p className="text-gray-300 text-sm sm:text-base font-medium">
                                        Send exactly this amount:
                                    </p>
                                </div>
                                <div className="relative">
                                    {/* clickable area */}
                                    <div
                                        className="bg-[#0a0a0a] border border-[#f0b90b]/10 rounded-lg p-4 flex items-center justify-between cursor-pointer"
                                        onClick={() => copyToClipboard(paymentDetails.solAmount, 'amount')}
                                        title="Click to copy amount"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-9 h-9 bg-[#111] rounded-full flex items-center justify-center mr-4 border border-[#f0b90b]/10 shadow-sm">
                                                {/* Solana SVG */}
                                                <svg
                                                    width="18" height="18" viewBox="0 0 24 24"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg"
                                                    className="opacity-90"
                                                >
                                                    <path
                                                        d="M11.767 19.089c4.924.868 9.593-2.535 10.461-7.599.868-5.064-2.438-9.741-7.362-10.61-4.923-.868-9.593 2.535-10.46 7.599-.869 5.064 2.437 9.742 7.361 10.61z"
                                                        fill="#f0b90b"
                                                    />
                                                    <path
                                                        d="M9.89 8.703l1.901.335-.35 1.982-1.902-.335.35-1.982zm4.162.734l1.902.335-.35 1.982-1.901-.335.35-1.982zm-4.803 2.394l1.902.335-.35 1.982-1.902-.335.35-1.982zm3.233.57l1.902.335-.35 1.982-1.902-.335.35-1.982z"
                                                        fill="#000"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xl sm:text-2xl font-mono text-white font-medium tracking-tight">
                                                    {paymentDetails.solAmount}
                                                </div>
                                                <div className="text-xs text-gray-400 font-mono tracking-wider">
                                                    SOL
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(paymentDetails.solAmount, 'amount')}
                                            className="text-gray-400 hover:text-[#f0b90b] transition-colors flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f0b90b]/10 border border-[#333] hover:border-[#f0b90b]/30"
                                            title="Copy amount"
                                            style={{color:"white"}}
                                        >
                                            {copiedAmount ? (
                                                <Check size={18} className="text-[#f0b90b]" />
                                            ) : (
                                                <Copy size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {/* notification */}
                                    {copiedAmount && (
                                        <span className="absolute top-2 right-2 bg-[#f0b90b] text-black text-xs font-medium px-2 py-1 rounded">
                                            Copied!
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Address Card */}
                            <div className="bg-[#0f0f0f] border border-[#f0b90b]/15 rounded-lg p-5">
                                <div className="flex items-center mb-3">
                                    <div className="w-2 h-2 rounded-full bg-[#f0b90b] mr-3 animate-pulse" />
                                    <p className="text-gray-300 text-sm sm:text-base font-medium">
                                        Recipient Wallet Address:
                                    </p>
                                </div>
                                <div className="relative">
                                    {/* clickable area */}
                                    <div
                                        className="bg-[#0a0a0a] border border-[#f0b90b]/10 rounded-lg p-4 pr-14 cursor-pointer"
                                        onClick={() => copyToClipboard(walletAddress, 'address')}
                                        title="Click to copy address"
                                    >
                                        <div className="font-mono text-sm text-gray-100 break-all tracking-tight leading-relaxed">
                                            {walletAddress}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(walletAddress, 'address')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f0b90b] transition-colors flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f0b90b]/10 border border-[#333] hover:border-[#f0b90b]/30"
                                        title="Copy address"
                                        style={{color:"white"}}
                                    >
                                        {copiedAddress ? (
                                            <Check size={18} className="text-[#f0b90b]" />
                                        ) : (
                                            <Copy size={18} />
                                        )}
                                    </button>
                                    {/* notification */}
                                    {copiedAddress && (
                                        <span className="absolute top-2 right-2 bg-[#f0b90b] text-black text-xs font-medium px-2 py-1 rounded">
                                            Copied!
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Steps Card */}
                    <div className="bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] border border-[#f0b90b]/20 rounded-xl p-6 shadow-lg shadow-[#f0b90b]/5">
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-5 flex items-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f0b90b] mr-3 animate-pulse"></span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f0b90b] to-[#f8d35a]">
                                Payment Procedure
                            </span>
                        </h4>
                        <div className="space-y-4">
                            {[
                                "Copy the exact SOL amount and recipient wallet address provided above",
                                "Open your preferred Solana wallet (Phantom, Solflare, etc.) and initiate a transfer",
                                "Paste the copied details and verify all information before confirming",
                                "Once completed, click 'Confirm Payment' below to proceed with verification"
                            ].map((step, index) => (
                                <div key={index} className="flex items-start group">
                                    <div className="w-6 h-6 rounded-full bg-[#f0b90b]/10 text-[#f0b90b] flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 border border-[#f0b90b]/20 group-hover:bg-[#f0b90b]/20 transition-colors">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-300 text-sm sm:text-base group-hover:text-gray-100 transition-colors">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-7xl mx-auto px-4 py-6 border-t border-[#f0b90b]/10 mt-6">
                <div className="flex flex-col sm:flex-row justify-between gap-3 max-w-2xl mx-auto">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="py-3 px-6 text-center text-gray-300 hover:text-white transition-colors border border-[#333] rounded-lg text-sm sm:text-base hover:bg-[#1a1a1a]"
                    >
                        Cancel Order
                    </motion.button>
                    <motion.button
                        onClick={handleSentPayment}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="py-3 px-6 bg-[#f0b90b] text-black rounded-lg hover:bg-[#f0b90b]/90 transition-colors text-sm sm:text-base font-medium shadow-sm shadow-[#f0b90b]/20 flex items-center justify-center gap-2"
                    >
                        <Send size={16} />
                        I've Sent Payment
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Instructions;