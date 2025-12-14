import { Facebook, Instagram, MessageCircle, MoreVertical, Check, Pause, BarChart3, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ConnectedPage {
  id: string;
  name: string;
  platform: "facebook" | "instagram" | "messenger";
  status: "active" | "paused";
  connectedAt: string;
  stats: {
    messagesReceived: number;
    autoReplies: number;
    followers: string;
    responseTime: string;
  };
}

interface ConnectedPageCardProps {
  page: ConnectedPage;
  onViewStats: (page: ConnectedPage) => void;
  onToggleStatus: (page: ConnectedPage) => void;
  onDisconnect: (page: ConnectedPage) => void;
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

export const ConnectedPageCard = ({
  page,
  onViewStats,
  onToggleStatus,
  onDisconnect,
}: ConnectedPageCardProps) => {
  const Icon = platformIcons[page.platform];

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
      <div className={`w-12 h-12 rounded-full ${platformColors[page.platform]} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{page.name}</div>
        <div className="text-sm text-muted-foreground">
          {page.stats.messagesReceived} messages
        </div>
      </div>
      <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
        page.status === "active"
          ? "bg-success/10 text-success"
          : "bg-muted text-muted-foreground"
      }`}>
        {page.status === "active" ? (
          <>
            <Check className="w-3 h-3" />
            Active
          </>
        ) : (
          <>
            <Pause className="w-3 h-3" />
            Paused
          </>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onViewStats(page)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            View Stats
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onToggleStatus(page)}>
            {page.status === "active" ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Page
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Activate Page
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => onDisconnect(page)}
            className="text-destructive focus:text-destructive"
          >
            <Unlink className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
