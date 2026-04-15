"use server"
import { roomService } from "@/services/room.services";
import { CreateRoomFormValues } from "@/types/room.interface";



export const createRoom = async (data: CreateRoomFormValues) => {
    const result = await roomService.createRoom(data);
    return result;
}
export const  getAllRooms = async () => {
    const result = await roomService.getAllRooms();
    return result;
}