import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { easeOutExpo, riseIn } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "p" | "h2" | "h3" | "span";
}

/** Blur-rise on first scroll into view. Reduced motion falls back to a plain fade. */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as ElementType;
  return (
    <Comp
      className={className}
      variants={
        reduce
          ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
          : riseIn
      }
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0.3 : 0.9, delay, ease: easeOutExpo }}
    >
      {children}
    </Comp>
  );
}
