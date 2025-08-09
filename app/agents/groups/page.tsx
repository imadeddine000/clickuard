
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import useSWR from 'swr'
import {
  Monitor,
  Search,
  Plus,
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Cpu,
  HardDrive,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fetcher } from "@/lib/fetcher"

const agents = [
  {
    id: "001",
    name: "web-server-01",
    ip: "192.168.1.10",
    os: "Ubuntu 20.04",
    version: "4.7.0",
    status: "Active",
    lastSeen: "2 minutes ago",
    group: "Web Servers",
    cpu: 45,
    memory: 67,
    disk: 23,
  },
  {
    id: "002",
    name: "db-server-01",
    ip: "192.168.1.20",
    os: "CentOS 8",
    version: "4.7.0",
    status: "Active",
    lastSeen: "1 minute ago",
    group: "Database",
    cpu: 78,
    memory: 82,
    disk: 56,
  },
  {
    id: "003",
    name: "endpoint-15",
    ip: "10.0.0.45",
    os: "Windows 10",
    version: "4.6.2",
    status: "Disconnected",
    lastSeen: "2 hours ago",
    group: "Endpoints",
    cpu: 0,
    memory: 0,
    disk: 0,
  },
  {
    id: "004",
    name: "firewall-01",
    ip: "192.168.1.1",
    os: "pfSense",
    version: "4.7.0",
    status: "Active",
    lastSeen: "30 seconds ago",
    group: "Network",
    cpu: 12,
    memory: 34,
    disk: 15,
  },
  {
    id: "005",
    name: "mail-server-01",
    ip: "192.168.1.30",
    os: "Debian 11",
    version: "4.7.0",
    status: "Warning",
    lastSeen: "5 minutes ago",
    group: "Mail Servers",
    cpu: 89,
    memory: 91,
    disk: 78,
  },
]

const agentStats = [
  { label: "Total Agents", value: "156", change: "+3", icon: Monitor },
  { label: "Active", value: "142", change: "+2", icon: CheckCircle },
  { label: "Disconnected", value: "12", change: "+1", icon: XCircle },
  { label: "Warning", value: "2", change: "0", icon: AlertCircle },
]

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [groupFilter, setGroupFilter] = useState("all")
   const{data,error,isLoading} = useSWR("/api/agents/group",fetcher)
  const filteredAgents = data?.data?.affected_items?.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.ip.includes(searchTerm) ||
      agent.os.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || agent.status.toLowerCase() === statusFilter
    const matchesGroup = groupFilter === "all" || agent.group.toLowerCase() === groupFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesGroup
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default"
      case "disconnected":
        return "destructive"
      case "warning":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="h-3 w-3" />
      case "disconnected":
        return <XCircle className="h-3 w-3" />
      case "warning":
        return <AlertCircle className="h-3 w-3" />
      default:
        return <Monitor className="h-3 w-3" />
    }
  }
  useEffect(()=>{
    console.log(data?.data)
  },[data])
  if(isLoading) return <h1>loading ...</h1>
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agents Management</h1>
          <p className="text-muted-foreground">Monitor and manage Wazuh agents across your infrastructure</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 " />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Agent
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, IP, or OS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="disconnected">Disconnected</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
            <Select value={groupFilter} onValueChange={setGroupFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                <SelectItem value="web servers">Web Servers</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="endpoints">Endpoints</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="mail servers">Mail Servers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Agents 
          </CardTitle>
          <CardDescription>Detailed view of all registered Wazuh agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>name</TableHead>
                  <TableHead>agents</TableHead>
                  <TableHead>configurations cheksum</TableHead>
                  <TableHead>actions</TableHead>
                  
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents?.map((agent,index) => (
                  <TableRow key={index}>
                    
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.count}</TableCell>
                    <TableCell>{agent.configSum}</TableCell>
                    
                   
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Restart Agent</DropdownMenuItem>
                          <DropdownMenuItem>Update Configuration</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove Agent</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
