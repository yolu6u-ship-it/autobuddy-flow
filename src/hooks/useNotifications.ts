import { useState, useCallback } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  timestamp: Date;
  read: boolean;
  automationId?: string;
  automationName?: string;
}

// Sample notifications for demo
const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "Automation Triggered",
    message: "Facebook Comment Reply responded to 5 new comments",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    automationId: "auto-1",
    automationName: "Facebook Comment Reply",
  },
  {
    id: "2",
    title: "Message Limit Warning",
    message: "You've used 80% of your monthly message quota",
    type: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: "3",
    title: "Automation Error",
    message: "Voice Response automation failed due to API timeout",
    type: "error",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    automationId: "auto-3",
    automationName: "Voice Response",
  },
  {
    id: "4",
    title: "New Feature Available",
    message: "Image Recognition automation is now available for your plan",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    return newNotification;
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    addNotification,
  };
}
