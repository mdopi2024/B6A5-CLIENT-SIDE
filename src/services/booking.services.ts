
import { env } from "@/env";
import { CreateBookingPayload } from "@/types/booking.interface";
import { cookie } from "@/utils/cookie";


const Env = env
export const bookingServices = {
  createBooking: async (data:CreateBookingPayload) => {
    try {
      const response = await fetch(`${Env.API_URL}/booking/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookie(),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  },


}