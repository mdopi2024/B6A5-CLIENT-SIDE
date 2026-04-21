import { roomService } from '@/services/room.services';
import Link from 'next/link';
import React from 'react';

const ViewDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await roomService.getRoomById(id);

  const isBooked = data.status === 'MAINTENANCE';

  return (
    <main className="min-h-screen bg-[#f5f2ed] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-[920px] animate-fade-up">

        {/* Back Button */}
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-[#042c53] hover:text-[#EF9F27] text-xs uppercase tracking-widest mb-7 font-medium transition-all group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Rooms
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_16px_rgba(4,44,83,0.07),0_32px_64px_rgba(4,44,83,0.10)]">

          {/* Image Section */}
          <div className="relative h-[360px] overflow-hidden group">

            {/* ✅ Null image fallback */}
            {data.images ? (
              <img
                src={data.images}
                alt={data.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#042c53] via-[#063a6e] to-[#0a4f96] flex flex-col items-center justify-center gap-3">
                <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
                <p className="text-white/30 text-sm tracking-widest uppercase font-medium">No Image Available</p>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,44,83,0.15)] to-[rgba(4,44,83,0.72)]" />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase bg-[rgba(239,159,39,0.18)] border border-[rgba(239,159,39,0.7)] text-[#EF9F27] backdrop-blur-md">
                {data.roomType}
              </span>
              <span className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase backdrop-blur-md border ${
                isBooked
                  ? 'bg-[rgba(239,68,68,0.18)] border-[rgba(239,68,68,0.6)] text-red-400'
                  : 'bg-[rgba(255,255,255,0.15)] border-[rgba(255,255,255,0.4)] text-white'
              }`}>
                ● {data.status}
              </span>
            </div>

            {/* Floor tag */}
            <div className="absolute top-5 right-5 bg-[rgba(4,44,83,0.55)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] rounded-lg px-3.5 py-1.5 text-white text-xs tracking-wide">
              🏢 Floor {data.floor}
            </div>

            {/* Price */}
            <div className="absolute bottom-6 right-6 text-right">
              <p className="text-[11px] text-white/60 uppercase tracking-widest mb-0.5">per night</p>
              <p className="font-['Playfair_Display'] text-[52px] font-bold text-[#EF9F27] leading-none">
                <sup className="text-xl font-normal align-super">৳</sup>
                {data.pricePerNight}
              </p>
              <p className="text-[12px] text-white/50 mt-0.5">taxes & fees included</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-10 pt-9 pb-10">

            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="font-['Playfair_Display'] text-[32px] font-bold text-[#042c53] leading-tight">
                {data.title}
              </h1>
              <span className="text-xs text-[#aaa] tracking-widest uppercase whitespace-nowrap mt-2 border border-[#e5e0d8] rounded-md px-2.5 py-1 bg-[#faf8f5]">
                Room No. {data.roomNumber}
              </span>
            </div>

            <p className="text-[#6b7280] text-[14.5px] leading-relaxed max-w-[580px] mb-7">
              {data.description} — a refined suite designed for the discerning traveler.
              Enjoy sweeping views from the {data.floor}th floor, premium {data.bedType} bedding,
              and all the elegance Bososto is known for.
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#e5e0d8] via-[#e5e0d8] to-transparent mb-7" />

            {/* Specs */}
            <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-3.5 mb-8">
              {[
                { icon: '🛏️', label: 'Bed Type', value: data.bedType },
                { icon: '👥', label: 'Capacity', value: `${data.capacity} Guests` },
                { icon: '🏢', label: 'Floor', value: `${data.floor}th` },
                { icon: '✨', label: 'Room Type', value: data.roomType },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="bg-[#f5f2ed] border-[1.5px] border-[#ede9e1] rounded-2xl p-4 hover:border-[#EF9F27] hover:shadow-[0_4px_16px_rgba(239,159,39,0.12)] hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-[22px] mb-2.5">{spec.icon}</div>
                  <p className="text-[10px] text-[#aaa] uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="text-[14px] text-[#042c53] font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 items-center">

              {/* ✅ Book Now — disabled if maintanace */}
              <button
                disabled={isBooked}
                className={`flex-1 py-4 px-8 rounded-xl text-[15px] font-medium tracking-wide transition-all
                  ${isBooked
                    ? 'bg-[#e5e0d8] text-[#bbb] cursor-not-allowed shadow-none'
                    : 'bg-[#042c53] hover:bg-[#063a6e] text-white shadow-[0_6px_20px_rgba(4,44,83,0.22)] hover:shadow-[0_10px_28px_rgba(4,44,83,0.3)] hover:-translate-y-0.5 active:translate-y-0'
                  }`}
              >
                {isBooked ? 'Currently Unavailable' : 'Book Now'}
              </button>

              {/* ✅ Animated floating hearts — non-clickable */}
              <div className="relative w-[54px] h-[54px] flex items-center justify-center select-none pointer-events-none">
                {/* Floating hearts */}
                <span className="absolute text-[11px] animate-float-1 opacity-0">❤️</span>
                <span className="absolute text-[9px]  animate-float-2 opacity-0">❤️</span>
                <span className="absolute text-[13px] animate-float-3 opacity-0">❤️</span>
                {/* Base heart */}
                <span className="text-[26px] animate-heartbeat drop-shadow-sm">❤️</span>
              </div>

            </div>

            {/* Review placeholder */}
            <div className="mt-7 p-5 bg-[#f5f2ed] border-[1.5px] border-dashed border-[#ddd8ce] rounded-2xl text-center text-[#aaa] text-sm tracking-wide">
              ⭐ <span className="text-[#EF9F27] font-medium">Guest Reviews</span> section coming soon
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewDetails;