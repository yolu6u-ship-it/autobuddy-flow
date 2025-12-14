import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Zap, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Free Trial",
    badge: "7 Days Free",
    badgeColor: "bg-success/10 text-success",
    price: "৳0",
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
    ctaVariant: "success" as const,
    note: "No credit card required",
    popular: false,
  },
  {
    name: "Starter",
    badge: "POPULAR",
    badgeColor: "bg-primary/10 text-primary",
    price: "৳499",
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
    ctaVariant: "default" as const,
    popular: true,
  },
  {
    name: "Professional",
    badge: "BEST VALUE",
    badgeColor: "bg-secondary/10 text-secondary",
    price: "৳2,499",
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
    ctaVariant: "gradient" as const,
    savings: "Save ৳500",
    popular: false,
  },
  {
    name: "Business",
    badge: "ULTIMATE",
    badgeColor: "bg-accent/10 text-accent",
    price: "৳4,999",
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
    ctaVariant: "default" as const,
    savings: "Save ৳989",
    popular: false,
  },
  {
    name: "Lifetime",
    badge: "EXCLUSIVE",
    badgeColor: "bg-gradient-to-r from-primary to-secondary text-primary-foreground",
    price: "৳9,999",
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
    ctaVariant: "gradient" as const,
    popular: false,
  },
];

const Pricing = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1); // Start with Starter (popular)

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Header Section - Reduced spacing on mobile */}
        <section className="py-8 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217,100%,50%,0.1),transparent_50%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Simple, Transparent Pricing
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                Choose Your{" "}
                <span className="gradient-text">Perfect Plan</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                Start with a 7-day free trial. Upgrade anytime. Cancel anytime.
                All plans include Bengali AI support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards - Premium Slider on Mobile */}
        <section className="py-4 md:py-8">
          <div className="container mx-auto px-0 md:px-4">
            {/* Mobile Premium Slider */}
            <div className="md:hidden">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4 pb-6"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`relative flex-shrink-0 w-[85%] snap-center bg-card rounded-3xl p-6 border-2 transition-all duration-300 ${
                      plan.popular
                        ? "border-primary shadow-[0_0_40px_-12px_hsl(var(--primary))]"
                        : "border-border/50"
                    }`}
                  >
                    {/* Badge */}
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${plan.badgeColor}`}>
                      {plan.name === "Lifetime" && <Crown className="w-3 h-3" />}
                      {plan.name === "Business" && <Star className="w-3 h-3" />}
                      {plan.badge}
                    </span>

                    {/* Plan Name */}
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      {plan.originalPrice && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground line-through">
                            {plan.originalPrice}
                          </span>
                          {plan.savings && (
                            <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                              {plan.savings}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      variant={plan.ctaVariant}
                      className="w-full"
                      asChild
                    >
                      <Link to="/signup">
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>

                    {/* Note */}
                    {plan.note && (
                      <p className="text-xs text-muted-foreground text-center mt-3">
                        {plan.note}
                      </p>
                    )}

                    {/* Popular indicator */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-glow">
                          <Zap className="w-3 h-3" />
                          Most Popular
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Premium Dot Indicators */}
              <div className="flex justify-center gap-2 mt-2">
                {plans.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToCard(index)}
                    className={`transition-all duration-300 rounded-full ${
                      activeIndex === index
                        ? "w-8 h-2 bg-gradient-to-r from-primary to-secondary"
                        : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-card rounded-2xl p-6 border transition-all duration-300 hover:shadow-card-hover ${
                    plan.popular
                      ? "border-primary shadow-card lg:scale-105 z-10"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {/* Badge */}
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${plan.badgeColor}`}>
                    {plan.name === "Lifetime" && <Crown className="w-3 h-3" />}
                    {plan.name === "Business" && <Star className="w-3 h-3" />}
                    {plan.badge}
                  </span>

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground line-through">
                          {plan.originalPrice}
                        </span>
                        {plan.savings && (
                          <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                            {plan.savings}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={plan.ctaVariant}
                    className="w-full"
                    asChild
                  >
                    <Link to="/signup">
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>

                  {/* Note */}
                  {plan.note && (
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      {plan.note}
                    </p>
                  )}

                  {/* Popular indicator */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-glow">
                        <Zap className="w-3 h-3" />
                        Most Popular
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Pricing Questions?</h2>
              <p className="text-muted-foreground">
                We're here to help. Contact us at{" "}
                <a href="mailto:support@autoflow.io" className="text-primary hover:underline">
                  support@autoflow.io
                </a>
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Can I switch plans?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Upgrade or downgrade anytime. Pro-rated billing applies.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-success/10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Money-back guarantee?</h3>
                <p className="text-sm text-muted-foreground">
                  30-day money-back guarantee on all paid plans. No questions asked.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Enterprise pricing?</h3>
                <p className="text-sm text-muted-foreground">
                  Need custom limits? Contact us for enterprise solutions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
