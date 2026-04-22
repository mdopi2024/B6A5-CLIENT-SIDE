/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateBookingStatus} from "@/actions/booking.action";
import { IBooking } from "@/types/booking.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "CHECKED_IN"
  | "CHECKED_OUT";

const statusConfig = {
  PENDING: { label: "Pending", bg: "#FAEEDA", color: "#854F0B" },
  CONFIRMED: { label: "Confirmed", bg: "#EAF3DE", color: "#3B6D11" },
  CANCELLED: { label: "Cancelled", bg: "#FDEAEA", color: "#B42318" },
  CHECKED_IN: { label: "Checked In", bg: "#E6F0FF", color: "#1D4ED8" },
  CHECKED_OUT: { label: "Checked Out", bg: "#EDE9FE", color: "#6D28D9" },
};

const paymentConfig = {
  PAID: { label: "Paid", bg: "#EAF3DE", color: "#3B6D11" },
  UNPAID: { label: "Unpaid", bg: "#FDEAEA", color: "#B42318" },
};

const GuestBookingTable = ({ payload }: { payload: IBooking[] }) => {
  const router = useRouter();

  // ✅ State নেই — সরাসরি payload থেকে data
  const total = payload.length;
  const pending = payload.filter((b) => b.bookingStatus === "PENDING").length;
  const confirmed = payload.filter((b) => b.bookingStatus === "CONFIRMED").length;

  const handleCancelBooking = async (value: string, id: string) => {
    const toastId = toast.loading("Cancelling booking...");
    try {
      const res = await updateBookingStatus(id, { bookingStatus: value });

      if (!res.success) {
        toast.error("Booking cancelled Failed", { id: toastId });
        return;
      }

      toast.success("Booking cancelled successfully", { id: toastId });
      router.refresh(); // ✅ Server থেকে fresh data আনবে
    } catch (error: any) {
      toast.error(error?.message || "Failed to cancel booking", {
        id: toastId,
      });
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-[#042C53]/10">
      <div className="h-[3px] bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

      <div className="bg-[#042C53] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#EF9F27]/12 border border-[#EF9F27]/30 flex items-center justify-center">
            📑
          </div>
          <div>
            <p className="text-white text-sm font-semibold">My Bookings</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">
              Boshonto Hotel & Dining
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x border-b border-[#042C53]/10">
        <div className="px-5 py-3">
          <p className="text-[10px] uppercase text-[#B4B2A9]">Total</p>
          <p className="text-xl font-semibold text-[#042C53]">{total}</p>
        </div>
        <div className="px-5 py-3">
          <p className="text-[10px] uppercase text-[#B4B2A9]">Pending</p>
          <p className="text-xl font-semibold text-[#854F0B]">{pending}</p>
        </div>
        <div className="px-5 py-3">
          <p className="text-[10px] uppercase text-[#B4B2A9]">Confirmed</p>
          <p className="text-xl font-semibold text-[#3B6D11]">{confirmed}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" style={{ minWidth: 700 }}>
          <thead>
            <tr className="bg-[#F1EFE8]">
              {["Room", "Dates", "Price", "Booking", "Payment", "Action"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-[10px] uppercase text-[#5F5E5A]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {payload.map((booking) => {
              // ✅ সরাসরি payload থেকে নিচ্ছে
              const bookingStatus = (booking.bookingStatus as BookingStatus) ?? "PENDING";
              const s = statusConfig[bookingStatus];
              const p = paymentConfig[booking.paymentStatus as keyof typeof paymentConfig];

              const canCancel = bookingStatus === "PENDING";
              const canReview = bookingStatus === "CHECKED_OUT";

              return (
                <tr key={booking.id} className="border-b hover:bg-[#F8F7F3]">
                  <td className="px-4 py-3">
                    <p className="font-medium">#{booking.room.roomNumber}</p>
                    <p className="text-[11px] text-[#8F8D86]">{booking.room.title}</p>
                  </td>

                  <td className="px-4 py-3 text-[12px]">
                    {new Date(booking.checkInDate).toLocaleDateString()} →
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                    <p className="text-[10px] text-[#8F8D86]">{booking.totalNights} nights</p>
                  </td>

                  <td className="px-4 py-3 font-semibold text-[#042C53]">
                    ৳{booking.totalPrice}
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
                    <span
                      className="px-2 py-1 rounded-full text-[11px] font-semibold"
                      style={{ background: p.bg, color: p.color }}
                    >
                      {p.label}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleCancelBooking("CANCELLED", booking.id)}
                      disabled={!canCancel}
                      className={`px-3 py-1.5 text-[11px] rounded-lg font-medium transition
                        ${canCancel
                          ? "bg-red-500 text-white hover:opacity-90"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      Cancel
                    </button>

                    <Link
                      href={`/dashboard/review/${booking.roomId}`}
                      onClick={(e) => {
                        if (!canReview) e.preventDefault();
                      }}
                      className={`px-3 py-1.5 text-[11px] rounded-lg font-medium transition
                        ${canReview
                          ? "bg-[#042C53] text-[#EF9F27] hover:opacity-90"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                        }`}
                    >
                      Review
                    </Link>
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

export default GuestBookingTable;