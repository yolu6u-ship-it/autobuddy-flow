export interface Plan {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  price: string;
  priceNumber: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaVariant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "hero" | "success" | "glass";
  note?: string;
  popular: boolean;
  originalPrice?: string;
  savings?: string;
}

export const plans: Plan[] = [
  {
    id: "free-trial",
    name: "Free Trial",
    badge: "7 Days Free",
    badgeColor: "bg-success/10 text-success",
    price: "৳0",
    priceNumber: 0,
    period: "7 days",
    description: "Try AutoFlow risk-free",
    features: [
      "Full access to all features",
      "Unlimited automations",
      "Unlimited messages",
      "Email support",
      "Bengali AI responses",
    ],
    cta: "Start Free Trial",
    ctaVariant: "success",
    note: "No credit card required",
    popular: false,
  },
  {
    id: "starter",
    name: "Starter",
    badge: "POPULAR",
    badgeColor: "bg-primary/10 text-primary",
    price: "৳499",
    priceNumber: 499,
    period: "/month",
    description: "Perfect for beginners",
    features: [
      "1 Facebook page",
      "100 automations/month",
      "Message auto-reply",
      "Basic analytics",
      "Email support",
    ],
    cta: "Choose Starter",
    ctaVariant: "default",
    popular: true,
  },
  {
    id: "professional",
    name: "Professional",
    badge: "BEST VALUE",
    badgeColor: "bg-secondary/10 text-secondary",
    price: "৳2,499",
    priceNumber: 2499,
    period: "/6 months",
    originalPrice: "৳2,994",
    description: "Most popular choice",
    features: [
      "5 Facebook pages",
      "1000 automations/month",
      "Message, Comment, Image, Voice",
      "Advanced analytics",
      "Priority email support",
    ],
    cta: "Choose Professional",
    ctaVariant: "gradient",
    savings: "Save ৳500",
    popular: false,
  },
  {
    id: "business",
    name: "Business",
    badge: "ULTIMATE",
    badgeColor: "bg-accent/10 text-accent",
    price: "৳4,999",
    priceNumber: 4999,
    period: "/year",
    originalPrice: "৳5,988",
    description: "For serious sellers",
    features: [
      "Unlimited pages",
      "Unlimited automations",
      "All features included",
      "WhatsApp automation (coming)",
      "E-commerce integration (coming)",
      "24/7 Phone + Email support",
      "Custom training session",
    ],
    cta: "Choose Business",
    ctaVariant: "default",
    savings: "Save ৳989",
    popular: false,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    badge: "EXCLUSIVE",
    badgeColor: "bg-gradient-to-r from-primary to-secondary text-primary-foreground",
    price: "৳9,999",
    priceNumber: 9999,
    period: "one-time",
    description: "Pay once, use forever",
    features: [
      "Everything in Business",
      "Lifetime updates",
      "All future features free",
      "Priority support forever",
      "VIP onboarding",
      "Custom integrations",
    ],
    cta: "Contact for Lifetime",
    ctaVariant: "gradient",
    popular: false,
  },
];

export const getPlanById = (id: string): Plan | undefined => {
  return plans.find((plan) => plan.id === id);
};
