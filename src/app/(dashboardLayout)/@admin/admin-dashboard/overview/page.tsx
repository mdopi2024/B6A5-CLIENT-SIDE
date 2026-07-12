import { getAllUsers } from '@/actions/auth.actions';
import { getallBooking } from '@/actions/booking.action';
import BookingsTrendChart from '@/components/module/admin/Overview';


const OverviewPage = async() => {

    const user = await getAllUsers()
    const booking = await getallBooking()
  
 
    return (
        <div>
         <BookingsTrendChart users={user} bookings={booking}></BookingsTrendChart>
        </div>
    );
};

export default OverviewPage;