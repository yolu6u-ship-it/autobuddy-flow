import { motion } from "framer-motion";
import { Sparkles, Clock, Zap } from "lucide-react";

interface PromoBannerProps {
  discount?: number;
  message?: string;
}

const PromoBanner = ({ discount = 75, message }: PromoBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      <div className="bg-gradient-to-r from-primary via-secondary to-accent py-3 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="container mx-auto flex items-center justify-center gap-2 md:gap-4 relative z-10">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-center">
            <span className="text-sm md:text-base font-bold flex items-center gap-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              <Zap className="w-4 h-4 hidden md:inline text-white" />
              🎉 Grand Opening Offer
            </span>
            <span className="text-xs md:text-sm font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              {message || `${discount}% OFF for Limited Time Only!`}
            </span>
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1 text-xs md:text-sm font-semibold text-white bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full border border-white/30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
          >
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-white" />
            <span className="hidden sm:inline">Limited Time</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PromoBanner;
