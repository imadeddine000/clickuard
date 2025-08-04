import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNav } from "@/components/top-nav"
import { SecurityEvents } from "@/components/security-events"

export default function EventsPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <TopNav />
        <main className="flex-1 p-6 bg-gray-50">
          <SecurityEvents />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
