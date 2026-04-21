"use server"

import { bookingServices } from "@/services/booking.services"
import { CreateBookingPayload } from "@/types/booking.interface";
import { revalidateTag } from "next/cache";

export const createBooking = async(value:CreateBookingPayload)=>{
    const result = await bookingServices.createBooking(value);
      return await result
}
export const getallBooking = async()=>{
    const result = await bookingServices.getAllbooking();
      return await result
}
export const getAllMyBooking = async()=>{
    const result = await bookingServices.getAllMyBooking();
      return await result
}
export const updateBookingStatus = async(id:string,payload:{bookingStatus:string})=>{
    const result = await bookingServices.updateBookingStatus(id as string, payload);
     revalidateTag('all-booking', "max")
      return await result
}
export const getBookingById = async(id:string)=>{
    const result = await bookingServices.getBookingById(id as string);
      return await result
}