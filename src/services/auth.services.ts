import { env } from "@/env";
import { SigninFormValues, SignupFormValues } from "@/interfaces/auth.interface";

const backendUrl = env.NEXT_PUBLIC_BACKEND_URL;

export const AuthServices = {
    signUp: async (data: SignupFormValues) => {
        try {
            const response = await fetch(`${backendUrl}/api/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.log('fetch error:', error)
            return error;
        }
    },
    signIn: async (data: SigninFormValues) => {
        try {
            const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.log('fetch error:', error)
            return error;
        }
    },

}