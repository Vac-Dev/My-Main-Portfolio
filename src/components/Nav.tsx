import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PORTRAIT_SRC } from "@/lib/portrait";
import { easeOutExpo, spring } from "@/lib/motion";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

/** Small avatar in the nav; hovering it unfolds a card with the face. */
function AvatarPeek() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className="relative"
      onPointerEnter={(e) => e.pointerType !== "touch" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType !== "touch" && setOpen(false)}
    >
      <motion.a
        href="#top"
        aria-label="Kyle Nel, back to top"
        aria-expanded={open}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && setOpen(true)}
        onBlur={() => setOpen(false)}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: open ? 1.08 : 1 }}
        transition={spring}
        className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-[13px] font-semibold tracking-tight ring-1 ring-hairline"
      >
        KN
      </motion.a>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.7, y: -8, filter: "blur(10px)" }
            }
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.8, y: -6, filter: "blur(8px)", transition: { duration: 0.16 } }
            }
            transition={{ duration: 0.5, ease: easeOutExpo }}
            style={{ transformOrigin: "16px 0px" }}
            className="glass pointer-events-none absolute top-[calc(100%+14px)] left-[-10px] z-50 w-[220px] rounded-[26px] p-2.5"
          >
            <div className="overflow-hidden rounded-[18px] bg-primary">
              <motion.img
                src={PORTRAIT_SRC}
                alt=""
                className="aspect-square w-full object-cover object-top"
                initial={reduce ? false : { scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
              />
            </div>
            <div className="px-2 pt-3 pb-1.5">
              <p className="text-[15px] leading-tight font-semibold tracking-tight">Kyle Nel</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">Full-stack developer</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> Pretoria, South Africa
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  const active = useActiveSection();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const shown = hoverId ?? active;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.9, ease: easeOutExpo }}
      className="fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4"
    >
      <nav
        aria-label="Primary"
        className="glass flex items-center gap-0.5 rounded-full p-1 sm:gap-1 sm:p-1.5"
        onPointerLeave={() => setHoverId(null)}
      >
        <AvatarPeek />
        <ul className="flex items-center">
          {LINKS.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={`#${l.id}`}
                onPointerEnter={() => setHoverId(l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className="relative block rounded-full px-2.5 py-2 text-[13px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 hover:text-foreground aria-[current=true]:text-foreground sm:px-3.5 sm:text-sm"
              >
                {shown === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={spring}
                    className="absolute inset-0 -z-10 rounded-full bg-foreground/10"
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
