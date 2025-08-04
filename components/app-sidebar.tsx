import {
  Shield,
  AlertTriangle,
  Users,
  FileText,
  Settings,
  BarChart3,
  Bug,
  CheckCircle,
  Monitor,
  Database,
  Activity,
  Search,
  Download,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", icon: BarChart3, url: "/", badge: null },
      { title: "Security Events", icon: AlertTriangle, url: "/events", badge: "1,247" },
      { title: "Threat Hunting", icon: Search, url: "/threat-hunting", badge: null },
    ],
  },
  {
    title: "Agents",
    items: [
      { title: "Agents", icon: Monitor, url: "/agents", badge: "156" },
      { title: "Agent Groups", icon: Users, url: "/agent-groups", badge: null },
    ],
  },
  {
    title: "Security",
    items: [
      { title: "Vulnerabilities", icon: Bug, url: "/vulnerabilities", badge: "23" },
      { title: "Compliance", icon: CheckCircle, url: "/compliance", badge: null },
      { title: "File Integrity", icon: FileText, url: "/file-integrity", badge: "45" },
      { title: "Configuration", icon: Settings, url: "/configuration", badge: null },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Rules", icon: Shield, url: "/rules", badge: null },
      { title: "Decoders", icon: Database, url: "/decoders", badge: null },
      { title: "API", icon: Activity, url: "/api", badge: null },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "Reports", icon: Download, url: "/reports", badge: null },
      { title: "Logs", icon: FileText, url: "/logs", badge: null },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Wazuh Cloud</span>
            <span className="text-xs text-muted-foreground">Security Platform</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="w-full justify-start">
                      <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent">
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium truncate">John Doe</span>
                  <span className="text-xs text-muted-foreground truncate">Security Admin</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
