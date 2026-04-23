import * as React from "react"
import Link from "next/link";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar"
import { adminRoutes } from "@/routes/admingRoutes";
import { Routes } from "@/types/routes";
import { guestRoutes } from "@/routes/guestRoutes";
import { managerRoutes } from "@/routes/managerRoutes";

export function AppSidebar({ role, ...props }: { role: string } & React.ComponentProps<typeof Sidebar>) {

  let routes: Routes[] = [];

  switch (role) {
    case "GUEST":   routes = guestRoutes;   break;
    case "MANAGER": routes = managerRoutes; break;
    case "ADMIN":   routes = adminRoutes;   break;
  }

  return (
    <Sidebar {...props} className="border-r border-[#042C53]/10">

      {/* Header */}
      <SidebarHeader className="bg-[#042C53] p-4 border-b-[3px] border-[#EF9F27]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/boshontoLogo.png"
              className="w-11 h-11 rounded-full border-2 border-[#EF9F27]"
              alt="Boshonto logo"
            />
            <div className="absolute inset-0 rounded-full ring-2 ring-[#EF9F27]/30 ring-offset-1 ring-offset-[#042C53]" />
          </div>
          <div className="flex flex-col leading-tight">
            {/* Cormorant Garamond for brand name */}
            <h2 className="font-heading text-xl font-bold text-white tracking-wide">
              Boshonto
            </h2>
            <span className="font-sans text-[9px] text-[#EF9F27] tracking-[0.22em] uppercase font-medium">
              Hotel & Dining
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-cream pt-3">
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            {item.title && (
              <SidebarGroupLabel className="font-sans text-[9.5px] uppercase tracking-[0.12em] text-[#042C53]/40 font-medium px-4 mb-1">
                {item.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5 px-2">
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      asChild
                      className="
                        font-sans font-medium tracking-wide text-[#042C53]
                        hover:bg-[#EF9F27] hover:text-[#042C53]
                        data-[active=true]:bg-[#042C53]
                        data-[active=true]:text-white
                        data-[active=true]:font-semibold
                        data-[active=true]:border-l-[3px]
                        data-[active=true]:border-[#EF9F27]
                        rounded transition-all duration-200
                      "
                    >
                      <Link href={subItem.url} className="flex items-center gap-3 w-full">
                        <span className="w-[5px] h-[5px] rounded-full bg-[#EF9F27] opacity-35 group-data-[active=true]:opacity-100" />
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <div className="h-px bg-[#042C53]/08 mx-3 my-2" />

        <Link
          className="
            flex items-center gap-2 mx-2 mb-4 px-3 py-2.5
            font-sans text-sm font-semibold text-[#042C53] tracking-wide
            border-[1.5px] border-[#042C53] rounded
            hover:bg-[#042C53] hover:text-white
            transition-all duration-200
          "
          href="/"
        >
          ← Go to Homepage
        </Link>
      </SidebarContent>

      <SidebarRail className="bg-[#EF9F27]" />
    </Sidebar>
  )
}