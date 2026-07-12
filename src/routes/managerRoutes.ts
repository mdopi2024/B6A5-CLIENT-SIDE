import { Routes } from "@/types/routes";


export const managerRoutes:Routes[] = [
    {
        title:"Management",
        items:[
           {
             title:"Overview",
             url:"/manager-dashboard/overview"
            },
           {
             title:"Bookings",
             url:"/manager-dashboard/bookings"
            },
           {
             title:"Manage Rooms",
             url:"/manager-dashboard/rooms"
            },
           {
             title:"Create Room",
             url:"/manager-dashboard/create-rooms"
            },
           {
             title:"Profile",
             url:"/manager-dashboard"
            },
           
        ]
    }
]