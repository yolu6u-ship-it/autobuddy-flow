import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Image, 
  Mic, 
  Shield, 
  FileText, 
  Clock,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Message Auto-Reply",
    description: "AI responds to customer messages in Bengali instantly. Never miss a sale again.",
    color: "from-primary to-primary-glow",
  },
  {
    icon: Image,
    title: "Image Recognition",
    description: "Customers send product images, AI identifies and prices them automatically.",
    color: "from-secondary to-primary",
  },
  {
    icon: Mic,
    title: "Voice Support",
    description: "Voice messages? We transcribe and respond automatically in seconds.",
    color: "from-accent to-secondary",
  },
  {
    icon: Shield,
    title: "Comment Management",
    description: "Spam detection, auto-delete bad comments, ban abusive users instantly.",
    color: "from-success to-primary",
  },
  {
    icon: FileText,
    title: "Auto-Invoice",
    description: "Generate professional invoices automatically after every order confirmation.",
    color: "from-primary to-accent",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Your shop never sleeps. Respond to customers anytime, day or night.",
    color: "from-secondary to-success",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Automate Your Shop</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From instant message replies to intelligent image recognition — 
            AutoFlow handles it all so you can focus on growing your business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover card-hover"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>

              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center text-primary font-medium text-sm group/link"
              >
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </a>

              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
