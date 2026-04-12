import { env } from "@/env";
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
                next:{tags:["getAllUser"]},
            })
            const data = await res.json();

            return data;

        } catch (error) {
            return error
        }

    }

}