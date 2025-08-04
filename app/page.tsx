import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNav } from "@/components/top-nav"
import { Dashboard } from "@/components/dashboard"

export default function Page() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <TopNav />
        <main className="flex-1 p-6 bg-gray-50">
          <Dashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
