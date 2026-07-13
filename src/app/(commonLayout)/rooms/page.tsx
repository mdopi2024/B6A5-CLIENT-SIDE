import Footer from '@/components/module/home/Footer';
import Pagination from '@/components/module/room/Paginations';
import RoomCard from '@/components/module/room/RoomCard';
import RoomFilters from '@/components/module/room/SearchFilter';
import { roomService } from '@/services/room.services';
import { Room } from '@/types/room.interface';

interface RoomPageProps {
  searchParams: Promise<{
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    limit?: string;
  }>;
}

const RoomPage = async ({ searchParams }: RoomPageProps) => {
  const resolvedSearchParams = await searchParams;

  const {
    searchTerm = '',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = '1',
    limit = '10',
  } = resolvedSearchParams;

  const { data, meta } = await roomService.getAllRooms({
    searchTerm,
    sortBy,
    sortOrder,
    page: Number(page),
    limit: Number(limit),
  });


  return (
    <div className="min-h-scree p-4 md:p-3">

      {/* ---------- TOP: Heading + Search bar / Sort ---------- */}
      <div className="mb-6">
        
        <p className="text-[#042C53] mt-1 font-semibold">
          Available Rooms  :  <span className='text-[#EF9F27]'>{meta.total ?? 0}</span> 
        </p>
      </div>

      <RoomFilters />

      {/* ---------- MIDDLE: Room Cards ---------- */}
      {data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
          {data.map((room: Room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-[#042C53]">No rooms found</p>
          <p className="text-gray-500 text-sm mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* ---------- BOTTOM: Pagination ---------- */}
      {meta && meta.totalPages > 1 && (
        <Pagination currentPage={meta.page} totalPages={meta.totalPages} />
      )}
    </div>
  );
};

export default RoomPage;