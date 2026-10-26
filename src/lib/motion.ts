import type { Transition } from "motion/react";

/** Exponential ease-out: fast start, long settle. Used for every entrance. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Critically damped spring: default for anything the user touches. */
export const spring: Transition = { type: "spring", stiffness: 380, damping: 38, mass: 1 };

/** Slightly under-damped spring: only for momentum-like moments (pop-ins). */
export const springBouncy: Transition = { type: "spring", stiffness: 420, damping: 28, mass: 0.9 };

/** Blur-rise entrance, the site's one entrance vocabulary. */
export const riseIn = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};
