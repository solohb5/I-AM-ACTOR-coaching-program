import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: "fit-content" | "100%";
}

export function Reveal({ children, className, delay = 0, width = "fit-content" }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" });

  return (
    <div ref={ref} style={{ width }} className={cn("relative overflow-hidden", className)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FadeIn({ children, className, delay = 0 }: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
  
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: delay }}
      >
        {children}
      </motion.div>
    );
  }