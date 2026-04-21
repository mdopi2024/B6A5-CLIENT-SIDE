import { getAllMyBooking } from '@/actions/booking.action';
import GuestBookingTable from '@/components/module/guest/GuestBookingTable';
import React from 'react';

const page = async() => {
    const {data}= await getAllMyBooking()
    return (
        <div>
          <GuestBookingTable payload={data}></GuestBookingTable>
        </div>
    );
};

export default page;