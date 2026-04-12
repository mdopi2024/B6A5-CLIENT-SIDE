"use server"

import { SignupFormValues } from "@/types/auth.interface";
import { AuthServices } from "@/services/auth.services";

export const registerUser = async(userData: SignupFormValues) => {
    console.log(' im in the action')
    return await AuthServices.signUp(userData);
}