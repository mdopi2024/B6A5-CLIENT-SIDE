'use client';

import { Room } from '@/types/room.interface';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const statusConfig = {
  AVAILABLE: { label: 'Available', color: '#3B6D11', bg: '#EAF3DE' },
  BOOKED: { label: 'Booked', color: '#185FA5', bg: '#E6F1FB' },
  MAINTENANCE: { label: 'Maintenance', color: '#BA7517', bg: '#FAEEDA' },
};

const RoomCard = ({ room }: { room: Room }) => {
  const status = statusConfig[room.status as keyof typeof statusConfig];
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="group rounded-2xl overflow-hidden border border-[#042C53]/10 bg-white shadow-sm hover:shadow-xl transition-all duration-300">

      {/* IMAGE */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        {room.images ? (
          <>
            {/* SKELETON / SHIMMER - ইমেজ লোড না হওয়া পর্যন্ত দেখাবে */}
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse">
                <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              </div>
            )}

            <Image
              src={room.images}
              alt={room.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              } transition-opacity duration-500`}
              onLoad={() => setIsImageLoading(false)}
            />
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">
            No Image Available
          </div>
        )}

        {/* STATUS BADGE */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-[11px] font-semibold z-10"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#042C53]">
            Room #{room.roomNumber}
          </h2>

          <span className="text-xs text-gray-500">
            Floor {room.floor ?? '-'}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {room.title}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{room.roomType}</span>
          <span>{room.bedType}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-[#042C53] font-bold">
            ৳{room.pricePerNight}
            <span className="text-xs text-gray-400"> /night</span>
          </p>

          <p className="text-xs text-gray-500">
            Cap: {room.capacity}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 pt-3">

          {room.status === "MAINTENANCE" ? (
            <span className="flex-1 py-2 rounded-lg text-sm font-semibold text-center bg-gray-300 text-gray-500 cursor-not-allowed">
              Book Now
            </span>
          ) : (
            <Link
              href={`/create-booking/${room.id}`}
              className="flex-1 py-2 rounded-lg text-sm font-semibold text-center bg-[#EF9F27] text-white hover:bg-[#d98c1f] transition-all"
            >
              Book Now
            </Link>
          )}

          <Link
            href={`/rooms/${room.id}`}
            className="flex-1 py-2 rounded-lg text-sm font-semibold border border-[#042C53] text-[#042C53] text-center hover:bg-[#042C53] hover:text-white transition-all"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
};

export default RoomCard;