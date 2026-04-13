import { Routes } from "@/types/routes";

export const adminRoutes: Routes[] = [
    {
        title: "Administration",
        items: [
            {
                title: "Users",
                url: "/admin-dashboard/users"
            },
            {
                title: "Rooms",
                url: "/admin-dashboard/rooms"
            },
            {
                title: "Bookings",
                url: "/admin-dashboard/bookings"
            },
            {
                title: "Create Manager",
                url: "/admin-dashboard/create-manager"
            },
            {
                title: "Profile",
                url: "/admin-dashboard"
            },
        ]
    }
]