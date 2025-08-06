'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNav } from "@/components/top-nav"
import { Dashboard } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import axios from 'axios'
export default function Page() {
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/agents');
      const result = await res.json()
      console.log('agents:',result)
    }catch(error){
      console.log(error)
    }
  }

  const handleAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const result = await res.json()
      console.log('agents:',result)
    }catch(error){
      console.log(error)
    }
  }

return (
  <div>
    
      <main className="flex-1 p-6 bg-gray-50">
        <Button onClick={() => handleLogin()}>test login</Button>
        <Button onClick={() => handleAuth()}>Test Auth</Button>
        <Dashboard />
      </main>
    
  </div>
)
}
