/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Room } from '@/types/room.interface';
import { toast } from 'sonner';
import Link from 'next/link';
import { deleteRoom } from '@/actions/room.action';

const statusConfig = {
  AVAILABLE: { label: 'Available', dot: '#639922', bg: '#EAF3DE', color: '#3B6D11' },
  MAINTENANCE: { label: 'Maintenance', dot: '#BA7517', bg: '#FAEEDA', color: '#854F0B' },
};

const RoomTable = ({ rooms }: { rooms: Room[] }) => {

  const available = rooms.filter(r => r.status === 'AVAILABLE').length;
  const maintenance = rooms.filter(r => r.status === 'MAINTENANCE').length;

  const handleDeleteRoom = async (id: string) => {
    const toastId = toast.loading("Deleting room in process...");
    try {
      const res = await deleteRoom(id);

      if (!res?.success) {
        toast.error(res.message || "Failed to delete room", { id: toastId });
        return;
      }

      toast.success(res.message || "Room deleted successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-[#042C53]/10">

      <div className="h-[3px] bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

      {/* HEADER */}
      <div className="bg-[#042C53] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#EF9F27]/12 border border-[#EF9F27]/28 flex items-center justify-center">
            🛏️
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Room management</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">
              Boshonto Hotel & Dining
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 divide-x divide-[#042C53]/08 border-b border-[#042C53]/08">

        <div className="px-5 py-3">
          <p className="text-[10px] uppercase text-[#B4B2A9]">Total rooms</p>
          <p className="text-xl font-semibold text-[#042C53]">{rooms.length}</p>
        </div>

        <div className="px-5 py-3">
          <p className="text-[10px] uppercase text-[#B4B2A9]">Available</p>
          <p className="text-xl font-semibold text-[#3B6D11]">{available}</p>
        </div>

        <div className="px-5 py-3">
          <p className="text-[10px] uppercase text-[#B4B2A9]">Maintenance</p>
          <p className="text-xl font-semibold text-[#854F0B]">{maintenance}</p>
        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ minWidth: 700 }}>

          <thead>
            <tr className="bg-[#F1EFE8]">
              {['Image','Room no.','Title','Type','Bed','Floor','Cap.','Price/night','Status','Actions'].map(h => (
                <th key={h} className="px-4 py-2 text-left text-[10px] uppercase text-[#5F5E5A]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rooms.map(room => {
              const s = statusConfig[room.status as keyof typeof statusConfig];

              return (
                <tr key={room.id} className="border-b hover:bg-[#F8F7F3]">

                  <td className="px-4 py-3">
                    {room.images ? (
                      <img src={room.images} className="w-12 h-12 rounded-md object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-[10px]">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3 font-semibold text-[#042C53]">
                    #{room.roomNumber}
                  </td>

                  <td className="px-4 py-3">{room.title}</td>

                  <td className="px-4 py-3">{room.roomType}</td>

                  <td className="px-4 py-3">{room.bedType}</td>

                  <td className="px-4 py-3">{room.floor}</td>

                  <td className="px-4 py-3">{room.capacity}</td>

                  <td className="px-4 py-3 font-semibold text-[#042C53]">
                    ৳{room.pricePerNight}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-[11px] font-semibold"
                      style={{ background: s.bg, color: s.color }}
                    >
                      {s.label}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">

                      <Link
                        href={`/manager-dashboard/update-room/${room.id}`}
                        className="px-3 py-1 bg-[#042C53] text-[#EF9F27] rounded-lg text-[11px]"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-[11px]"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      <div className="h-[3px] bg-gradient-to-r from-[#EF9F27] to-[#042C53]" />
    </div>
  );
};

export default RoomTable;