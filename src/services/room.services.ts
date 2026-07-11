
import { env } from "@/env";
import { CreateRoomFormValues, Room } from "@/types/room.interface";
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
  },




  getAllRooms: async ({
  searchTerm,
  sortBy,
  sortOrder,
  page,
  limit,
}: {
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (searchTerm) params.set('searchTerm', searchTerm);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));

    const queryString = params.toString();
    const url = `${Env.API_URL}/room/get-all-rooms${
      queryString ? `?${queryString}` : ''
    }`;

    const response = await fetch(url, {
      cache: 'no-store', // always fetch fresh data when search/filter/sort changes
    });

    if (!response.ok) {
      console.warn(
        `Rooms fetch failed: ${response.status} ${response.statusText} — ${url}`
      );
      return { data: [], meta: { page: 1, totalPages: 1 } };
    }

    const result = await response.json();

    // Normalize shape — handles both flat and nested API responses
    const rooms = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.data?.data)
      ? result.data.data
      : [];

    const meta = result?.meta ?? result?.data?.meta ?? { page: 1, totalPages: 1 };

    return { data: rooms, meta };
  } catch (error) {
    console.warn('getAllRooms error:', error);
    return { data: [], meta: { page: 1, totalPages: 1 } };
  }
},



  deleteRoom: async (id: string) => {
    try {
      const response = await fetch(`${Env.API_URL}/room/delete-room/${id}`, {
        method: 'DELETE',
        headers: {
          Cookie: await cookie()
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  },
  getRoomById: async (id: string) => {
    try {
      const response = await fetch(`${Env.API_URL}/room/get-room/${id}`);
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  },
  updateRoom: async (id: string, payload: Room) => {
    try {
      const response = await fetch(`${Env.API_URL}/room/update-room/${id}`,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Cookie: await cookie(),
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  },



}