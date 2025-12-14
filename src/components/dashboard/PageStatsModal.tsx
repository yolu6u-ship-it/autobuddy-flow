import { Facebook, Instagram, MessageCircle, MessageSquare, Users, TrendingUp, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConnectedPage } from "./ConnectedPageCard";

interface PageStatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: ConnectedPage | null;
}

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  messenger: MessageCircle,
};

const platformColors = {
  facebook: "bg-[#1877F2]",
  instagram: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  messenger: "bg-gradient-to-br from-[#00B2FF] to-[#006AFF]",
};

export const PageStatsModal = ({ open, onOpenChange, page }: PageStatsModalProps) => {
  if (!page) return null;

  const Icon = platformIcons[page.platform];

  const stats = [
    { label: "Messages Received", value: page.stats.messagesReceived, icon: MessageSquare },
    { label: "Auto-Replies Sent", value: page.stats.autoReplies, icon: TrendingUp },
    { label: "Active Followers", value: page.stats.followers, icon: Users },
    { label: "Avg Response Time", value: page.stats.responseTime, icon: Clock },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${platformColors[page.platform]} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">{page.name}</div>
              <div className="text-sm text-muted-foreground font-normal">
                Connected {page.connectedAt}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-muted/50 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              page.status === "active" 
                ? "bg-success/10 text-success" 
                : "bg-muted text-muted-foreground"
            }`}>
              {page.status === "active" ? "Active" : "Paused"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
