"use server"
import { roomService } from "@/services/room.services";
import { CreateRoomFormValues, Room } from "@/types/room.interface";
import { updateTag } from "next/cache";



export const createRoom = async (data: CreateRoomFormValues, file: File) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);

    const result = await roomService.createRoom(formData);
    updateTag('all-rooms');
    return result;
}


export const getAllRooms = async () => {
    const result = await roomService.getAllRooms();
    return result;
}
export const deleteRoom = async (id: string) => {
    const result = await roomService.deleteRoom(id);
    updateTag('all-rooms')
    return result;
}
export const getRoomById = async (id: string) => {
    const result = await roomService.getRoomById(id);
    updateTag('all-rooms')
    return result;
}
export const updateRoom = async (id: string,payload:Room) => {
    const result = await roomService.updateRoom(id,payload);
    updateTag('all-rooms')
    return result;
}