import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client";
import { AuthServices } from "@/services/auth.services";

export default async function Page({
  admin, guest, manager
}: {
  admin: React.ReactNode,
  guest: React.ReactNode,
  manager: React.ReactNode
}) {
 
  const session = await AuthServices.session();
  const role =session?.user?.role; 
  
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset className="flex flex-col">

        {/* Header */}
        <header className="flex h-16 bg-[#042C53] shrink-0 items-center gap-3 border-b-[3px] border-[#EF9F27] px-4 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1 text-white hover:bg-[#EF9F27] hover:text-[#042C53] rounded transition-all duration-200" />
          <Separator orientation="vertical" className="mr-1 h-6 bg-white/20" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/dashboard"
                  className="font-sans text-sm font-medium text-white/60 hover:text-[#EF9F27] tracking-wide transition-colors duration-200"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-white/25" />
              <BreadcrumbItem>
                {/* Cormorant Garamond italic for page title */}
                <BreadcrumbPage className="font-heading text-xl font-semibold italic text-white tracking-wide">
                  Manage Your Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-auto bg-cream p-6">
          {/* {role === 'GUEST' && guest} 
          {role === 'MANAGER' && manager}  */}
          {role === 'ADMIN' && admin}
        </main>

      </SidebarInset>
    </SidebarProvider>
  )
}