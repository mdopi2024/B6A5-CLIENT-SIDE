import RoomCard from '@/components/module/room/RoomCard';
import { roomService } from '@/services/room.services';
import { Room } from '@/types/room.interface';

const RoomPage = async () => {
  const { data } = await roomService.getAllRooms();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4">
      {data?.map((room: Room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomPage;