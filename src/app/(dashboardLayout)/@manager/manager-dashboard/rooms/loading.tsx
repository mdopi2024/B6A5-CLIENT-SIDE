"use client";

import React from "react";

const RoomLoading = () => {
  return (
    <div className="flex items-center justify-center h-[70vh] w-full">
      <div className="flex flex-col items-center gap-5">
        {/* Fancy Spinner */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-[3px] border-[#042C53]/20"></div>
          <div className="w-14 h-14 rounded-full border-[3px] border-[#EF9F27] border-t-transparent animate-spin absolute top-0 left-0"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-semibold text-[#042C53]">
            Loading Room Management
          </p>
          <p className="text-[12px] text-[#888780] mt-1">
            Fetching rooms and availability data...
          </p>
        </div>

        {/* Optional subtle shimmer bar (matches your UI tone) */}
        <div className="w-40 h-1 rounded-full bg-gradient-to-r from-[#042C53]/10 via-[#EF9F27]/40 to-[#042C53]/10 animate-pulse"></div>
      </div>
    </div>
  );
};

export default RoomLoading;