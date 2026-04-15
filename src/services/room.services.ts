
import { env } from "@/env";
import { CreateRoomFormValues } from "@/types/room.interface";
import { cookie } from "@/utils/cookie";




const Env = env
export const roomService = {
  createRoom: async (data: CreateRoomFormValues) => {
    try {
      const response = await fetch(`${Env.API_URL}/room/create-room`, {
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
}
         
}