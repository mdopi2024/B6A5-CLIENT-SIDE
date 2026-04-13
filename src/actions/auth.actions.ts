"use server";

import { AuthServices } from "@/services/auth.services";
import { updateTag } from "next/cache";



export const getAllUsers = async () => {
    const userData = await AuthServices.getAlluser();
    return await userData;
}

export const deleteAndRestoreUser = async (id: string) => {
    const userData = await AuthServices.deleteAndRestoreUser(id);
     updateTag("getAllUser");
    return await userData;
}

export const getUserById = async (id: string) => {
    const userData = await AuthServices.getUserById(id);   
    return await userData;
}

export const updateUserRole = async (id: string,value:{role:string}) => {
        const userData = await AuthServices.updateUserRole(id, value);
        updateTag("getAllUser");
        return await userData;          
    }