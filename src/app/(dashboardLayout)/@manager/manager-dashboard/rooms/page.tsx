import { getAllRooms } from '@/actions/room.action';
import React from 'react';

const Rooms = async() => {
    const {data} = await getAllRooms()
    console.log(data)
    return (
        <div>
            i am rooms page
        </div>
    );
};

export default Rooms;