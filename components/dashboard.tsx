import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Shield, Users, TrendingUp, TrendingDown, Eye, CheckCircle, Clock } from "lucide-react"

const securityMetrics = [
  {
    title: "Security Events",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Active Agents",
    value: "156",
    change: "+3",
    trend: "up",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Vulnerabilities",
    value: "23",
    change: "-5",
    trend: "down",
    icon: Shield,
    color: "text-orange-600",
  },
  {
    title: "Compliance Score",
    value: "94%",
    change: "+2%",
    trend: "up",
    icon: CheckCircle,
    color: "text-blue-600",
  },
]

const recentEvents = [
  {
    id: 1,
    type: "Critical",
    message: "Multiple failed login attempts detected",
    agent: "web-server-01",
    time: "2 minutes ago",
    status: "active",
  },
  {
    id: 2,
    type: "Warning",
    message: "Unusual network traffic pattern",
    agent: "firewall-01",
    time: "5 minutes ago",
    status: "investigating",
  },
  {
    id: 3,
    type: "Info",
    message: "System configuration changed",
    agent: "db-server-02",
    time: "10 minutes ago",
    status: "resolved",
  },
  {
    id: 4,
    type: "High",
    message: "Malware signature detected",
    agent: "endpoint-15",
    time: "15 minutes ago",
    status: "active",
  },
]

const topVulnerabilities = [
  { name: "CVE-2024-1234", severity: "Critical", affected: 12, score: 9.8 },
  { name: "CVE-2024-5678", severity: "High", affected: 8, score: 8.5 },
  { name: "CVE-2024-9012", severity: "Medium", affected: 23, score: 6.2 },
  { name: "CVE-2024-3456", severity: "High", affected: 5, score: 7.9 },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
          <p className="text-muted-foreground">Monitor your security posture and threat landscape</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button size="sm">Generate Report</Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {securityMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                )}
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Security Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Security Events
            </CardTitle>
            <CardDescription>Latest security alerts and incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    {event.type === "Critical" && <div className="h-2 w-2 rounded-full bg-red-600 mt-2" />}
                    {event.type === "Warning" && <div className="h-2 w-2 rounded-full bg-orange-600 mt-2" />}
                    {event.type === "Info" && <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />}
                    {event.type === "High" && <div className="h-2 w-2 rounded-full bg-red-500 mt-2" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={
                          event.type === "Critical"
                            ? "destructive"
                            : event.type === "High"
                              ? "destructive"
                              : event.type === "Warning"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {event.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {event.agent}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{event.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                      <Badge variant="outline" className="text-xs ml-auto">
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Events
            </Button>
          </CardContent>
        </Card>

        {/* Top Vulnerabilities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Top Vulnerabilities
            </CardTitle>
            <CardDescription>Critical vulnerabilities requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVulnerabilities.map((vuln, index) => (
                <div key={vuln.name} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        vuln.severity === "Critical"
                          ? "bg-red-100 text-red-800"
                          : vuln.severity === "High"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {vuln.score}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{vuln.name}</span>
                      <Badge
                        variant={
                          vuln.severity === "Critical"
                            ? "destructive"
                            : vuln.severity === "High"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {vuln.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{vuln.affected} agents affected</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Vulnerabilities
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Compliance Overview
          </CardTitle>
          <CardDescription>Current compliance status across different frameworks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">PCI DSS</span>
                <span className="text-sm text-muted-foreground">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">GDPR</span>
                <span className="text-sm text-muted-foreground">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">HIPAA</span>
                <span className="text-sm text-muted-foreground">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
