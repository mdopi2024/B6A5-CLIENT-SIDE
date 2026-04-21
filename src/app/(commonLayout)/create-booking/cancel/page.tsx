import Link from "next/link";
import React from "react";

const CancelPage = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-10"
            style={{
                backgroundColor: "#F1EFE8",
                backgroundImage: "radial-gradient(circle, rgba(4,44,83,0.06) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
            }}
        >
            <style>{`
                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(24px) scale(0.97); }
                    to   { opacity: 1; transform: none; }
                }
                @keyframes popIn {
                    from { opacity: 0; transform: scale(0.4); }
                    to   { opacity: 1; transform: scale(1); }
                }

                /* icon — runs ONCE */
                @keyframes drawCircle {
                    from { stroke-dashoffset: 166; }
                    to   { stroke-dashoffset: 0; }
                }
                @keyframes drawX1 {
                    from { stroke-dashoffset: 50; }
                    to   { stroke-dashoffset: 0; }
                }
                @keyframes drawX2 {
                    from { stroke-dashoffset: 50; }
                    to   { stroke-dashoffset: 0; }
                }
                @keyframes pulse {
                    0%   { transform: scale(1);   opacity: 0.6; }
                    100% { transform: scale(1.5); opacity: 0; }
                }

                /* infinite */
                @keyframes iconFloat {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-7px); }
                }
                @keyframes particleFall {
                    0%   { opacity: 0; transform: translateY(-10px) rotate(0deg); }
                    10%  { opacity: 1; }
                    100% { opacity: 0; transform: translateY(100px) rotate(450deg); }
                }
                @keyframes shake {
                    0%,100% { transform: translateX(0); }
                    20%     { transform: translateX(-4px); }
                    40%     { transform: translateX(4px); }
                    60%     { transform: translateX(-3px); }
                    80%     { transform: translateX(3px); }
                }

                .card-animate { animation: cardIn 0.5s cubic-bezier(.22,.68,0,1.2) both; }
                .icon-animate { animation: popIn 0.6s 0.3s cubic-bezier(.22,.68,0,1.4) both; }
                .icon-float   { animation: iconFloat 3s 1.2s ease-in-out infinite; }
                .icon-shake   { animation: shake 0.5s 1s ease-in-out forwards; }

                .check-circle {
                    stroke-dasharray: 166;
                    stroke-dashoffset: 166;
                    animation: drawCircle 0.7s 0.7s ease-out forwards;
                }
                .x-line-1 {
                    stroke-dasharray: 50;
                    stroke-dashoffset: 50;
                    animation: drawX1 0.35s 1.3s ease-out forwards;
                }
                .x-line-2 {
                    stroke-dasharray: 50;
                    stroke-dashoffset: 50;
                    animation: drawX2 0.35s 1.6s ease-out forwards;
                }
                .pulse-ring-1 {
                    transform-origin: center;
                    animation: pulse 0.8s 1.9s ease-out forwards;
                }
                .pulse-ring-2 {
                    transform-origin: center;
                    animation: pulse 0.8s 2.2s ease-out forwards;
                }

                .particle {
                    position: absolute;
                    border-radius: 2px;
                    animation: particleFall ease-in-out infinite;
                }
            `}</style>

            <div className="w-full max-w-md card-animate">
                <div className="bg-white rounded-2xl border border-[#A32D2D]/10 overflow-hidden">

                    {/* TOP BAR */}
                    <div className="h-[4px] bg-gradient-to-r from-[#042C53] to-[#A32D2D]" />

                    <div className="p-8 sm:p-10">

                        {/* PARTICLES — infinite */}
                        <div className="relative h-0 overflow-visible pointer-events-none">
                            {[...Array(22)].map((_, i) => {
                                const colors = ['#A32D2D','#042C53','#E24B4A','#F09595','#B5D4F4','#F7C1C1'];
                                const sizes  = [5, 6, 7, 8];
                                return (
                                    <div
                                        key={i}
                                        className="particle"
                                        style={{
                                            left: `${4 + (i * 4.3) % 92}%`,
                                            top: `-28px`,
                                            width:  `${sizes[i % sizes.length]}px`,
                                            height: `${sizes[i % sizes.length]}px`,
                                            background: colors[i % colors.length],
                                            animationDuration: `${1.6 + (i % 5) * 0.22}s`,
                                            animationDelay: `${(i * 0.21) % 3}s`,
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* ICON — animates once, floats + shakes forever */}
                        <div className="flex justify-center mb-6">
                            <div className="icon-float">
                                <div className="icon-shake">
                                    <div
                                        className="icon-animate w-[88px] h-[88px] rounded-full flex items-center justify-center"
                                        style={{ background: '#FCEBEB', border: '1px solid rgba(163,45,45,0.2)' }}
                                    >
                                        <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
                                            <circle className="pulse-ring-1" cx="50" cy="50" r="44" fill="none" stroke="#A32D2D" strokeWidth="1.5" opacity="0" />
                                            <circle className="pulse-ring-2" cx="50" cy="50" r="44" fill="none" stroke="#A32D2D" strokeWidth="1"   opacity="0" />
                                            <circle className="check-circle" cx="50" cy="50" r="42" fill="none" stroke="#A32D2D" strokeWidth="5" strokeLinecap="round" />
                                            <line className="x-line-1" x1="32" y1="32" x2="68" y2="68" stroke="#A32D2D" strokeWidth="6" strokeLinecap="round" />
                                            <line className="x-line-2" x1="68" y1="32" x2="32" y2="68" stroke="#A32D2D" strokeWidth="6" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TITLE */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#A32D2D] text-center leading-tight">
                            Booking Cancelled
                        </h1>

                        <p className="mt-3 text-sm text-[#5F5E5A] text-center leading-relaxed">
                            Your booking has been cancelled successfully.
                            If you believe this is a mistake, please contact our support team.
                        </p>

                        {/* INFO BOX */}
                        <div className="mt-6 rounded-xl bg-[#FDF4F4] border border-[#A32D2D]/10 p-4">
                            <p className="text-[10px] uppercase tracking-widest text-[#8F8D86] font-medium">What happens next?</p>
                            <ul className="mt-2 flex flex-col gap-1.5">
                                {[
                                    "Refund will be processed within 5–7 business days",
                                    "You will receive a cancellation confirmation email",
                                    "Feel free to make a new booking anytime",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-[#042C53]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#A32D2D] shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* BUTTONS */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/rooms"
                                className="flex-1 text-center px-4 py-2.5 rounded-xl bg-[#042C53] text-[#EF9F27] font-semibold text-sm hover:opacity-90 active:scale-95 transition"
                            >
                                Browse Rooms
                            </Link>
                            <Link
                                href="/"
                                className="flex-1 text-center px-4 py-2.5 rounded-xl border border-[#042C53]/20 text-[#042C53] font-semibold text-sm hover:bg-[#042C53]/5 active:scale-95 transition"
                            >
                                Go to Home
                            </Link>
                        </div>

                        <p className="mt-6 text-[11px] text-[#8F8D86] text-center">
                            Boshonto Hotel & Dining · Secure Payment System
                        </p>
                    </div>

                    {/* BOTTOM BAR */}
                    <div className="h-[4px] bg-gradient-to-r from-[#A32D2D] to-[#042C53]" />
                </div>
            </div>
        </div>
    );
};

export default CancelPage;