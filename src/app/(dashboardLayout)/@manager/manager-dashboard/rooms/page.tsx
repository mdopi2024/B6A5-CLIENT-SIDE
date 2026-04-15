import { getAllRooms } from '@/actions/room.action';
import RoomTable from '@/components/module/shared/RoomTable';
import React from 'react';

const Rooms = async() => {
    const {data} = await getAllRooms()

    return (
        <div>
            <RoomTable rooms={data}></RoomTable>
        </div>
    );
};

export default Rooms;