"use client";

import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#042C53] text-white mt-20">

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* BRAND */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Bosonto <span className="text-[#EF9F27]">Hotel</span>
                        </h2>

                        <p className="mt-4 text-gray-300 text-sm">
                            Luxury stay experience with comfort and care.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/rooms">Rooms</Link></li>
                        </ul>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Services</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>Luxury Rooms</li>
                            <li>24/7 Service</li>
                            <li>Restaurant</li>
                            <li>Free WiFi</li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>📍 Kaliganj, Dhaka</li>
                            <li>📞 +880 1XXXXXXXXX</li>
                            <li>💌 support@bosontohotel.com</li>
                        </ul>
                    </div>

                </div>

                {/* BOTTOM SECTION */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">

                    <p>
                        © {new Date().getFullYear()} Bosonto Hotel. All rights reserved.
                    </p>

                    {/* ❤️ CORNER STYLE MESSAGE */}
                    <div className="relative mt-6 md:mt-0 bg-white/5 px-4 py-2 rounded-lg overflow-hidden">

                        {/* FLOATING HEARTS */}
                        <div className="absolute inset-0 pointer-events-none">
                            <span className="animate-float-1 text-[#EF9F27] text-lg">❤️</span>
                            <span className="animate-float-2 text-[#EF9F27] text-base">❤️</span>
                            <span className="animate-float-3 text-[#EF9F27] text-lg">❤️</span>
                        </div>

                        {/* TEXT (STAYS CLEAR ALWAYS) */}
                        <p className="relative z-10 text-center px-6">
                            Thanks for visiting <span className="text-[#EF9F27] font-semibold">Bosonto Hotel</span>
                        </p>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;