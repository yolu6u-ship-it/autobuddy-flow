import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this really free for 7 days?",
    answer: "Yes, completely free! You get full access to all features for 7 days. No credit card required. No hidden fees. If you love it, upgrade to continue. If not, no problem at all.",
  },
  {
    question: "How does it connect to my Facebook shop?",
    answer: "Super simple! One-click login with your Facebook account, authorize AutoFlow to access your page, and you're done. The whole process takes less than 60 seconds.",
  },
  {
    question: "Will it respond in Bengali?",
    answer: "Absolutely! Our AI is specifically trained to understand and respond in Bengali naturally. It handles Bengali slang, colloquialisms, and even mixed Bengali-English (Banglish) conversations perfectly.",
  },
  {
    question: "Can I customize the AI responses?",
    answer: "Yes! You have full control. Set your own trigger keywords, customize response templates, choose the tone (friendly, professional, or casual), and let AI generate responses based on your style.",
  },
  {
    question: "What happens after the trial ends?",
    answer: "After your 7-day trial, you can choose a plan that fits your needs. Your automations and settings are saved. If you don't upgrade, automations pause but nothing is deleted — you can resume anytime.",
  },
  {
    question: "Is my data secure?",
    answer: "100% secure. We use enterprise-grade encryption, never store your Facebook password, and only access what's needed to run automations. Your data is yours — we never sell or share it.",
  },
  {
    question: "Can I use it for multiple Facebook pages?",
    answer: "Yes! Depending on your plan, you can connect 1 to unlimited Facebook pages. Professional plan supports 5 pages, Business plan offers unlimited pages.",
  },
  {
    question: "What if I need help setting up?",
    answer: "We've got you covered! Access our step-by-step tutorials, video guides, and dedicated support team. Business plan users also get priority support and custom training sessions.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers. If you can't find what you're looking for, 
            feel free to contact our support team.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-card transition-all"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
