
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
   getAllbooking: async () => {
      try {
        const response = await fetch(`${Env.API_URL}/booking/all`, {
          headers:{
            Cookie:await cookie()
          },
          next: { tags: ['all-booking'] }
        });
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    },
  //   deleteRoom: async (id: string) => {
  //     try {
  //       const response = await fetch(`${Env.API_URL}/room/delete-room/${id}`, {
  //         method: 'DELETE',
  //         headers: {
  //           Cookie: await cookie()
  //         },
  //       });
  //       const result = await response.json();
  //       return result;
  //     } catch (error) {
  //       return error;
  //     }
  //   },
    getBookingById: async (id: string) => {
      try {
        const response = await fetch(`${Env.API_URL}/booking/${id}`,{
          headers:{
            Cookie:await cookie()
          }
        });
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    },
    updateBookingStatus: async (id: string, payload:{bookingStatus:string}) => {
      try {
        const response = await fetch(`${Env.API_URL}/booking/status/${id}`,{
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Cookie: await cookie(),
          },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    },


}