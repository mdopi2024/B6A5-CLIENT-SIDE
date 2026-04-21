import { Room } from '@/types/room.interface';
import Link from 'next/link';

const statusConfig = {
  AVAILABLE: { label: 'Available', color: '#3B6D11', bg: '#EAF3DE' },
  BOOKED: { label: 'Booked', color: '#185FA5', bg: '#E6F1FB' },
  MAINTENANCE: { label: 'Maintenance', color: '#BA7517', bg: '#FAEEDA' },
};

const RoomCard = ({ room }: { room: Room }) => {
  const status = statusConfig[room.status as keyof typeof statusConfig];

  return (
    <div className="group rounded-2xl overflow-hidden border border-[#042C53]/10 bg-white shadow-sm hover:shadow-xl transition-all duration-300">

      {/* IMAGE */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        {room.images ? (
          <img
            src={room.images}
            alt={room.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">
            No Image Available
          </div>
        )}

        {/* STATUS BADGE */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-[11px] font-semibold"
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

          {/* BOOK NOW */}
          <Link
            href={`/create-booking/${room.id}`}
            className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all text-center bg-[#EF9F27] text-white hover:bg-[#d98c1f]"
          >
            Book Now
          </Link>

          {/* VIEW DETAILS */}
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