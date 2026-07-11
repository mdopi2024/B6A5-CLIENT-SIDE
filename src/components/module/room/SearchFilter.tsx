'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useRef, useTransition } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'createdAt-desc' },
  { label: 'Oldest First', value: 'createdAt-asc' },
  { label: 'Price: Low to High', value: 'pricePerNight-asc' },
  { label: 'Price: High to Low', value: 'pricePerNight-desc' },
  { label: 'Capacity: Low to High', value: 'capacity-asc' },
  { label: 'Capacity: High to Low', value: 'capacity-desc' },
];

const RoomFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchInput, setSearchInput] = useState(
    searchParams.get('searchTerm') || ''
  );
  const isFirstRender = useRef(true);

  const currentSort = `${searchParams.get('sortBy') || 'createdAt'}-${
    searchParams.get('sortOrder') || 'desc'
  }`;

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      params.set('page', '1');
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    // Skip the debounce push on initial mount — avoids resetting
    // page=1 before the user has typed anything.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      updateParams({ searchTerm: searchInput || null });
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    updateParams({ sortBy, sortOrder });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-[0_2px_20px_rgba(4,44,83,0.06)] border border-[#042C53]/10">
      {/* SEARCH */}
      <div className="relative flex-1 max-w-md group">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#EF9F27]/0 via-[#EF9F27]/0 to-[#EF9F27]/0 group-focus-within:from-[#EF9F27]/10 group-focus-within:via-transparent group-focus-within:to-transparent transition-all duration-300 pointer-events-none" />

        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#042C53]/40 group-focus-within:text-[#EF9F27] transition-colors duration-200"
          size={18}
        />

        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by title or description..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#042C53]/10 bg-white text-sm text-[#042C53]
                     placeholder:text-gray-400
                     shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-[#EF9F27]/40 focus:border-[#EF9F27]/60
                     transition-all duration-200"
        />

        {/* Loading spinner while navigation/search is in flight */}
        {isPending && (
          <Loader2
            className="absolute right-9 top-1/2 -translate-y-1/2 text-[#EF9F27] animate-spin"
            size={16}
          />
        )}

        {searchInput && !isPending && (
          <button
            onClick={() => setSearchInput('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#042C53] transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* SORT */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 whitespace-nowrap hidden sm:block">
          Sort by
        </label>
        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none border border-[#042C53]/10 rounded-xl pl-3.5 pr-9 py-3  text-sm font-medium text-[#042C53]
                       bg-white shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-[#EF9F27]/40 focus:border-[#EF9F27]/60
                       cursor-pointer transition-all duration-200"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="hover:bg-[#EF9F27]">
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#042C53]/40"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RoomFilters;