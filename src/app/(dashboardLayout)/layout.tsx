
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


export default async function Page({
  admin,
  provider,
  user
}: {
  admin: React.ReactNode,
  provider: React.ReactNode,
  user: React.ReactNode
}) {

  const role ="ADMIN";

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset className="flex flex-col">
        {/* Header */}
        <header className="flex h-16 bg-[#0F766E] shrink-0 items-center gap-2 border-b border-[#0F766E]/20 px-4 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1 hover:bg-[#FBBF24] hover:text-black text-white transition-colors" />
          <Separator
            orientation="vertical"
            className="mr-2 h-6 bg-white/30"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink 
                  href="/dashboard" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg font-semibold text-white lg:text-xl">
                  Manage Your Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {/* {role === 'GUEST' && user}
          {role === 'MANAGER' && provider} */}
          {role === 'ADMIN' && admin}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}