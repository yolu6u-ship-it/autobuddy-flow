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

// Exact pricing configuration for psychological pricing (ends in 99)
const pricingConfig = {
  "free-trial": { original: 0, final: 0, savings: 0 },
  starter: { original: 2000, final: 499, savings: 1501 },
  professional: { original: 10000, final: 2499, savings: 7501 },
  business: { original: 20000, final: 4999, savings: 15001 },
  lifetime: { original: 40000, final: 9999, savings: 30001 },
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
    price: formatPrice(pricingConfig.starter.final),
    priceNumber: pricingConfig.starter.final,
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
    originalPrice: formatPrice(pricingConfig.starter.original),
    savings: `Save ${formatPrice(pricingConfig.starter.savings)}`,
  },
  {
    id: "professional",
    name: "Professional",
    badge: "BEST VALUE",
    badgeColor: "bg-secondary/10 text-secondary",
    price: formatPrice(pricingConfig.professional.final),
    priceNumber: pricingConfig.professional.final,
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
    originalPrice: formatPrice(pricingConfig.professional.original),
    savings: `Save ${formatPrice(pricingConfig.professional.savings)}`,
  },
  {
    id: "business",
    name: "Business",
    badge: "ULTIMATE",
    badgeColor: "bg-accent/10 text-accent",
    price: formatPrice(pricingConfig.business.final),
    priceNumber: pricingConfig.business.final,
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
    originalPrice: formatPrice(pricingConfig.business.original),
    savings: `Save ${formatPrice(pricingConfig.business.savings)}`,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    badge: "EXCLUSIVE",
    badgeColor: "bg-gradient-to-r from-primary to-secondary text-primary-foreground",
    price: formatPrice(pricingConfig.lifetime.final),
    priceNumber: pricingConfig.lifetime.final,
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
    originalPrice: formatPrice(pricingConfig.lifetime.original),
    savings: `Save ${formatPrice(pricingConfig.lifetime.savings)}`,
  },
];

export const getPlanById = (id: string): Plan | undefined => {
  return plans.find((plan) => plan.id === id);
};
