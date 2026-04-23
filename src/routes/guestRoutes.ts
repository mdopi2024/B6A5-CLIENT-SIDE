import { Routes } from "@/types/routes";


export const guestRoutes:Routes[] = [
    {
        title:"My Dashboard",
        items:[
           {
             title:"my bookings",
             url:"/dashboard/my-booking"
            },
           {
             title:"Profile",
             url:"/dashboard"
            },
     
        ]
    }
]