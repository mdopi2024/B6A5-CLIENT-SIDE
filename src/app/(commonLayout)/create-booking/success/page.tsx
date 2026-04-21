import Link from "next/link";
import React from "react";

const SuccessPage = () => {
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

                /* icon — runs ONCE only */
                @keyframes drawCircle {
                    from { stroke-dashoffset: 166; }
                    to   { stroke-dashoffset: 0; }
                }
                @keyframes drawTick {
                    from { stroke-dashoffset: 50; }
                    to   { stroke-dashoffset: 0; }
                }

                /* pulse ring — runs ONCE after tick */
                @keyframes pulse {
                    0%   { transform: scale(1);    opacity: 0.6; }
                    100% { transform: scale(1.5);  opacity: 0; }
                }

                /* float — infinite gentle bob */
                @keyframes iconFloat {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-7px); }
                }

                /* confetti — infinite loop */
                @keyframes confettiFall {
                    0%   { opacity: 0; transform: translateY(-10px) rotate(0deg); }
                    10%  { opacity: 1; }
                    100% { opacity: 0; transform: translateY(100px) rotate(450deg); }
                }

                .card-animate  { animation: cardIn 0.5s cubic-bezier(.22,.68,0,1.2) both; }
                .icon-animate  { animation: popIn 0.6s 0.3s cubic-bezier(.22,.68,0,1.4) both; }
                .icon-float    { animation: iconFloat 3s 1.2s ease-in-out infinite; }

                .check-circle  {
                    stroke-dasharray: 166;
                    stroke-dashoffset: 166;
                    animation: drawCircle 0.7s 0.7s ease-out forwards;
                }
                .check-tick    {
                    stroke-dasharray: 50;
                    stroke-dashoffset: 50;
                    animation: drawTick 0.4s 1.3s ease-out forwards;
                }
                .pulse-ring-1  {
                    transform-origin: center;
                    animation: pulse 0.8s 1.7s ease-out forwards;
                }
                .pulse-ring-2  {
                    transform-origin: center;
                    animation: pulse 0.8s 2.0s ease-out forwards;
                }

                .confetti-piece {
                    position: absolute;
                    width: 7px;
                    height: 7px;
                    border-radius: 2px;
                    animation: confettiFall ease-in-out infinite;
                }
            `}</style>

            <div className="w-full max-w-md card-animate">
                <div className="bg-white rounded-2xl border border-[#042C53]/10 overflow-hidden">

                    <div className="h-[4px] bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

                    <div className="p-8 sm:p-10">

                        {/* CONFETTI — infinite */}
                        <div className="relative h-0 overflow-visible pointer-events-none">
                            {[...Array(22)].map((_, i) => {
                                const colors = ['#EF9F27','#042C53','#3B6D11','#FAC775','#B5D4F4','#C0DD97'];
                                return (
                                    <div
                                        key={i}
                                        className="confetti-piece"
                                        style={{
                                            left: `${4 + (i * 4.3) % 92}%`,
                                            top: `-28px`,
                                            background: colors[i % colors.length],
                                            animationDuration: `${1.6 + (i % 5) * 0.22}s`,
                                            animationDelay: `${(i * 0.21) % 3}s`,
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* ICON — animates once, then floats forever */}
                        <div className="flex justify-center mb-6">
                            <div className="icon-float">
                                <div
                                    className="icon-animate w-[88px] h-[88px] rounded-full flex items-center justify-center"
                                    style={{ background: '#EAF3DE', border: '1px solid rgba(59,109,17,0.2)' }}
                                >
                                    <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
                                        <circle className="pulse-ring-1" cx="50" cy="50" r="44" fill="none" stroke="#3B6D11" strokeWidth="1.5" opacity="0" />
                                        <circle className="pulse-ring-2" cx="50" cy="50" r="44" fill="none" stroke="#3B6D11" strokeWidth="1"   opacity="0" />
                                        <circle className="check-circle" cx="50" cy="50" r="42" fill="none" stroke="#3B6D11" strokeWidth="5" strokeLinecap="round" />
                                        <polyline className="check-tick" points="28,52 43,67 72,36" fill="none" stroke="#3B6D11" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-[#042C53] text-center leading-tight">
                            Payment Successful
                        </h1>

                        <p className="mt-3 text-sm text-[#5F5E5A] text-center leading-relaxed">
                            Your booking has been confirmed successfully.
                            A confirmation email has been sent to your registered email address.
                        </p>

                        <div className="mt-6 rounded-xl bg-[#F8F7F3] border border-[#042C53]/10 p-4">
                            <p className="text-[10px] uppercase tracking-widest text-[#8F8D86] font-medium">What's next?</p>
                            <ul className="mt-2 flex flex-col gap-1.5">
                                {["Check your booking details", "Save your reservation ID", "Contact support if needed"].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-[#042C53]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#EF9F27] shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/dashboard/my-booking"
                                className="flex-1 text-center px-4 py-2.5 rounded-xl bg-[#042C53] text-[#EF9F27] font-semibold text-sm hover:opacity-90 active:scale-95 transition"
                            >
                                View My Booking
                            </Link>
                            <Link
                                href="/"
                                className="flex-1 text-center px-4 py-2.5 rounded-xl border border-[#042C53]/20 text-[#042C53] font-semibold text-sm hover:bg-[#042C53]/5 active:scale-95 transition"
                            >
                                Go to Home
                            </Link>
                        </div>

                        <p className="mt-6 text-[11px] text-[#8F8D86] text-center">
                            Boshonto Hotel  &  Dining · Secure Payment System
                        </p>
                    </div>

                    <div className="h-[4px] bg-gradient-to-r from-[#EF9F27] to-[#042C53]" />
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;