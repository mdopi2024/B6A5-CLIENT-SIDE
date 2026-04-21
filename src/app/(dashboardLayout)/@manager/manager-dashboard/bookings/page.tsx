import { getallBooking } from '@/actions/booking.action';
import ManagerBookingTable from '@/components/module/manager/ManagerBookingTable';





const Booking = async() => {
    const  {data}= await getallBooking()
    return (
        <div>
            <ManagerBookingTable payload={data}></ManagerBookingTable>
        </div>
    );
};

export default Booking;