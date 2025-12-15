import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Copy, Smartphone, Building2, CreditCard, Shield, Clock, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PromoBanner from "@/components/ui/promo-banner";
import { toast } from "@/hooks/use-toast";
import { getPlanById, Plan, DISCOUNT_PERCENTAGE } from "@/data/plans";

const paymentMethods = [
  { id: "bkash", name: "bKash", icon: Smartphone, color: "#E2136E" },
  { id: "nagad", name: "Nagad", icon: Smartphone, color: "#F6921E" },
  { id: "rocket", name: "Rocket", icon: Smartphone, color: "#8C3494" },
  { id: "upay", name: "Upay", icon: Smartphone, color: "#00A651" },
  { id: "bank", name: "Bank Transfer", icon: Building2, color: "#1E40AF" },
  { id: "card", name: "Card", icon: CreditCard, color: "#6366F1" },
];

const paymentInstructions: Record<string, { title: string; color: string; accountNumber: string; instructions: string[] }> = {
  bkash: {
    title: "bKash Payment Instructions",
    color: "#E2136E",
    accountNumber: "+8801401918624",
    instructions: [
      "Go to your bKash app or Dial *247#",
      'Choose "Send Money"',
      "Enter our bKash Account Number",
      "Enter total amount",
      "Confirm with your PIN",
      "Copy Transaction ID and paste below",
    ],
  },
  nagad: {
    title: "Nagad Payment Instructions",
    color: "#F6921E",
    accountNumber: "+8801401918624",
    instructions: [
      "Go to your Nagad app or Dial *167#",
      'Choose "Send Money"',
      "Enter our Nagad Account Number",
      "Enter total amount",
      "Confirm with your PIN",
      "Copy Transaction ID and paste below",
    ],
  },
  rocket: {
    title: "Rocket Payment Instructions",
    color: "#8C3494",
    accountNumber: "+8801401918624",
    instructions: [
      "Go to your Rocket app or Dial *322#",
      'Choose "Send Money"',
      "Enter our Rocket Account Number",
      "Enter total amount",
      "Confirm with your PIN",
      "Copy Transaction ID and paste below",
    ],
  },
  upay: {
    title: "Upay Payment Instructions",
    color: "#00A651",
    accountNumber: "+8801401918624",
    instructions: [
      "Go to your Upay app",
      'Choose "Send Money"',
      "Enter our Upay Account Number",
      "Enter total amount",
      "Confirm with your PIN",
      "Copy Transaction ID and paste below",
    ],
  },
  bank: {
    title: "Bank Transfer Instructions",
    color: "#1E40AF",
    accountNumber: "1234567890123",
    instructions: [
      "Log in to your bank app or visit your branch",
      "Select Fund Transfer",
      "Enter our Bank Account Number",
      "Bank Name: Example Bank Ltd.",
      "Complete the transfer",
      "Copy Transaction ID and paste below",
    ],
  },
  card: {
    title: "Card Payment",
    color: "#6366F1",
    accountNumber: "",
    instructions: [
      "Card payment gateway coming soon",
      "Please use mobile banking for now",
      "Contact support for alternatives",
    ],
  },
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get("plan") || "starter";
  const plan = getPlanById(planId);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    community: "",
    paymentMethod: "bkash",
    transactionId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
          <Button asChild>
            <Link to="/pricing">Back to Pricing</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const currentPaymentInfo = paymentInstructions[formData.paymentMethod] || paymentInstructions.bkash;
  const currentPaymentMethod = paymentMethods.find(m => m.id === formData.paymentMethod);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(currentPaymentInfo.accountNumber);
    toast({
      title: "Copied!",
      description: "Account number copied to clipboard",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!formData.transactionId && plan.priceNumber > 0) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter your payment transaction ID",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Purchase Successful!",
      description: `Your ${plan.name} plan has been activated.`,
    });
    
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Grand Opening Banner */}
      <PromoBanner discount={DISCOUNT_PERCENTAGE} />
      
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Pricing
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Premium Order Card */}
              <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-muted/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${plan.badgeColor}`}>
                        <Sparkles className="w-3 h-3" />
                        {plan.badge}
                      </span>
                      <h2 className="text-2xl font-bold">{plan.name} Plan</h2>
                      <p className="text-muted-foreground mt-1">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="bg-muted/30 rounded-2xl p-5 mb-6">
                    {plan.originalPrice && (
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-destructive/10 text-destructive">
                          <Gift className="w-3 h-3" />
                          {DISCOUNT_PERCENTAGE}% OFF
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold gradient-text">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <p className="text-success font-medium mt-2 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        You {plan.savings}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Check className="w-5 h-5 text-success" />
                      What's Included
                    </h4>
                    <ul className="grid gap-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-success" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4 text-success" />
                      Secure Payment
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      Instant Activation
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Instructions Card */}
              <motion.div 
                key={formData.paymentMethod}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-border/50 bg-card p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${currentPaymentInfo.color}15` }}
                  >
                    {currentPaymentMethod && <currentPaymentMethod.icon className="w-6 h-6" style={{ color: currentPaymentInfo.color }} />}
                  </div>
                  <div>
                    <h3 className="font-bold">{currentPaymentInfo.title}</h3>
                    <p className="text-xs text-muted-foreground">Follow these steps</p>
                  </div>
                </div>

                <ol className="space-y-3">
                  {currentPaymentInfo.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3 text-sm">
                      <span 
                        className="flex-shrink-0 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold text-primary-foreground"
                        style={{ backgroundColor: currentPaymentInfo.color }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground pt-0.5">{instruction}</span>
                    </li>
                  ))}
                </ol>

                {currentPaymentInfo.accountNumber && (
                  <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                        <p 
                          className="text-xl font-bold"
                          style={{ color: currentPaymentInfo.color }}
                        >
                          {currentPaymentInfo.accountNumber}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyAccountNumber}
                        className="gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Right Side - Checkout Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="sticky top-28 rounded-3xl border border-border/50 bg-card p-6 lg:p-8 shadow-xl shadow-primary/5">
                <h2 className="text-2xl font-bold mb-2">Complete Your Order</h2>
                <p className="text-muted-foreground mb-8">Fill in your details to activate your plan</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>

                  {/* Community */}
                  <div className="space-y-2">
                    <Label htmlFor="community" className="text-sm font-medium">
                      How did you find us?
                    </Label>
                    <Select
                      value={formData.community}
                      onValueChange={(value) => handleInputChange("community", value)}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Prefer not to say</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="referral">Friend Referral</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Payment Method <span className="text-destructive">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange("paymentMethod", value)}
                      className="grid grid-cols-3 gap-2"
                    >
                      {paymentMethods.map((method) => (
                        <Label
                          key={method.id}
                          htmlFor={method.id}
                          className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.paymentMethod === method.id
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border/50 hover:border-primary/30"
                          }`}
                        >
                          <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                          <method.icon 
                            className="w-5 h-5" 
                            style={{ color: formData.paymentMethod === method.id ? method.color : undefined }}
                          />
                          <span className="text-xs font-medium text-center">{method.name}</span>
                          {formData.paymentMethod === method.id && (
                            <motion.div
                              layoutId="paymentIndicator"
                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                            >
                              <Check className="w-2.5 h-2.5 text-primary-foreground" />
                            </motion.div>
                          )}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Transaction ID */}
                  {plan.priceNumber > 0 && (
                    <div className="space-y-2">
                      <Label htmlFor="transactionId" className="text-sm font-medium">
                        Transaction ID <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="transactionId"
                        placeholder="Enter your transaction ID"
                        value={formData.transactionId}
                        onChange={(e) => handleInputChange("transactionId", e.target.value)}
                        className="h-12 rounded-xl"
                        required={plan.priceNumber > 0}
                      />
                      <p className="text-xs text-muted-foreground">
                        Find this in your payment confirmation SMS
                      </p>
                    </div>
                  )}

                  {/* Terms */}
                  <p className="text-xs text-center text-muted-foreground">
                    By completing this purchase, you agree to our{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full h-14 text-base rounded-xl shadow-lg shadow-primary/25"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⏳
                        </motion.span>
                        Processing...
                      </span>
                    ) : (
                      <>
                        Complete Purchase — {plan.price}
                        <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
