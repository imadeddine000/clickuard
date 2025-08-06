import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TopNav } from "@/components/top-nav";
import { VulnerabilitiesPage } from "@/components/vulnerabilities-page";

export default function VulnerabilitiesPageRoute() {
  return (
    <div>
      <TopNav />
      <main className="flex-1 p-6 bg-gray-50">
        <VulnerabilitiesPage />
      </main>
    </div>
  );
}
