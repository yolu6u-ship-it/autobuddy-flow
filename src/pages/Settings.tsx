import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  Lock,
  Trash2,
  Camera,
  Save,
  Bot,
  Globe,
  Bell,
  BellRing,
  Volume2,
  CreditCard,
  Calendar,
  TrendingUp,
  Receipt,
  Crown,
  Facebook,
  MessageCircle,
  Mail as MailIcon,
  Link2,
  LinkIcon,
  Unlink,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");

  // Account state
  const [profile, setProfile] = useState({
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    phone: "+880 1712345678",
  });

  // Automation settings state
  const [automationSettings, setAutomationSettings] = useState({
    defaultTone: "friendly",
    language: "bengali",
    emailNotifications: true,
    pushNotifications: true,
    soundAlerts: false,
    dailyDigest: true,
  });

  // Connected services state
  const [connectedServices, setConnectedServices] = useState({
    facebook: { connected: true, pages: 2, lastSync: "2 hours ago" },
    whatsapp: { connected: false, comingSoon: true },
    email: { connected: false, comingSoon: true },
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleSaveAutomation = () => {
    toast({
      title: "Settings Saved",
      description: "Automation preferences updated.",
    });
  };

  const handleDisconnectFacebook = () => {
    setConnectedServices(prev => ({
      ...prev,
      facebook: { ...prev.facebook, connected: false, pages: 0 },
    }));
    toast({
      title: "Facebook Disconnected",
      description: "Your Facebook pages have been disconnected.",
      variant: "destructive",
    });
  };

  const handleConnectFacebook = () => {
    setConnectedServices(prev => ({
      ...prev,
      facebook: { connected: true, pages: 2, lastSync: "Just now" },
    }));
    toast({
      title: "Facebook Connected",
      description: "Your Facebook pages are now connected.",
    });
  };

  const billingHistory = [
    { id: 1, date: "Dec 1, 2024", amount: "৳499", plan: "Starter", status: "Paid" },
    { id: 2, date: "Nov 1, 2024", amount: "৳499", plan: "Starter", status: "Paid" },
    { id: 3, date: "Oct 1, 2024", amount: "৳499", plan: "Starter", status: "Paid" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account, preferences, and connected services
          </p>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-muted/50 p-1">
              <TabsTrigger value="account" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="automations" className="gap-2">
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">Automations</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="gap-2">
                <Link2 className="h-4 w-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              {/* Profile Section */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-primary/20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                          RA
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                      <Badge variant="secondary" className="mt-2">
                        <Crown className="h-3 w-3 mr-1" />
                        Starter Plan
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Security Section */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Security
                  </CardTitle>
                  <CardDescription>
                    Manage your password and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="bg-background/50" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="bg-background/50" />
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Lock className="h-4 w-4" />
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible actions that affect your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    This will permanently delete your account and all associated data.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Automations Tab */}
            <TabsContent value="automations" className="space-y-6">
              {/* Default Settings */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    Default Automation Settings
                  </CardTitle>
                  <CardDescription>
                    Configure default behavior for new automations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                        Default Tone
                      </Label>
                      <Select
                        value={automationSettings.defaultTone}
                        onValueChange={(value) => setAutomationSettings(s => ({ ...s, defaultTone: value }))}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="friendly">😊 Friendly</SelectItem>
                          <SelectItem value="professional">💼 Professional</SelectItem>
                          <SelectItem value="casual">😎 Casual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        Response Language
                      </Label>
                      <Select
                        value={automationSettings.language}
                        onValueChange={(value) => setAutomationSettings(s => ({ ...s, language: value }))}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bengali">🇧🇩 Bengali (বাংলা)</SelectItem>
                          <SelectItem value="english">🇺🇸 English</SelectItem>
                          <SelectItem value="mixed">🔄 Mixed (Bengali + English)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleSaveAutomation} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to be notified about automation events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={automationSettings.emailNotifications}
                        onCheckedChange={(checked) => setAutomationSettings(s => ({ ...s, emailNotifications: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <BellRing className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Browser push notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={automationSettings.pushNotifications}
                        onCheckedChange={(checked) => setAutomationSettings(s => ({ ...s, pushNotifications: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Volume2 className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Sound Alerts</p>
                          <p className="text-sm text-muted-foreground">Play sound for new events</p>
                        </div>
                      </div>
                      <Switch
                        checked={automationSettings.soundAlerts}
                        onCheckedChange={(checked) => setAutomationSettings(s => ({ ...s, soundAlerts: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Receipt className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Daily Digest</p>
                          <p className="text-sm text-muted-foreground">Summary of daily automation activity</p>
                        </div>
                      </div>
                      <Switch
                        checked={automationSettings.dailyDigest}
                        onCheckedChange={(checked) => setAutomationSettings(s => ({ ...s, dailyDigest: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              {/* Current Plan */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold">Starter Plan</h3>
                        <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">৳499/month • Renews on Jan 1, 2025</p>
                    </div>
                    <Button variant="gradient" className="gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Upgrade Plan
                    </Button>
                  </div>

                  <Separator />

                  {/* Usage Stats */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Automations Used</span>
                        <span className="font-medium">67/100</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Messages Handled</span>
                        <span className="font-medium">2,847</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Connected Pages</span>
                        <span className="font-medium">1/1</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Billing History */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" />
                    Billing History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {billingHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-success/10">
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          </div>
                          <div>
                            <p className="font-medium">{item.plan}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {item.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{item.amount}</p>
                          <Badge variant="outline" className="text-xs text-success border-success/30">
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Connected Services Tab */}
            <TabsContent value="services" className="space-y-6">
              {/* Facebook */}
              <Card className={`border-border/50 bg-card/50 backdrop-blur-sm ${connectedServices.facebook.connected ? 'border-l-4 border-l-[#1877F2]' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Facebook className="h-5 w-5 text-[#1877F2]" />
                    Facebook
                  </CardTitle>
                  <CardDescription>
                    Connect your Facebook pages to enable message automation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {connectedServices.facebook.connected ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/20">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-[#1877F2]/20">
                            <CheckCircle2 className="h-6 w-6 text-[#1877F2]" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1877F2]">Connected</p>
                            <p className="text-sm text-muted-foreground">
                              {connectedServices.facebook.pages} pages connected • Last sync: {connectedServices.facebook.lastSync}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Manage Pages
                          </Button>
                          <Button variant="destructive" size="sm" className="gap-2" onClick={handleDisconnectFacebook}>
                            <Unlink className="h-4 w-4" />
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button className="gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90" onClick={handleConnectFacebook}>
                      <Facebook className="h-4 w-4" />
                      Connect Facebook
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm opacity-75">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    WhatsApp Business
                    <Badge variant="secondary" className="ml-2">
                      <Clock className="h-3 w-3 mr-1" />
                      Coming Soon
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Connect WhatsApp Business to automate customer conversations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button disabled className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Connect WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    WhatsApp integration will be available in Q1 2025
                  </p>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm opacity-75">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MailIcon className="h-5 w-5 text-accent" />
                    Email Integration
                    <Badge variant="secondary" className="ml-2">
                      <Clock className="h-3 w-3 mr-1" />
                      Coming Soon
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Connect your email to automate customer support responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button disabled className="gap-2">
                    <MailIcon className="h-4 w-4" />
                    Connect Email
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Email integration will be available in Q2 2025
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
