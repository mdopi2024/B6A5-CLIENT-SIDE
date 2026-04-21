/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IBooking } from "@/types/booking.interface";
import Link from "next/link";
import { useState } from "react";

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

const ManagerBookingTable = ({ payload }: { payload: IBooking[] }) => {
  const [statuses] = useState<Record<string, BookingStatus>>(
    Object.fromEntries(
      payload.map((b) => [
        b.id,
        (b.bookingStatus as BookingStatus) ?? "PENDING",
      ])
    )
  );

  const total = payload.length;
  const pending = payload.filter((b) => b.bookingStatus === "PENDING").length;
  const confirmed = payload.filter((b) => b.bookingStatus === "CONFIRMED").length;

  return (
    <div className="rounded-2xl overflow-hidden border border-[#042C53]/10">

      {/* TOP GRADIENT */}
      <div className="h-[3px] bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

      {/* HEADER */}
      <div className="bg-[#042C53] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#EF9F27]/12 border border-[#EF9F27]/30 flex items-center justify-center">
            📑
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Booking management</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">
              Boshonto Hotel & Dining
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 divide-x border-b border-[#042C53]/10">
        <div className="px-5 py-3">
          <p className="text-[10px] uppercase text-[#B4B2A9]">Total bookings</p>
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

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ minWidth: 700 }}>

          <thead>
            <tr className="bg-[#F1EFE8]">
              {["Guest", "Room", "Dates", "Price", "Booking", "Payment", "Action"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-[10px] uppercase text-[#5F5E5A]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {payload.map((booking) => {
              const status =
                (statuses[booking.id] as BookingStatus) ?? "PENDING";

              const s =
                statusConfig[status] ?? {
                  label: "Unknown",
                  bg: "#E5E7EB",
                  color: "#374151",
                };

              const p =
                paymentConfig[booking.paymentStatus as keyof typeof paymentConfig] ?? {
                  label: "Unknown",
                  bg: "#E5E7EB",
                  color: "#374151",
                };

              return (
                <tr key={booking.id} className="border-b hover:bg-[#F8F7F3]">

                  {/* Guest */}
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#042C53]">
                      {booking.user.name}
                    </p>
                    <p className="text-[11px] text-[#8F8D86]">
                      {booking.user.email}
                    </p>
                  </td>

                  {/* Room */}
                  <td className="px-4 py-3">
                    <p className="font-medium">#{booking.room.roomNumber}</p>
                    <p className="text-[11px] text-[#8F8D86]">
                      {booking.room.title}
                    </p>
                  </td>

                  {/* Dates */}
                  <td className="px-4 py-3 text-[12px]">
                    {new Date(booking.checkInDate).toLocaleDateString()} →
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                    <p className="text-[10px] text-[#8F8D86]">
                      {booking.totalNights} nights
                    </p>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 font-semibold text-[#042C53]">
                    ৳{booking.totalPrice}
                  </td>

                  {/* Booking Status */}
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-[11px] font-semibold"
                      style={{ background: s.bg, color: s.color }}
                    >
                      {s.label}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-[11px] font-semibold"
                      style={{ background: p.bg, color: p.color }}
                    >
                      {p.label}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-4 py-3">
                    <Link
                      href={`/manager-dashboard/bookings/${booking.id}`}
                      className="px-3 py-1.5 text-[11px] rounded-lg font-medium bg-[#042C53] text-[#EF9F27] hover:opacity-90 active:scale-95 transition"
                    >
                      Update booking status
                    </Link>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* BOTTOM GRADIENT */}
      <div className="h-[3px] bg-gradient-to-r from-[#EF9F27] to-[#042C53]" />
    </div>
  );
};

export default ManagerBookingTable;