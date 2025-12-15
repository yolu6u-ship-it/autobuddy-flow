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

// Discount configuration
export const DISCOUNT_PERCENTAGE = 75;

// Helper function to calculate discounted price
export const calculateDiscount = (originalPrice: number): { discountedPrice: number; savings: number } => {
  const discountedPrice = Math.round(originalPrice * (1 - DISCOUNT_PERCENTAGE / 100));
  const savings = originalPrice - discountedPrice;
  return { discountedPrice, savings };
};

// Format price in Bengali Taka
export const formatPrice = (amount: number): string => {
  return `৳${amount.toLocaleString()}`;
};

// Original prices before discount (clean numbers for proper 75% discount math)
const originalPrices = {
  "free-trial": 0,
  starter: 1999, // Original ৳1,999, after 75% = ৳499 (save ৳1,500)
  professional: 9999, // Original ৳9,999, after 75% = ৳2,499 (save ৳7,500)
  business: 19999, // Original ৳19,999, after 75% = ৳4,999 (save ৳15,000)
  lifetime: 39999, // Original ৳39,999, after 75% = ৳9,999 (save ৳30,000)
};

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
    price: formatPrice(calculateDiscount(originalPrices.starter).discountedPrice),
    priceNumber: calculateDiscount(originalPrices.starter).discountedPrice,
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
    originalPrice: formatPrice(originalPrices.starter),
    savings: `Save ${formatPrice(calculateDiscount(originalPrices.starter).savings)}`,
  },
  {
    id: "professional",
    name: "Professional",
    badge: "BEST VALUE",
    badgeColor: "bg-secondary/10 text-secondary",
    price: formatPrice(calculateDiscount(originalPrices.professional).discountedPrice),
    priceNumber: calculateDiscount(originalPrices.professional).discountedPrice,
    period: "/6 months",
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
    popular: false,
    originalPrice: formatPrice(originalPrices.professional),
    savings: `Save ${formatPrice(calculateDiscount(originalPrices.professional).savings)}`,
  },
  {
    id: "business",
    name: "Business",
    badge: "ULTIMATE",
    badgeColor: "bg-accent/10 text-accent",
    price: formatPrice(calculateDiscount(originalPrices.business).discountedPrice),
    priceNumber: calculateDiscount(originalPrices.business).discountedPrice,
    period: "/year",
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
    popular: false,
    originalPrice: formatPrice(originalPrices.business),
    savings: `Save ${formatPrice(calculateDiscount(originalPrices.business).savings)}`,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    badge: "EXCLUSIVE",
    badgeColor: "bg-gradient-to-r from-primary to-secondary text-primary-foreground",
    price: formatPrice(calculateDiscount(originalPrices.lifetime).discountedPrice),
    priceNumber: calculateDiscount(originalPrices.lifetime).discountedPrice,
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
    originalPrice: formatPrice(originalPrices.lifetime),
    savings: `Save ${formatPrice(calculateDiscount(originalPrices.lifetime).savings)}`,
  },
];

export const getPlanById = (id: string): Plan | undefined => {
  return plans.find((plan) => plan.id === id);
};
