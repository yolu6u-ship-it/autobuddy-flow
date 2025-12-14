import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AutomationCard, { Automation } from "@/components/automations/AutomationCard";
import AutomationBuilderModal from "@/components/automations/AutomationBuilderModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Search,
  Filter,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

const initialAutomations: Automation[] = [
  {
    id: "1",
    name: "Price Inquiry Response",
    type: "message",
    triggerKeywords: ["দাম", "price", "কত", "টাকা"],
    responsePreview: "আসসালামু আলাইকুম! আমাদের প্রোডাক্টের দাম জানতে চাইলে অনুগ্রহ করে প্রোডাক্ট নাম বা ছবি পাঠান।",
    isEnabled: true,
    lastRun: "5 mins ago",
    runsToday: 47,
  },
  {
    id: "2",
    name: "Order Confirmation",
    type: "message",
    triggerKeywords: ["order", "অর্ডার", "confirm", "কনফার্ম"],
    responsePreview: "ধন্যবাদ আপনার অর্ডারের জন্য! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    isEnabled: true,
    lastRun: "12 mins ago",
    runsToday: 23,
  },
  {
    id: "3",
    name: "Product Image Identifier",
    type: "image",
    triggerKeywords: ["image", "ছবি", "photo"],
    responsePreview: "আপনার পাঠানো ছবি থেকে প্রোডাক্ট চিহ্নিত করা হয়েছে। এই প্রোডাক্টের দাম ৳৯৯৯।",
    isEnabled: true,
    lastRun: "1 hour ago",
    runsToday: 15,
  },
  {
    id: "4",
    name: "Comment Auto-Reply",
    type: "comment",
    triggerKeywords: ["দাম দিন", "inbox", "pm"],
    responsePreview: "ধন্যবাদ! আপনাকে ইনবক্সে দাম জানানো হচ্ছে। 📩",
    isEnabled: false,
    lastRun: "3 hours ago",
    runsToday: 8,
  },
  {
    id: "5",
    name: "Voice Message Handler",
    type: "voice",
    triggerKeywords: ["voice", "audio"],
    responsePreview: "আপনার ভয়েস মেসেজ পেয়েছি। আপনি জানতে চেয়েছেন...",
    isEnabled: true,
    lastRun: "2 hours ago",
    runsToday: 5,
  },
];

const Automations = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<Automation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Handle ?create=true query param from onboarding
  useEffect(() => {
    if (searchParams.get("create") === "true") {
      setIsModalOpen(true);
      // Clear the query param
      searchParams.delete("create");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filteredAutomations = automations.filter((auto) => {
    const matchesSearch =
      auto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auto.triggerKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === "all" || auto.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && auto.isEnabled) ||
      (statusFilter === "paused" && !auto.isEnabled);
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: automations.length,
    active: automations.filter((a) => a.isEnabled).length,
    runsToday: automations.reduce((sum, a) => sum + a.runsToday, 0),
  };

  const handleToggle = (id: string, enabled: boolean) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isEnabled: enabled } : a))
    );
    toast({
      title: enabled ? "Automation Enabled" : "Automation Paused",
      description: `The automation has been ${enabled ? "activated" : "paused"}.`,
    });
  };

  const handleEdit = (automation: Automation) => {
    setEditingAutomation(automation);
    setIsModalOpen(true);
  };

  const handleDuplicate = (automation: Automation) => {
    const duplicate: Automation = {
      ...automation,
      id: crypto.randomUUID(),
      name: `${automation.name} (Copy)`,
      runsToday: 0,
      lastRun: "Never",
    };
    setAutomations((prev) => [duplicate, ...prev]);
    toast({ title: "Automation Duplicated", description: "A copy has been created." });
  };

  const handleDelete = (id: string) => {
    setAutomations((prev) => prev.filter((a) => a.id !== id));
    toast({ title: "Automation Deleted", variant: "destructive" });
  };

  const handleViewLogs = (id: string) => {
    navigate(`/dashboard/logs?automation=${id}`);
  };

  const handleSave = (newAutomation: Automation) => {
    if (editingAutomation) {
      setAutomations((prev) =>
        prev.map((a) => (a.id === editingAutomation.id ? newAutomation : a))
      );
    } else {
      setAutomations((prev) => [newAutomation, ...prev]);
    }
    setEditingAutomation(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAutomation(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Automations</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your automated responses
            </p>
          </div>
          <Button variant="gradient" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Automation
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Automations</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active Now</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.runsToday}</p>
                <p className="text-sm text-muted-foreground">Runs Today</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search automations or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[160px] bg-background/50">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="message">Message Reply</SelectItem>
              <SelectItem value="comment">Comment Reply</SelectItem>
              <SelectItem value="image">Image Recognition</SelectItem>
              <SelectItem value="voice">Voice Response</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px] bg-background/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Automations List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredAutomations.length > 0 ? (
            filteredAutomations.map((automation, index) => (
              <motion.div
                key={automation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AutomationCard
                  automation={automation}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                  onViewLogs={handleViewLogs}
                />
              </motion.div>
            ))
          ) : (
            <Card className="border-dashed border-2 border-border/50 bg-transparent">
              <CardContent className="py-12 text-center">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No automations found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || typeFilter !== "all" || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first automation to get started"}
                </p>
                <Button variant="gradient" onClick={() => setIsModalOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Automation
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Automation Builder Modal */}
      <AutomationBuilderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingAutomation={editingAutomation}
      />
    </DashboardLayout>
  );
};

export default Automations;
