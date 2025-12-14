import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  Download,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Image,
  Mic,
  MessageCircle,
  Check,
  X,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { format } from "date-fns";

const executionLogs = [
  {
    id: "1",
    time: "2024-01-15 14:32:15",
    customer: "Rahim Khan",
    customerId: "FB-12345",
    message: "আপনার কাছে লাল শাড়ি আছে? দাম কত?",
    type: "message",
    automation: "Product Inquiry",
    response: "জি আছে! আমাদের লাল শাড়ি ৳2,500। অর্ডার করতে চাইলে নাম ও ঠিকানা দিন।",
    status: "success",
    duration: 245,
    page: "My Fashion Shop",
  },
  {
    id: "2",
    time: "2024-01-15 14:28:42",
    customer: "Fatima Akter",
    customerId: "FB-23456",
    message: "[Image: Blue Kurta]",
    type: "image",
    automation: "Image Recognition",
    response: "এটি আমাদের প্রিমিয়াম কটন কুর্তা। দাম ৳1,800। সাইজ জানান।",
    status: "success",
    duration: 892,
    page: "My Fashion Shop",
  },
  {
    id: "3",
    time: "2024-01-15 14:22:08",
    customer: "Karim Mia",
    customerId: "FB-34567",
    message: "চট্টগ্রামে ডেলিভারি দেন?",
    type: "message",
    automation: "Delivery Query",
    response: "জি, আমরা সারাদেশে ডেলিভারি দিই। চট্টগ্রামে ৳100 ডেলিভারি চার্জ।",
    status: "success",
    duration: 178,
    page: "My Fashion Shop",
  },
  {
    id: "4",
    time: "2024-01-15 14:18:35",
    customer: "Nasreen Begum",
    customerId: "FB-45678",
    message: "[Voice: 15 seconds]",
    type: "voice",
    automation: "Voice Handler",
    response: "আপনার প্রশ্ন বুঝেছি। আমাদের সাইজ গাইড এখানে দেখুন...",
    status: "success",
    duration: 1245,
    page: "My Fashion Shop",
  },
  {
    id: "5",
    time: "2024-01-15 14:12:19",
    customer: "Abdul Rahman",
    customerId: "FB-56789",
    message: "FREE FOLLOWERS! Click here now!!!",
    type: "comment",
    automation: "Spam Detection",
    response: "Comment deleted, user banned for spam",
    status: "blocked",
    duration: 56,
    page: "My Fashion Shop",
  },
  {
    id: "6",
    time: "2024-01-15 14:05:44",
    customer: "Salma Khatun",
    customerId: "FB-67890",
    message: "পণ্যের কোয়ালিটি কেমন?",
    type: "message",
    automation: "Quality FAQ",
    response: "আমাদের সব পণ্য 100% অরিজিনাল এবং মানসম্মত। ৩ দিন রিটার্ন পলিসি আছে।",
    status: "success",
    duration: 198,
    page: "My Fashion Shop",
  },
  {
    id: "7",
    time: "2024-01-15 13:58:22",
    customer: "Jahangir Alam",
    customerId: "FB-78901",
    message: "[Image: Unknown Product]",
    type: "image",
    automation: "Image Recognition",
    response: "দুঃখিত, এই পণ্যটি চিনতে পারিনি। আমাদের প্রোডাক্ট লিস্ট দেখুন।",
    status: "failed",
    duration: 1567,
    page: "My Fashion Shop",
  },
  {
    id: "8",
    time: "2024-01-15 13:45:11",
    customer: "Rubina Aktar",
    customerId: "FB-89012",
    message: "ক্যাশ অন ডেলিভারি আছে?",
    type: "message",
    automation: "Payment FAQ",
    response: "জি, ক্যাশ অন ডেলিভারি সুবিধা আছে। বিকাশ/নগদেও পেমেন্ট করতে পারবেন।",
    status: "success",
    duration: 165,
    page: "My Fashion Shop",
  },
];

const typeIcons = {
  message: MessageSquare,
  image: Image,
  voice: Mic,
  comment: MessageCircle,
};

const typeColors = {
  message: "bg-primary/10 text-primary",
  image: "bg-secondary/10 text-secondary",
  voice: "bg-accent/10 text-accent",
  comment: "bg-muted text-muted-foreground",
};

const Logs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredLogs = executionLogs.filter((log) => {
    const matchesSearch =
      log.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.automation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: executionLogs.length,
    success: executionLogs.filter((l) => l.status === "success").length,
    failed: executionLogs.filter((l) => l.status === "failed").length,
    blocked: executionLogs.filter((l) => l.status === "blocked").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Execution Logs</h1>
            <p className="text-muted-foreground">
              View detailed history of all automation executions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-muted-foreground">Total Executions</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.success}</div>
                <div className="text-xs text-muted-foreground">Successful</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.failed}</div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Filter className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.blocked}</div>
                <div className="text-xs text-muted-foreground">Blocked/Spam</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customer, message, automation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Type Filter */}
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="message">Message</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="voice">Voice</SelectItem>
                    <SelectItem value="comment">Comment</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>

                {/* Date Range */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      {dateFrom ? format(dateFrom, "MMM d") : "Date Range"}
                      {dateTo && ` - ${format(dateTo, "MMM d")}`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                      mode="range"
                      selected={{ from: dateFrom, to: dateTo }}
                      onSelect={(range) => {
                        setDateFrom(range?.from);
                        setDateTo(range?.to);
                      }}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Execution History
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({filteredLogs.length} records)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Automation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => {
                      const TypeIcon = typeIcons[log.type as keyof typeof typeIcons];
                      const isExpanded = expandedRow === log.id;

                      return (
                        <>
                          <TableRow
                            key={log.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setExpandedRow(isExpanded ? null : log.id)}
                          >
                            <TableCell>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              )}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                              {log.time.split(" ")[1]}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{log.customer}</div>
                                <div className="text-xs text-muted-foreground">{log.customerId}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[log.type as keyof typeof typeColors]}`}>
                                <TypeIcon className="w-3 h-3" />
                                {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="font-medium">{log.automation}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                  log.status === "success"
                                    ? "bg-success/10 text-success"
                                    : log.status === "failed"
                                    ? "bg-destructive/10 text-destructive"
                                    : "bg-accent/10 text-accent"
                                }`}
                              >
                                {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {log.duration}ms
                            </TableCell>
                          </TableRow>
                          
                          {/* Expanded Details */}
                          {isExpanded && (
                            <TableRow key={`${log.id}-expanded`}>
                              <TableCell colSpan={7} className="bg-muted/30 p-0">
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="p-4 space-y-4"
                                >
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <div className="text-xs font-semibold text-muted-foreground mb-1">
                                        INCOMING MESSAGE
                                      </div>
                                      <div className="p-3 rounded-lg bg-card border border-border">
                                        {log.message}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs font-semibold text-muted-foreground mb-1">
                                        AI RESPONSE
                                      </div>
                                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                        {log.response}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-4 text-sm">
                                    <div>
                                      <span className="text-muted-foreground">Page: </span>
                                      <span className="font-medium">{log.page}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Full Time: </span>
                                      <span className="font-medium">{log.time}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Processing: </span>
                                      <span className="font-medium">{log.duration}ms</span>
                                    </div>
                                  </div>
                                </motion.div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-1">No logs found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Logs;
