/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Room } from '@/types/room.interface';
import { toast } from 'sonner';
import { deleteRoom } from '@/actions/room.action';

const statusConfig = {
  AVAILABLE: { label: 'Available', dot: '#639922', bg: '#EAF3DE', color: '#3B6D11' },
  BOOKED: { label: 'Booked', dot: '#185FA5', bg: '#E6F1FB', color: '#185FA5' },
  MAINTENANCE: { label: 'Maintenance', dot: '#BA7517', bg: '#FAEEDA', color: '#854F0B' },
};

const RoomTable = ({ rooms }: { rooms: Room[] }) => {
  const available = rooms.filter(r => r.status === 'AVAILABLE').length;
  const booked = rooms.filter(r => r.status === 'BOOKED').length;

  const handleDeleteRoom = async (id: string) => {
    const toastId = toast.loading("Deleting room in process...");

    try {
      // example API call (replace with your real service)
      const res = await deleteRoom(id);

      if (!res?.success) {
          toast.error(res.message || "Failed to delete room", { id: toastId, });
      }

      toast.success(res.message ||"Room deleted successfully", {
        id: toastId,
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-[#042C53]/10">
      <div className="h-[3px] bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

      {/* Header */}
      <div className="bg-[#042C53] px-5 py-4 flex items-center justify-between relative overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '18px 18px' }}>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#EF9F27]/12 border border-[#EF9F27]/28 flex items-center justify-center text-base">🛏️</div>
          <div>
            <p className="text-white text-sm font-semibold">Room management</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">Boshonto Hotel & Dining</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#EF9F27]/35 to-transparent" />

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-[#042C53]/08 border-b border-[#042C53]/08">
        {[
          { label: 'Total rooms', value: rooms.length, color: '#042C53' },
          { label: 'Available', value: available, color: '#3B6D11' },
          { label: 'Booked', value: booked, color: '#185FA5' },
        ].map(s => (
          <div key={s.label} className="px-5 py-3">
            <p className="text-[10px] uppercase tracking-widest text-[#B4B2A9] font-medium">{s.label}</p>
            <p className="text-xl font-semibold mt-0.5" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: 700 }}>
          <thead>
            <tr className="bg-[#F1EFE8]">
              {['Room no.', 'Title', 'Type', 'Bed', 'Floor', 'Cap.', 'Price/night', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-[#5F5E5A] border-b border-[#042C53]/08 whitespace-nowrap last:text-center">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rooms.map(room => {
              const s = statusConfig[room.status as keyof typeof statusConfig];
              return (
                <tr key={room.id} className="border-b border-[#042C53]/06 last:border-0 hover:bg-[#F8F7F3] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold text-[#042C53]">#{room.roomNumber}</p>
                    <p className="text-[11px] text-[#888780]">Floor {room.floor}</p>
                  </td>

                  <td className="px-4 py-3 text-[13px] max-w-[160px] truncate">{room.title}</td>

                  <td className="px-4 py-3">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F1EFE8] text-[#5F5E5A] border border-[#042C53]/10">
                      {room.roomType}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#888780]">{room.bedType}</td>

                  <td className="px-4 py-3 text-[13px] text-[#5F5E5A]">{room.floor}</td>

                  <td className="px-4 py-3 text-[13px] text-[#5F5E5A]">{room.capacity}</td>

                  <td className="px-4 py-3">
                    <span className="text-[13px] font-semibold text-[#042C53]">৳{room.pricePerNight}</span>
                    <span className="text-[11px] text-[#b4b2a9]"> /night</span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                      style={{ background: s.bg, color: s.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                      {s.label}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">

                      {/* Edit Button */}
                      <button
                        onClick={() => {/* handle edit */ }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#042C53] text-[#EF9F27] text-[11px] font-semibold transition-all duration-200 hover:bg-[#053b6f] hover:scale-105 active:scale-95"
                      >
                        ✏️ Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() =>handleDeleteRoom(room.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FCEBEB] text-[#A32D2D] border border-[#F09595] text-[11px] font-semibold transition-all duration-200 hover:bg-[#f8dada] hover:scale-105 active:scale-95"
                      >
                        🗑 Delete
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