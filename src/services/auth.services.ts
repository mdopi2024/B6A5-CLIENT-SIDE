import { env } from "@/env";
import { CreateManagerInput } from "@/types/auth.interface";
import { cookie } from "@/utils/cookie";


const envUrl = env;

export const AuthServices = {
    session: async () => {
        try {
            const res = await fetch(`${envUrl.AUTH_URL}/get-session`, {
                headers: {
                    Cookie: await cookie()
                },
                cache: "no-store"
            })
            const data = await res.json();

            return data;

        } catch (error) {
            return error
        }

    },
    getAlluser: async () => {
        try {
            const res = await fetch(`${envUrl.API_URL}/auth/users`, {
                headers: {
                    Cookie: await cookie()
                },
                next: { tags: ["getAllUser"] },
            })
            const data = await res.json();

            return data;

        } catch (error) {
            return error
        }

    },
    getUserById: async (id: string) => {
        try {
            const res = await fetch(`${envUrl.API_URL}/auth/user/${id}`, {
                headers: {
                    Cookie: await cookie()
                },
            })
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    },
    deleteAndRestoreUser: async (id: string) => {
        try {
            const res = await fetch(`${envUrl.API_URL}/auth/delete-restore/${id}`, {
                method: "PATCH",
                headers: {
                    Cookie: await cookie()
                },
            })
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    },
    updateUserRole: async (id: string, value: { role: string }) => {
        console.log(value)
        try {
            const res = await fetch(`${envUrl.API_URL}/auth/update-role/${id}`, {  
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json", 
                    Cookie: await cookie()
                },
                body: JSON.stringify(value)  
             })
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }   
    },
    createManager: async (value: CreateManagerInput) => {
        try {
            const res = await fetch(`${envUrl.API_URL}/manager/register-manager`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    Cookie: await cookie()
                },
                body: JSON.stringify(value)  
             })
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }   

    }

}   