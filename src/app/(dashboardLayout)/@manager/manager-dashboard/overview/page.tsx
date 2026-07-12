import { getallBooking } from '@/actions/booking.action';
import ManagerBookingsOverview from '@/components/module/manager/ManagerOverview';
import React from 'react';

const ManagerOverview = async () => {
    const booleanValue = await getallBooking();

    return (
        <div>
            <ManagerBookingsOverview bookings={booleanValue} />
        </div>
    );
};

export default ManagerOverview;