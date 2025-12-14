import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Clock, Wallet, Star, BadgeCheck, ShieldCheck, ThumbsUp, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface CounterProps {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  likes: number;
  isLiked: boolean;
  isVerified: boolean;
}

const Counter = ({ from, to, suffix = "", prefix = "", duration = 2 }: CounterProps) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate(count, to, { duration });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [count, to, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const benefits = [
  {
    icon: TrendingUp,
    value: 10,
    suffix: "x",
    label: "Faster Responses",
    description: "Reply to customers in milliseconds, not minutes",
  },
  {
    icon: Clock,
    value: 50,
    suffix: "%",
    label: "Less Manual Work",
    description: "Automate repetitive tasks and save hours daily",
  },
  {
    icon: Users,
    value: 24,
    suffix: "/7",
    label: "Availability",
    description: "Never miss a customer message, even at 3 AM",
  },
  {
    icon: Wallet,
    value: 5000,
    prefix: "৳",
    suffix: "+",
    label: "Monthly Savings",
    description: "Save on hiring costs with AI automation",
  },
];

const initialReviews: Review[] = [
  {
    id: "1",
    name: "Rakib H.",
    rating: 5,
    text: "আমার Facebook পেজে প্রতিদিন ১০০+ মেসেজ আসত, সব reply দিতে ৩-৪ ঘণ্টা লাগত। AutoFlow দিয়ে এখন সব automatic! কাস্টমার satisfied, আমি stress free। Best decision ever! 🔥",
    likes: 24,
    isLiked: false,
    isVerified: true,
  },
  {
    id: "2",
    name: "Nusrat J.",
    rating: 5,
    text: "রাতে ঘুমানোর পর কাস্টমার order দিলে আগে miss হয়ে যেত। এখন AutoFlow 24/7 reply দেয়, order নেয়। আমার sales 40% বেড়ে গেছে মাত্র ১ মাসে! Highly recommended for all online sellers.",
    likes: 18,
    isLiked: false,
    isVerified: true,
  },
  {
    id: "3",
    name: "Tanvir A.",
    rating: 5,
    text: "আমার ছোট business এর জন্য extra staff hire করার budget ছিল না। AutoFlow এখন আমার virtual assistant! Comment reply, inbox reply সব automatic। পয়সা worth it!",
    likes: 31,
    isLiked: false,
    isVerified: true,
  },
];

const BenefitsSection = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });

  const handleLike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              likes: review.isLiked ? review.likes - 1 : review.likes + 1,
              isLiked: !review.isLiked,
            }
          : review
      )
    );
  };

  const handleAddReview = () => {
    if (!newReview.name.trim() || !newReview.text.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      name: newReview.name.trim(),
      rating: newReview.rating,
      text: newReview.text.trim(),
      likes: 0,
      isLiked: false,
      isVerified: false,
    };

    setReviews((prev) => [review, ...prev]);
    setNewReview({ name: "", text: "", rating: 5 });
    setIsDialogOpen(false);
    toast({
      title: "Thank you!",
      description: "Your review has been added.",
    });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
            Real Results
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Why Thousands of Sellers{" "}
            <span className="gradient-text">Choose AutoFlow</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join the automation revolution and see immediate results in your business.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Counter */}
              <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                <Counter
                  from={0}
                  to={benefit.value}
                  suffix={benefit.suffix}
                  prefix={benefit.prefix}
                />
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold mb-2">{benefit.label}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 rounded-2xl bg-card border border-border shadow-card">
            {/* Rating & Stats */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-lg font-bold text-foreground">4.9/5</span>
                <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">500+ active sellers</strong> trust AutoFlow daily
              </p>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/20">
              <ShieldCheck className="w-5 h-5 text-success" />
              <div className="text-left">
                <p className="text-xs font-semibold text-success flex items-center gap-1">
                  Verified <BadgeCheck className="w-3.5 h-3.5" />
                </p>
                <p className="text-[10px] text-muted-foreground">Secure & Trusted</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customer Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Customer Reviews</h3>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name</label>
                    <Input
                      placeholder="Enter your name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newReview.rating
                                ? "text-amber-500 fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Review</label>
                    <Textarea
                      placeholder="Share your experience with AutoFlow..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      rows={4}
                      maxLength={500}
                    />
                  </div>
                  <Button onClick={handleAddReview} className="w-full">
                    Submit Review
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="flex gap-0.5 text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i <= review.rating ? "fill-current" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-foreground">{review.name}</span>
                  {review.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs text-success">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      Verified User
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground mb-3">{review.text}</p>
                <button
                  onClick={() => handleLike(review.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    review.isLiked
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${review.isLiked ? "fill-current" : ""}`} />
                  <span className="text-xs font-medium">{review.likes}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
