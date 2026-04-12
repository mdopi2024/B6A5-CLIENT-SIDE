import { cookies } from "next/headers"

export const cookie = async()=>{
    const cokies = await cookies()
    return cokies.toString()
}