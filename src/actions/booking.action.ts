"use server"

import { bookingServices } from "@/services/booking.services"
import { CreateBookingPayload } from "@/types/booking.interface";

export const createBooking = async(value:CreateBookingPayload)=>{
    const result = await bookingServices.createBooking(value);
      return await result
}