import { getallBooking } from '@/actions/booking.action';
import AdminBookingTable from '@/components/module/admin/AdminBookingTable';
import React from 'react';

const BookingsPage = async() => {
    const {data}= await getallBooking()
    return (
        <div>
          <AdminBookingTable payload={data}></AdminBookingTable>
        </div>
    );
};

export default BookingsPage;