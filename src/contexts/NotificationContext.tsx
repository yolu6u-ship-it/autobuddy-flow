import React, { createContext, useContext, useEffect } from "react";
import { useNotifications, Notification } from "@/hooks/useNotifications";
import { toast } from "sonner";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => Notification;
  triggerAlert: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    addNotification,
  } = useNotifications();

  const triggerAlert = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification = addNotification(notification);
    
    // Show toast based on type
    const toastOptions = {
      description: notification.message,
      duration: 5000,
    };

    switch (notification.type) {
      case "success":
        toast.success(notification.title, toastOptions);
        break;
      case "error":
        toast.error(notification.title, toastOptions);
        break;
      case "warning":
        toast.warning(notification.title, toastOptions);
        break;
      case "info":
      default:
        toast.info(notification.title, toastOptions);
        break;
    }

    return newNotification;
  };

  // Demo: Simulate real-time notifications
  useEffect(() => {
    const demoMessages = [
      {
        title: "New Comment Detected",
        message: "Your automation responded to a comment on your Facebook post",
        type: "success" as const,
        automationName: "Comment Auto-Reply",
      },
      {
        title: "Automation Active",
        message: "Message Reply automation is now processing incoming messages",
        type: "info" as const,
        automationName: "Message Reply",
      },
    ];

    const interval = setInterval(() => {
      // 10% chance of new notification every 30 seconds (for demo)
      if (Math.random() < 0.1) {
        const randomMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        triggerAlert(randomMessage);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
        addNotification,
        triggerAlert,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
}
