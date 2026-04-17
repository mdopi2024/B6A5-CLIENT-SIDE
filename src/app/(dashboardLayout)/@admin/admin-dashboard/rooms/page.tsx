import { getAllRooms } from '@/actions/room.action';
import AdminRoomTable from '@/components/module/admin/AdminRoomTable';



const Rooms =async () => {
const {data}=await getAllRooms()

    return (
        <div>
           <AdminRoomTable rooms={data}></AdminRoomTable>
        </div>
    );
};

export default Rooms;