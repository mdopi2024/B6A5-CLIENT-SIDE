
import { env } from "@/env";
import { ICreateReviewInput } from "@/types/review.interface";
import { cookie } from "@/utils/cookie";


const Env = env
export const reviewServices = {
    createReview: async (data: ICreateReviewInput) => {
        try {
            const response = await fetch(`${Env.API_URL}/review/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: await cookie(),
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return error;
        }
    },
    // getBookingById: async (id: string) => {
    //     try {
    //         const response = await fetch(`${Env.API_URL}/booking/${id}`, {
    //             headers: {
    //                 Cookie: await cookie()
    //             }
    //         });
    //         const result = await response.json();
    //         return result;
    //     } catch (error) {
    //         return error;
    //     }
    // },



}