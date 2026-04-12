import { cookies } from "next/headers"

const cookie = async()=>{
    const cokies = await cookies()
    return cokies.toString()
}