/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type RawBooking = Record<string, any>;
type Range = 7 | 30 | 90;

// Either a raw array, or the { success, message, data } wrapper your
// server actions return — this component accepts both so you don't
// have to remember to unwrap `.data` every time you use it.
type ApiListInput<T> = T[] | { success?: boolean; message?: string; data?: T[] } | undefined | null;

const NAVY = "#042C53";
const AMBER = "#EF9F27";

function normalizeList<T>(input: ApiListInput<T>): T[] {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  return input.data ?? [];
}

// Parses a record's date field. Returns null (instead of silently
// defaulting to "now") if nothing recognizable is found, so bad data
// doesn't get miscounted as "today".
function getDate(b: RawBooking): Date | null {
  // 👉 match whichever date field your API actually returns
  const raw = b.createdAt ?? b.created_at ?? b.date ?? b.bookingDate;
  if (!raw) {
    return null;
  }
  const d = new Date(raw);
  if (isNaN(d.getTime())) {
    return null;
  }
  return d;
}

function getRevenue(b: RawBooking): number {
  // 👉 match whichever price field your API actually returns
  return Number(b.totalPrice ?? b.totalAmount ?? b.amount ?? b.price ?? 0) || 0;
}

// 👉 match whichever status field/values your API actually returns.
// Bookings that don't match any of these are still counted in the
// "total" stat but excluded from the status breakdown below.
function getStatus(b: RawBooking): "confirmed" | "pending" | "cancelled" | "other" {
  const raw = String(b.status ?? b.bookingStatus ?? "").toLowerCase();
  if (["confirmed", "completed", "approved"].includes(raw)) return "confirmed";
  if (["pending", "awaiting", "processing"].includes(raw)) return "pending";
  if (["cancelled", "canceled", "rejected"].includes(raw)) return "cancelled";
  return "other";
}

// Local Y-M-D key. Using this instead of toISOString().slice(0,10)
// avoids a day-shift bug: toISOString() converts to UTC first, so in
// timezones ahead of UTC (e.g. UTC+6), local midnight becomes the
// *previous* day in UTC and everything gets bucketed one day off.
function localKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function buildSeries(bookings: RawBooking[], range: Range) {
  const days: { key: string; label: string; bookings: number; revenue: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = range - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push({
      key: localKey(d),
      label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      bookings: 0,
      revenue: 0,
    });
  }

  const byKey = new Map(days.map((d) => [d.key, d]));

  for (const b of bookings) {
    const d = getDate(b);
    if (!d) continue;
    const bucket = byKey.get(localKey(d));
    if (bucket) {
      bucket.bookings += 1;
      bucket.revenue += getRevenue(b);
    }
  }

  return days;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const bookings = payload[0].payload.bookings;
  const revenue = payload[0].payload.revenue;
  return (
    <div className="rounded-xl bg-[#042C53] px-4 py-2.5 shadow-lg shadow-black/20 border border-white/10">
      <p className="text-white/60 text-[10px] font-medium uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-white font-bold text-sm">
        {bookings} booking{bookings === 1 ? "" : "s"}
      </p>
      <p className="text-white/70 text-xs">৳{revenue.toLocaleString()}</p>
    </div>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-12 h-12 rounded-2xl bg-[#042C53]/5 flex items-center justify-center mb-4">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={NAVY}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 3 3 5-6" />
        </svg>
      </div>
      <p className="text-[#042C53] font-bold text-sm mb-1">{title}</p>
      <p className="text-[#042C53]/50 text-xs max-w-[240px]">{subtitle}</p>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#042C53]/5 px-4 py-3 flex-1 min-w-[110px]">
      <p className="text-[#042C53]/50 text-[10px] font-semibold uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-[#042C53] font-black text-lg leading-none">{value}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Manager overview — bookings only (no users prop needed).
// Pure client-side chart, no data fetching happens here.
// Fetch in a Server Component (e.g. page.tsx) and pass the result
// straight through, either the raw array or the { success, data }
// wrapper your server actions return — both are accepted:
//
//   const booking = await getallBooking();
//   <ManagerBookingsOverview bookings={booking} />
// ─────────────────────────────────────────────────────────────
export default function ManagerBookingsOverview({
  bookings,
}: {
  bookings?: ApiListInput<RawBooking>;
}) {
  const bookingData = useMemo(() => normalizeList(bookings), [bookings]);
  const [range, setRange] = useState<Range>(30);

  const series = useMemo(() => buildSeries(bookingData, range), [bookingData, range]);

  const { totalBookings, totalRevenue, changePct } = useMemo(() => {
    const half = Math.floor(series.length / 2) || 1;
    const firstHalf = series.slice(0, half).reduce((s, d) => s + d.bookings, 0);
    const secondHalf = series.slice(half).reduce((s, d) => s + d.bookings, 0);
    const totalBookings = series.reduce((s, d) => s + d.bookings, 0);
    const totalRevenue = series.reduce((s, d) => s + d.revenue, 0);
    const changePct =
      firstHalf === 0 ? (secondHalf > 0 ? 100 : 0) : ((secondHalf - firstHalf) / firstHalf) * 100;
    return { totalBookings, totalRevenue, changePct };
  }, [series]);

  // Status breakdown is computed over the same range window as the chart,
  // filtering by date the same way buildSeries does, so the numbers line up.
  const statusCounts = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() - (range - 1));

    const counts = { confirmed: 0, pending: 0, cancelled: 0 };
    for (const b of bookingData) {
      const d = getDate(b);
      if (!d || d < cutoff) continue;
      const status = getStatus(b);
      if (status !== "other") counts[status] += 1;
    }
    return counts;
  }, [bookingData, range]);

  const isUp = changePct >= 0;
  const hasNoDataAtAll = bookingData.length === 0;
  const hasNoDataInRange = !hasNoDataAtAll && totalBookings === 0;

  return (
    <div className="w-full rounded-3xl border border-[#042C53]/10 bg-white p-5 md:p-7 shadow-sm">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[#042C53]/50 text-xs font-semibold uppercase tracking-wide mb-1.5">
            Bookings overview · last {range} days
          </p>
          <div className="flex items-end gap-3">
            <span className="text-[#042C53] font-black text-3xl leading-none">
              {totalBookings.toLocaleString()}
            </span>
            {!hasNoDataAtAll && (
              <span
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  isUp ? "text-[#042C53] bg-[#EF9F27]/20" : "text-[#042C53]/60 bg-[#042C53]/8"
                }`}
              >
                {isUp ? "↑" : "↓"} {Math.abs(changePct).toFixed(1)}%
              </span>
            )}
          </div>
        </div>

        {!hasNoDataAtAll && (
          <div className="flex bg-[#042C53]/5 rounded-xl p-1">
            {([7, 30, 90] as Range[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  range === r ? "bg-[#EF9F27] text-white" : "text-[#042C53]/60 hover:text-[#042C53]"
                }`}
              >
                {r}d
              </button>
            ))}
          </div>
        )}
      </div>

      {/* body */}
      {hasNoDataAtAll ? (
        <EmptyState
          title="No bookings yet"
          subtitle="Booking activity will show up here once requests start coming in."
        />
      ) : hasNoDataInRange ? (
        <EmptyState
          title={`No bookings in the last ${range} days`}
          subtitle="Try a different range above — your other data is still there."
        />
      ) : (
        <>
          {/* stat row */}
          <div className="flex flex-wrap gap-3 mb-6">
            <StatPill label="Revenue" value={`৳${totalRevenue.toLocaleString()}`} />
            <StatPill label="Confirmed" value={statusCounts.confirmed.toLocaleString()} />
            <StatPill label="Pending" value={statusCounts.pending.toLocaleString()} />
            <StatPill label="Cancelled" value={statusCounts.cancelled.toLocaleString()} />
          </div>

          {/* chart */}
          <div style={{ width: "100%", height: 260 }} className="-ml-2">
            <ResponsiveContainer width="100%" height="100%" debounce={1}>
              <AreaChart data={series} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="managerBookingsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={AMBER} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={AMBER} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke={`${NAVY}14`} vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: `${NAVY}80`, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  interval={range > 30 ? Math.floor(range / 8) : range > 10 ? 3 : 0}
                  minTickGap={20}
                />
                <YAxis
                  tick={{ fill: `${NAVY}80`, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: `${NAVY}20` }} />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke={NAVY}
                  strokeWidth={2.5}
                  fill="url(#managerBookingsFill)"
                  dot={false}
                  activeDot={{ r: 5, fill: AMBER, stroke: "#fff", strokeWidth: 2 }}
                  isAnimationActive
                  animationDuration={700}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}