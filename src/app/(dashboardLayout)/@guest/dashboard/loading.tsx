"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EFE8]">
      
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-[#042C53]/20 border-t-[#042C53] rounded-full animate-spin" />
        
        {/* Text */}
        <p className="text-sm text-[#042C53]/70 tracking-wide">
          Loading profile...
        </p>

      </div>
      
    </div>
  );
};

export default Loading;