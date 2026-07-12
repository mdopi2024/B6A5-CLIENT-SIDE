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
type RawUser = Record<string, any>;
type Metric = "bookings" | "revenue" | "users";
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
function getDate(b: RawBooking | RawUser): Date | null {
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

function buildSeries(bookings: RawBooking[], users: RawUser[], range: Range) {
  const days: {
    key: string;
    label: string;
    bookings: number;
    revenue: number;
    users: number;
  }[] = [];
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
      users: 0,
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

  for (const u of users) {
    const d = getDate(u);
    if (!d) continue;
    const bucket = byKey.get(localKey(d));
    if (bucket) {
      bucket.users += 1;
    }
  }

  return days;
}

function CustomTooltip({ active, payload, label, metric }: any) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  const text =
    metric === "revenue"
      ? `৳${value.toLocaleString()}`
      : metric === "users"
      ? `${value} new user${value === 1 ? "" : "s"}`
      : `${value} booking${value === 1 ? "" : "s"}`;
  return (
    <div className="rounded-xl bg-[#042C53] px-4 py-2.5 shadow-lg shadow-black/20 border border-white/10">
      <p className="text-white/60 text-[10px] font-medium uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-white font-bold text-sm">{text}</p>
    </div>
  );
}

const METRIC_LABELS: Record<Metric, string> = {
  bookings: "Bookings",
  revenue: "Revenue",
  users: "Total Users",
};

function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
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

// ─────────────────────────────────────────────────────────────
// This is a pure client-side chart — no data fetching happens here.
// Fetch in a Server Component (e.g. page.tsx) and pass the result
// straight through, either the raw array or the { success, data }
// wrapper your server actions return — both are accepted:
//
//   const user = await getAllUsers();
//   const booking = await getallBooking();
//   <BookingsTrendChart users={user} bookings={booking} />
// ─────────────────────────────────────────────────────────────
export default function BookingsTrendChart({
  bookings,
  users,
}: {
  bookings?: ApiListInput<RawBooking>;
  users?: ApiListInput<RawUser>;
}) {
  const bookingData = useMemo(() => normalizeList(bookings), [bookings]);
  const userData = useMemo(() => normalizeList(users), [users]);

  const [range, setRange] = useState<Range>(30);
  const [metric, setMetric] = useState<Metric>("bookings");

  const series = useMemo(
    () => buildSeries(bookingData, userData, range),
    [bookingData, userData, range]
  );

  const { total, changePct } = useMemo(() => {
    const half = Math.floor(series.length / 2) || 1;
    const firstHalf = series.slice(0, half).reduce((s, d) => s + d[metric], 0);
    const secondHalf = series.slice(half).reduce((s, d) => s + d[metric], 0);
    const total = series.reduce((s, d) => s + d[metric], 0);
    const changePct =
      firstHalf === 0 ? (secondHalf > 0 ? 100 : 0) : ((secondHalf - firstHalf) / firstHalf) * 100;
    return { total, changePct };
  }, [series, metric]);

  const isUp = changePct >= 0;

  // No records were fetched at all, for either bookings or users.
  const hasNoDataAtAll = bookingData.length === 0 && userData.length === 0;
  // Records exist, but none fall inside the currently selected range/metric.
  const hasNoDataInRange = !hasNoDataAtAll && total === 0;

  return (
    <div className="w-full rounded-3xl border border-[#042C53]/10 bg-white p-5 md:p-7 shadow-sm">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[#042C53]/50 text-xs font-semibold uppercase tracking-wide mb-1.5">
            {METRIC_LABELS[metric]} · last {range} days
          </p>
          <div className="flex items-end gap-3">
            <span className="text-[#042C53] font-black text-3xl leading-none">
              {metric === "revenue" ? `৳${total.toLocaleString()}` : total.toLocaleString()}
            </span>
            {!hasNoDataAtAll && (
              <span
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  isUp
                    ? "text-[#042C53] bg-[#EF9F27]/20"
                    : "text-[#042C53]/60 bg-[#042C53]/8"
                }`}
              >
                {isUp ? "↑" : "↓"} {Math.abs(changePct).toFixed(1)}%
              </span>
            )}
          </div>
        </div>

        {/* Hide the toggles entirely when there's no data at all — nothing
            useful to toggle between. Keep them when data exists but the
            current range/metric just happens to be empty, so the user can
            switch to a range/metric that does have data. */}
        {!hasNoDataAtAll && (
          <div className="flex flex-wrap items-center gap-2">
            {/* metric toggle */}
            <div className="flex bg-[#042C53]/5 rounded-xl p-1">
              {(["bookings", "revenue", "users"] as Metric[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetric(m)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    metric === m ? "bg-[#042C53] text-white" : "text-[#042C53]/60 hover:text-[#042C53]"
                  }`}
                >
                  {m === "users" ? "Users" : m === "revenue" ? "Revenue" : "Bookings"}
                </button>
              ))}
            </div>

            {/* range toggle */}
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
          </div>
        )}
      </div>

      {/* body: empty state OR chart */}
      {hasNoDataAtAll ? (
        <EmptyState
          title="No data yet"
          subtitle="Bookings and user data will show up here once they start coming in."
        />
      ) : hasNoDataInRange ? (
        <EmptyState
          title={`No ${METRIC_LABELS[metric].toLowerCase()} in the last ${range} days`}
          subtitle="Try a different range or metric above — your other data is still there."
        />
      ) : (
        <div style={{ width: "100%", height: 300 }} className="-ml-2">
          <ResponsiveContainer width="100%" height="100%" debounce={1}>
            <AreaChart data={series} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
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
                width={40}
                tickFormatter={(v) => (metric === "revenue" ? `৳${v}` : `${v}`)}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ stroke: `${NAVY}20` }} />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={NAVY}
                strokeWidth={2.5}
                fill="url(#bookingsFill)"
                dot={false}
                activeDot={{ r: 5, fill: AMBER, stroke: "#fff", strokeWidth: 2 }}
                isAnimationActive
                animationDuration={700}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}