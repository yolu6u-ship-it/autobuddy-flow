import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  MessageSquare,
  Zap,
  Bot,
  Clock,
  TrendingUp,
  Plus,
  MoreVertical,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ConnectPageModal } from "@/components/dashboard/ConnectPageModal";
import { ConnectedPageCard, ConnectedPage } from "@/components/dashboard/ConnectedPageCard";
import { PageStatsModal } from "@/components/dashboard/PageStatsModal";
import { toast } from "@/hooks/use-toast";

const initialConnectedPages: ConnectedPage[] = [
  {
    id: "1",
    name: "My Fashion Shop",
    platform: "facebook",
    status: "active",
    connectedAt: "Dec 8, 2024",
    stats: {
      messagesReceived: 127,
      autoReplies: 89,
      followers: "2.4K",
      responseTime: "< 1 min",
    },
  },
  {
    id: "2",
    name: "Fashion Shop BD",
    platform: "instagram",
    status: "active",
    connectedAt: "Dec 10, 2024",
    stats: {
      messagesReceived: 85,
      autoReplies: 72,
      followers: "5.1K",
      responseTime: "< 2 min",
    },
  },
];

const stats = [
  {
    title: "Messages Handled",
    value: "127",
    change: "+23",
    changeLabel: "from yesterday",
    icon: MessageSquare,
    color: "from-primary to-primary-glow",
  },
  {
    title: "Auto-Replies Sent",
    value: "89",
    change: "92%",
    changeLabel: "success rate",
    icon: Zap,
    color: "from-success to-primary",
  },
  {
    title: "Active Automations",
    value: "3",
    change: "All",
    changeLabel: "running",
    icon: Bot,
    color: "from-secondary to-primary",
  },
  {
    title: "Hours Saved",
    value: "24.5",
    change: "৳5000+",
    changeLabel: "value",
    icon: Clock,
    color: "from-accent to-secondary",
  },
];

const recentActivity = [
  {
    time: "2 min ago",
    customer: "Rahim Khan",
    message: "Price of red saree?",
    type: "Message",
    status: "Success",
    response: "The red saree is ৳2,500. Would you like to order?",
  },
  {
    time: "5 min ago",
    customer: "Fatima Akter",
    message: "[Image]",
    type: "Image",
    status: "Success",
    response: "This is our premium cotton kurta, ৳1,800.",
  },
  {
    time: "12 min ago",
    customer: "Karim Mia",
    message: "Do you deliver to Chittagong?",
    type: "Message",
    status: "Success",
    response: "Yes, we deliver all over Bangladesh!",
  },
  {
    time: "18 min ago",
    customer: "Nasreen Begum",
    message: "[Voice message]",
    type: "Voice",
    status: "Success",
    response: "I understand you're asking about sizes...",
  },
  {
    time: "25 min ago",
    customer: "Abdul Rahman",
    message: "Spam comment",
    type: "Comment",
    status: "Blocked",
    response: "Auto-deleted spam comment",
  },
];

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [connectedPages, setConnectedPages] = useState<ConnectedPage[]>(initialConnectedPages);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<ConnectedPage | null>(null);

  // Handle ?connect=true query param from onboarding
  useEffect(() => {
    if (searchParams.get("connect") === "true") {
      setConnectModalOpen(true);
      // Clear the query param
      searchParams.delete("connect");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleViewStats = (page: ConnectedPage) => {
    setSelectedPage(page);
    setStatsModalOpen(true);
  };

  const handleToggleStatus = (page: ConnectedPage) => {
    setConnectedPages((prev) =>
      prev.map((p) =>
        p.id === page.id
          ? { ...p, status: p.status === "active" ? "paused" : "active" }
          : p
      )
    );
    toast({
      title: page.status === "active" ? "Page paused" : "Page activated",
      description: `${page.name} has been ${page.status === "active" ? "paused" : "activated"}.`,
    });
  };

  const handleDisconnect = (page: ConnectedPage) => {
    setConnectedPages((prev) => prev.filter((p) => p.id !== page.id));
    toast({
      title: "Page disconnected",
      description: `${page.name} has been disconnected from AutoFlow.`,
    });
  };

  return (
    <DashboardLayout>
      <ConnectPageModal open={connectModalOpen} onOpenChange={setConnectModalOpen} />
      <PageStatsModal open={statsModalOpen} onOpenChange={setStatsModalOpen} page={selectedPage} />
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your automations today.
            </p>
          </div>
          <Button variant="gradient" asChild>
            <Link to="/dashboard/automations">
              <Plus className="w-4 h-4 mr-2" />
              New Automation
            </Link>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center gap-1 text-xs text-success">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{stat.title}</div>
                    <div className="text-xs text-muted-foreground">{stat.changeLabel}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Connected Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Connected Pages</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setConnectModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Connect Page
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {connectedPages.map((page) => (
                  <ConnectedPageCard
                    key={page.id}
                    page={page}
                    onViewStats={handleViewStats}
                    onToggleStatus={handleToggleStatus}
                    onDisconnect={handleDisconnect}
                  />
                ))}
                
                <button 
                  onClick={() => setConnectModalOpen(true)}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Add Another Page</div>
                    <div className="text-sm text-muted-foreground">Connect more pages</div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/logs">
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Response</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-muted-foreground text-sm">
                          {activity.time}
                        </TableCell>
                        <TableCell className="font-medium">{activity.customer}</TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          {activity.message}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-muted">
                            {activity.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              activity.status === "Success"
                                ? "bg-success/10 text-success"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {activity.status}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm">
                          {activity.response}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
