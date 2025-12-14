import { useState } from "react";
import { Facebook, Instagram, MessageCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ConnectPageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const platforms = [
  {
    id: "facebook",
    name: "Facebook Page",
    description: "Connect your Facebook business page",
    icon: Facebook,
    color: "bg-[#1877F2]",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Connect your Instagram business account",
    icon: Instagram,
    color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  },
  {
    id: "messenger",
    name: "Messenger",
    description: "Connect Facebook Messenger directly",
    icon: MessageCircle,
    color: "bg-gradient-to-br from-[#00B2FF] to-[#006AFF]",
  },
];

export const ConnectPageModal = ({ open, onOpenChange }: ConnectPageModalProps) => {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId);
    
    // Simulate OAuth connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Connection initiated",
      description: "Please complete the authorization in the popup window.",
    });
    
    setConnecting(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Connect a Page</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <p className="text-sm text-muted-foreground">
            Choose a platform to connect your business page and start automating responses.
          </p>
          
          <div className="space-y-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handleConnect(platform.id)}
                disabled={connecting !== null}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className={`w-12 h-12 rounded-xl ${platform.color} flex items-center justify-center`}>
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{platform.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {platform.description}
                  </div>
                </div>
                {connecting === platform.id ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="text-muted-foreground">→</div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            By connecting, you authorize AutoFlow to manage messages on your behalf.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
