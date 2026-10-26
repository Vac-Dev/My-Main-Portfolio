import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, Cloud } from "lucide-react";
import reactSvg from "simple-icons/icons/react.svg?raw";
import typescriptSvg from "simple-icons/icons/typescript.svg?raw";
import cSvg from "simple-icons/icons/c.svg?raw";
import nodedotjsSvg from "simple-icons/icons/nodedotjs.svg?raw";
import postgresqlSvg from "simple-icons/icons/postgresql.svg?raw";
import dotnetSvg from "simple-icons/icons/dotnet.svg?raw";
import tailwindcssSvg from "simple-icons/icons/tailwindcss.svg?raw";
import dockerSvg from "simple-icons/icons/docker.svg?raw";
import supabaseSvg from "simple-icons/icons/supabase.svg?raw";
import gitSvg from "simple-icons/icons/git.svg?raw";
import shadcnuiSvg from "simple-icons/icons/shadcnui.svg?raw";
import { PORTRAIT_REVEAL_SRC, PORTRAIT_SRC } from "@/lib/portrait";
import { easeOutExpo } from "@/lib/motion";

type Skill = { name: string; svg?: string };

const SKILLS: Skill[] = [
  { name: "React", svg: reactSvg },
  { name: "TypeScript", svg: typescriptSvg },
  { name: "C#", svg: cSvg },
  { name: ".NET", svg: dotnetSvg },
  { name: "Node.js", svg: nodedotjsSvg },
  { name: "PostgreSQL", svg: postgresqlSvg },
  { name: "Tailwind CSS", svg: tailwindcssSvg },
  { name: "Docker", svg: dockerSvg },
  { name: "AWS" },
  { name: "Supabase", svg: supabaseSvg },
  { name: "Git", svg: gitSvg },
  { name: "shadcn/ui", svg: shadcnuiSvg },
];

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 text-muted-foreground transition-colors duration-300 hover:text-foreground">
      {skill.svg ? (
        <span
          aria-hidden
          className="grid h-5 w-5 place-items-center [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: skill.svg.replace("<svg ", '<svg fill="currentColor" ') }}
        />
      ) : (
        <Cloud aria-hidden className="h-5 w-5" />
      )}
      <span className="text-[15px] font-medium tracking-tight whitespace-nowrap">{skill.name}</span>
    </li>
  );
}


interface SceneProps {
  reveal?: boolean;
  tx: MotionValue<number>;
  ty: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
}

/**
 * The hero image: a giant name with a cut-out portrait standing in front of it.
 * Rendered twice with identical geometry. The second copy (reveal) is painted
 * in the accent colour and only shows through the cursor lens.
 */
function Scene({ reveal, tx, ty, px, py }: SceneProps) {
  return (
    <div className={`absolute inset-0 ${reveal ? "bg-primary text-primary-foreground" : ""}`}>
      {/* Stage: name and portrait share one box so they always overlap the same way */}
      <div className="absolute bottom-[10.5rem] left-1/2 aspect-[400/520] h-[min(64svh,122vw)] -translate-x-1/2 md:bottom-0 md:h-[min(84svh,135vw)]">
        <motion.div
          aria-hidden={reveal || undefined}
          className="absolute top-[12%] left-1/2 -translate-x-1/2"
          style={{ x: tx, y: ty }}
        >
          <span
            className="display block w-max text-nowrap select-none"
            style={{ fontSize: "min(21vw, 27rem)", letterSpacing: "-0.045em", lineHeight: 0.9, fontWeight: 800 }}
          >
            KYLE NEL
          </span>
        </motion.div>

        <motion.img
          src={reveal ? PORTRAIT_REVEAL_SRC : PORTRAIT_SRC}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain select-none"
          style={{
            x: px,
            y: py,
            WebkitMaskImage: "linear-gradient(to bottom, #000 66%, transparent 99%)",
            maskImage: "linear-gradient(to bottom, #000 66%, transparent 99%)",
          }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  // Lens: position lags the cursor slightly, radius breathes in and out
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const sx = useSpring(mx, { stiffness: 260, damping: 30, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 260, damping: 30, mass: 0.7 });
  const r = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(circle ${r}px at ${sx}px ${sy}px, #000 99.5%, transparent 100%)`;

  // Pointer parallax: name drifts one way, portrait the other
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const tx = useSpring(useTransform(nx, [-0.5, 0.5], [18, -18]), { stiffness: 120, damping: 24 });
  const ty = useSpring(useTransform(ny, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 24 });
  const px = useSpring(useTransform(nx, [-0.5, 0.5], [-30, 30]), { stiffness: 120, damping: 24 });
  const py = useSpring(useTransform(ny, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 24 });

  const touched = useRef(false);
  const holdTimer = useRef<number | undefined>(undefined);
  const radius = () => (window.innerWidth < 640 ? 130 : 210);

  // One demonstration sweep so the lens is discoverable without instructions
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      if (touched.current) return;
      const b = el.getBoundingClientRect();
      const cx = b.width / 2;
      const cy = b.height * 0.5;
      sx.jump(cx - 260);
      sy.jump(cy);
      mx.set(cx - 260);
      my.set(cy);
      animate(r, radius(), { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
      animate(mx, cx + 260, { duration: 1.6, ease: [0.45, 0, 0.2, 1] });
      animate(r, 0, { duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] });
    }, 2200);
    return () => window.clearTimeout(t);
  }, [reduce, mx, my, r, sx, sy]);

  const track = (e: React.PointerEvent<HTMLElement>) => {
    const b = ref.current!.getBoundingClientRect();
    const x = e.clientX - b.left;
    const y = e.clientY - b.top;
    mx.set(x);
    my.set(y);
    if (!reduce) {
      nx.set(x / b.width - 0.5);
      ny.set(y / b.height - 0.5);
    }
  };

  const enter = (delay: number, dist = 28, blur = 12) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: dist, filter: `blur(${blur}px)` },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: reduce ? 0.3 : 1.1, delay, ease: easeOutExpo },
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-svh min-h-[640px] overflow-hidden"
      onPointerEnter={(e) => {
        touched.current = true;
        window.clearTimeout(holdTimer.current);
        track(e);
        animate(r, radius(), { type: "spring", stiffness: 180, damping: 22 });
      }}
      onPointerMove={(e) => {
        touched.current = true;
        track(e);
      }}
      onPointerDown={(e) => {
        // Touch has no hover: lens appears under the finger and lingers
        touched.current = true;
        track(e);
        animate(r, radius(), { type: "spring", stiffness: 180, damping: 22 });
        if (e.pointerType === "touch") {
          window.clearTimeout(holdTimer.current);
          holdTimer.current = window.setTimeout(
            () => animate(r, 0, { duration: 0.6, ease: [0.16, 1, 0.3, 1] }),
            1800
          );
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "touch") return;
        animate(r, 0, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
        nx.set(0);
        ny.set(0);
      }}
    >
      <motion.div style={{ y: lift, opacity: fade }} className="absolute inset-0">
        {/* Base scene */}
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: 0.1, ease: easeOutExpo }}
        >
          <Scene tx={tx} ty={ty} px={px} py={py} />
        </motion.div>

        {/* Reveal scene, only visible inside the lens */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ WebkitMaskImage: mask, maskImage: mask }}
        >
          <Scene reveal tx={tx} ty={ty} px={px} py={py} />
        </motion.div>
      </motion.div>

      {/* Real heading for assistive tech */}
      <h1 className="sr-only">Kyle Nel, full-stack developer</h1>

      {/* Copy and actions sit on the faded floor of the portrait */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[4.75rem] z-20 mx-auto flex w-full max-w-[1180px] flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <motion.p
          className="title pointer-events-auto max-w-[26ch] text-[clamp(1.15rem,2.2vw,1.6rem)] text-muted-foreground"
          {...enter(0.7)}
        >
          <span className="text-foreground">Backend, APIs &amp; automation.</span> Building systems
          that give clients a clear picture.
        </motion.p>
        <motion.div className="pointer-events-auto flex items-center gap-3" {...enter(0.85)}>
          <motion.a
            href="#work"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground shadow-[0_10px_30px_-10px_var(--primary)]"
          >
            See my work
            <ArrowDown className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="glass inline-flex h-12 items-center rounded-full px-6 text-[15px] font-medium"
          >
            Get in touch
          </motion.a>
        </motion.div>
      </div>

      {/* Skills, passing slowly */}
      <motion.div
        className="marquee marquee-mask pointer-events-none absolute inset-x-0 bottom-7 z-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.1 }}
      >
        <div className="marquee-track flex w-max">
          {[0, 1].map((n) => (
            <ul key={n} className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={n === 1}>
              {SKILLS.map((s) => (
                <SkillChip key={s.name} skill={s} />
              ))}
            </ul>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
