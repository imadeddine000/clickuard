
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
import axios from "axios"




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
   const{data,error,isLoading} = useSWR("/api/agents",fetcher)
  const filteredAgents = data?.data?.affected_items?.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.ip.includes(searchTerm) ||
      agent.os.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || agent.status.toLowerCase() === statusFilter
    const matchesGroup = groupFilter === "all" || agent.group.toLowerCase() === groupFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesGroup
  })
  const handleRestartAgent=async(agent)=>{
      const res = await axios.put('/api/agents/restart',{
        headers:{
          agents_list:[agent]
        }
      })
      const result = res.data
      console.log(result)
  }
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {agentStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last hour</p>
            </CardContent>
          </Card>
        ))}
      </div>

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
            Agents ({filteredAgents?.length})
          </CardTitle>
          <CardDescription>Detailed view of all registered Wazuh agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Operating System</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{agent.name}</span>
                        <span className="text-xs text-muted-foreground">ID: {agent.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{agent.ip}</TableCell>
                    <TableCell>{agent.os.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{agent.version}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(agent.status)} className="gap-1">
                          {getStatusIcon(agent.status)}
                          {agent.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{agent.lastSeen}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{agent.group}</Badge>
                    </TableCell>
                    <TableCell>
                      {agent.status === "Active" ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <Cpu className="h-3 w-3" />
                            <span>CPU: {agent.cpu}%</span>
                            <Progress value={agent.cpu} className="w-12 h-1" />
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Activity className="h-3 w-3" />
                            <span>RAM: {agent.memory}%</span>
                            <Progress value={agent.memory} className="w-12 h-1" />
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <HardDrive className="h-3 w-3" />
                            <span>Disk: {agent.disk}%</span>
                            <Progress value={agent.disk} className="w-12 h-1" />
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={()=>handleRestartAgent(agent.id)}>Restart Agent</DropdownMenuItem>
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
