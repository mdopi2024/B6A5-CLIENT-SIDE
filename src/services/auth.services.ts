import { env } from "@/env";
import { cookie } from "@/utils/cookie";

const authUrl = env.AUTH_URL;

export const AuthServices = {
    session: async () => {
        try {
            const res = await fetch(`${authUrl}/get-session`, {
                headers: {
                    Cookie: await cookie()
                },
                cache: "no-store"
            })
            const data = await res.json();

            return data;

        } catch (error) {
            console.error("Error fetching session:", error);
            return error
        }

    }

}