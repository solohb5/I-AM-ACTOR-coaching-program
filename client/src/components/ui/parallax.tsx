import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Parallax Text that moves horizontally on scroll
export function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode, baseVelocity?: number }) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useTransform(scrollY, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX.current, (v: any) => `${v}%`); // Simplified for this mockup

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-display uppercase text-9xl tracking-tighter font-bold text-white/5 whitespace-nowrap flex flex-nowrap gap-12" style={{ x: 0 }}>
        {children} {children} {children} {children}
      </motion.div>
    </div>
  );
}

// Reveal animation for blocks of text/images
export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        variants={{
          hidden: { y: "100%" },
          visible: { y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }} // Custom bezier for editorial feel
      >
        {children}
      </motion.div>
    </div>
  );
}

// Fade in for gentle elements
export function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
  
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
}

// Image Parallax Effect
export function ParallaxImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  return (
    <div ref={ref} className={`overflow-hidden h-full w-full ${className}`}>
      <motion.div style={{ y, scale }} className="h-[140%] w-full relative -top-[20%]">
        <img src={src} alt={alt} className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700" />
      </motion.div>
    </div>
  );
}
