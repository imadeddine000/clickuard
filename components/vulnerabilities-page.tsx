"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Bug, Search, Download, MoreHorizontal, AlertTriangle, Shield, TrendingUp, ExternalLink } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const vulnerabilities = [
  {
    id: "CVE-2024-1234",
    title: "Remote Code Execution in Apache HTTP Server",
    severity: "Critical",
    score: 9.8,
    affected: 12,
    status: "Open",
    published: "2024-01-10",
    description: "A critical vulnerability allowing remote code execution through malformed HTTP requests",
    solution: "Update to Apache HTTP Server 2.4.58 or later",
  },
  {
    id: "CVE-2024-5678",
    title: "SQL Injection in MySQL Connector",
    severity: "High",
    score: 8.5,
    affected: 8,
    status: "In Progress",
    published: "2024-01-08",
    description: "SQL injection vulnerability in MySQL connector allowing data exfiltration",
    solution: "Update MySQL Connector to version 8.0.35 or later",
  },
  {
    id: "CVE-2024-9012",
    title: "Cross-Site Scripting in Web Framework",
    severity: "Medium",
    score: 6.2,
    affected: 23,
    status: "Open",
    published: "2024-01-05",
    description: "Stored XSS vulnerability in web application framework",
    solution: "Apply security patch or update framework version",
  },
  {
    id: "CVE-2024-3456",
    title: "Privilege Escalation in Linux Kernel",
    severity: "High",
    score: 7.9,
    affected: 5,
    status: "Resolved",
    published: "2024-01-03",
    description: "Local privilege escalation vulnerability in Linux kernel",
    solution: "Update kernel to version 5.15.85 or later",
  },
  {
    id: "CVE-2024-7890",
    title: "Buffer Overflow in Network Library",
    severity: "Critical",
    score: 9.1,
    affected: 15,
    status: "Open",
    published: "2024-01-01",
    description: "Buffer overflow vulnerability in network communication library",
    solution: "Update library to latest version with security fixes",
  },
]

const vulnStats = [
  { label: "Total Vulnerabilities", value: "63", change: "+5", icon: Bug, color: "text-red-600" },
  { label: "Critical", value: "8", change: "+2", icon: AlertTriangle, color: "text-red-600" },
  { label: "High", value: "15", change: "+1", icon: AlertTriangle, color: "text-orange-600" },
  { label: "Resolved This Month", value: "12", change: "+3", icon: Shield, color: "text-green-600" },
]

export function VulnerabilitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredVulnerabilities = vulnerabilities.filter((vuln) => {
    const matchesSearch =
      vuln.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuln.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuln.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || vuln.severity.toLowerCase() === severityFilter
    const matchesStatus = statusFilter === "all" || vuln.status.toLowerCase().replace(" ", "") === statusFilter

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "destructive"
      case "in progress":
        return "secondary"
      case "resolved":
        return "default"
      default:
        return "outline"
    }
  }

  const getSeverityProgress = (score: number) => {
    return (score / 10) * 100
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vulnerability Management</h1>
          <p className="text-muted-foreground">Track and manage security vulnerabilities across your infrastructure</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Scan Now
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {vulnStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last week</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Distribution by Severity</CardTitle>
          <CardDescription>Current vulnerability breakdown across severity levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">Critical</span>
                <span className="text-sm text-muted-foreground">8</span>
              </div>
              <Progress value={13} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-600">High</span>
                <span className="text-sm text-muted-foreground">15</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-600">Medium</span>
                <span className="text-sm text-muted-foreground">25</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">Low</span>
                <span className="text-sm text-muted-foreground">15</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

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
                placeholder="Search vulnerabilities by CVE, title, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vulnerabilities Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Vulnerabilities ({filteredVulnerabilities.length})
          </CardTitle>
          <CardDescription>Detailed list of identified security vulnerabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CVE ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>CVSS Score</TableHead>
                  <TableHead>Affected Assets</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVulnerabilities.map((vuln) => (
                  <TableRow key={vuln.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium">{vuln.id}</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="space-y-1">
                        <p className="font-medium leading-tight">{vuln.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{vuln.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(vuln.severity)}>{vuln.severity}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{vuln.score}</span>
                        <div className="w-16">
                          <Progress value={getSeverityProgress(vuln.score)} className="h-2" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {vuln.affected} assets
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(vuln.status)}>{vuln.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{vuln.published}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Affected Assets</DropdownMenuItem>
                          <DropdownMenuItem>Mark as In Progress</DropdownMenuItem>
                          <DropdownMenuItem>Generate Report</DropdownMenuItem>
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
