import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Copy, Smartphone, Building2, CreditCard } from "lucide-react";
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
import { toast } from "@/hooks/use-toast";
import { getPlanById, Plan } from "@/data/plans";

const paymentMethods = [
  { id: "bkash", name: "bKash", icon: Smartphone },
  { id: "nagad", name: "Nagad", icon: Smartphone },
  { id: "rocket", name: "Rocket", icon: Smartphone },
  { id: "upay", name: "Upay", icon: Smartphone },
  { id: "bank", name: "Bank Transfer", icon: Building2 },
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
];

const bkashInstructions = [
  "Go to your Bkash app or Dial *247#",
  'Choose "Send Money"',
  "Enter our Bkash Account Number: 01710023757",
  "Enter total amount",
  "Now enter your Bkash Account PIN to confirm the transaction",
  "Copy Transaction ID from payment confirmation message and paste that Transaction ID below",
];

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

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("01710023757");
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
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Purchase Successful!",
      description: `Your ${plan.name} plan has been activated.`,
    });
    
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const showExpandedFeatures = plan.features.length > 4;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pricing
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Order Summary - Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Order Summary Card */}
              <div className="bg-card rounded-2xl border p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Plan Name & Price */}
                <div className="flex justify-between items-start mb-4">
                  <span className="font-medium">{plan.name}</span>
                  <span className="font-semibold">{plan.price}</span>
                </div>

                {/* Original Price if discounted */}
                {plan.originalPrice && (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Regular Price</span>
                      <span className="line-through">{plan.originalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span>Early Bird Discount</span>
                      <span className="text-success font-medium">{plan.savings}</span>
                    </div>
                  </>
                )}

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{plan.price}</span>
                      {plan.savings && (
                        <p className="text-sm text-success mt-1">You save {plan.savings?.replace('Save ', '')}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* What You Get Section */}
                <div className="space-y-3">
                  <div className="bg-accent/30 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-primary mb-3">What You Get:</h4>
                    <ul className="space-y-2">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {showExpandedFeatures && (
                        <li className="text-sm text-muted-foreground">
                          + {plan.features.length - 4} more items
                        </li>
                      )}
                    </ul>
                  </div>

                  {showExpandedFeatures && (
                    <div className="bg-primary/5 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-primary mb-3">What You Get:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Instructions Card */}
              <div className="bg-card rounded-2xl border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E2136E]/10 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-[#E2136E]" />
                  </div>
                  <h3 className="font-semibold">bKash Payment Instructions</h3>
                </div>

                <ol className="space-y-3">
                  {bkashInstructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{instruction}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Account Number:</p>
                      <p className="text-lg font-bold text-primary">01710023757</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyAccountNumber}
                      className="hover:bg-primary/10"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Checkout Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-2xl border p-6 lg:p-8">
                <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01712345678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  {/* Community */}
                  <div className="space-y-2">
                    <Label htmlFor="community">Which Community? (Optional)</Label>
                    <Select
                      value={formData.community}
                      onValueChange={(value) => handleInputChange("community", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="facebook">Facebook Group</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="referral">Friend Referral</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3">
                    <Label>
                      Payment Method <span className="text-destructive">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange("paymentMethod", value)}
                      className="grid grid-cols-2 gap-3"
                    >
                      {paymentMethods.map((method) => (
                        <Label
                          key={method.id}
                          htmlFor={method.id}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.paymentMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <method.icon className="w-5 h-5 text-muted-foreground" />
                          <span className="font-medium">{method.name}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Transaction ID */}
                  {plan.priceNumber > 0 && (
                    <div className="space-y-2">
                      <Label htmlFor="transactionId">
                        Transaction ID <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="transactionId"
                        placeholder="Enter transaction ID from payment confirmation"
                        value={formData.transactionId}
                        onChange={(e) => handleInputChange("transactionId", e.target.value)}
                        required={plan.priceNumber > 0}
                      />
                      <p className="text-xs text-muted-foreground">
                        Copy the Transaction ID from your payment confirmation message/SMS
                      </p>
                    </div>
                  )}

                  {/* Terms */}
                  <p className="text-sm text-center text-muted-foreground">
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
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        Complete Purchase - {plan.price}
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
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
