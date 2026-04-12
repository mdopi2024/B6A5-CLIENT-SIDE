"use server";

import { AuthServices } from "@/services/auth.services";


export const getAllUsers = async () => {
    const userData = await AuthServices.getAlluser();
    return await userData;
}