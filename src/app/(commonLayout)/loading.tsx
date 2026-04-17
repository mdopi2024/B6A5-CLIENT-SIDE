"use client";

import React from "react";

const FullScreenLoader = () => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: "#F1EFE8",
        backgroundImage:
          "radial-gradient(circle, rgba(4,44,83,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="flex flex-col items-center gap-5">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-semibold text-[#042C53] tracking-wide">
          Boshonto Hotel
        </div>

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-[#042C53]/20 border-t-[#042C53] rounded-full animate-spin" />

        {/* Text */}
        <p className="text-sm text-[#042C53]/70 tracking-wide">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default FullScreenLoader;