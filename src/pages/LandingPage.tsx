import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { ChevronDown, Cloud } from "lucide-react";
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

type SkillItem =
  | { name: string; svg: string; type: "svg" }
  | { name: string; Icon: React.ComponentType<{ className?: string }>; type: "lucide" };

const LANDING_SKILLS: SkillItem[] = [
  { name: "React", svg: reactSvg, type: "svg" },
  { name: "TypeScript", svg: typescriptSvg, type: "svg" },
  { name: "C#", svg: cSvg, type: "svg" },
  { name: "Node.js", svg: nodedotjsSvg, type: "svg" },
  { name: "PostgreSQL", svg: postgresqlSvg, type: "svg" },
  { name: ".NET", svg: dotnetSvg, type: "svg" },
  { name: "Tailwind CSS", svg: tailwindcssSvg, type: "svg" },
  { name: "Docker", svg: dockerSvg, type: "svg" },
  { name: "AWS", Icon: Cloud, type: "lucide" },
  { name: "Supabase", svg: supabaseSvg, type: "svg" },
  { name: "Git", svg: gitSvg, type: "svg" },
  { name: "shadcn", svg: shadcnuiSvg, type: "svg" },
];

function SkillIcon({ svg, className }: { svg: string; className?: string }) {
  const normalized = svg.replace("<svg ", '<svg fill="currentColor" ');
  return <span className={className} dangerouslySetInnerHTML={{ __html: normalized }} aria-hidden />;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [exitOverlay, setExitOverlay] = useState(false);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (hasNavigated.current || exitOverlay) return;
    const wrapper = containerRef.current;
    if (!wrapper || !(wrapper instanceof HTMLElement)) return;
    const scrollable = wrapper.querySelector("div[style*='overflow']") ?? wrapper.firstElementChild;
    const target = scrollable instanceof HTMLElement ? scrollable : null;
    if (!target?.addEventListener) return;
    const check = () => {
      const { scrollTop, scrollHeight, clientHeight } = target;
      const isScrollable = scrollHeight > clientHeight;
      const isAtBottom = scrollHeight > 0 && scrollTop + clientHeight >= scrollHeight - 50;
      if (isScrollable && isAtBottom) {
        hasNavigated.current = true;
        setExitOverlay(true);
      }
    };
    target.addEventListener("scroll", check, { passive: true });
    return () => target.removeEventListener("scroll", check);
  }, [exitOverlay]);

  useEffect(() => {
    if (!exitOverlay) return;
    const t = setTimeout(() => navigate("/about", { replace: true }), 500);
    return () => clearTimeout(t);
  }, [exitOverlay, navigate]);

  return (
    <div ref={containerRef} className="relative h-screen w-full">
      <Parallax pages={3} style={{ top: "0", left: "0", width: "100%", height: "100%" }}>
        {/* ----- Page 0: Background (starry, moves slow) ----- */}
        <ParallaxLayer offset={0} speed={0.25} style={{ pointerEvents: "none" }}>
          <div className="absolute inset-0 bg-background" />
          {/* Light mode: subtle dark dots */}
          <div
            className="absolute inset-0 opacity-40 dark:hidden"
            aria-hidden
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(0,0,0,0.04) 0%, transparent 1px),
                radial-gradient(circle at 80% 70%, rgba(0,0,0,0.05) 0%, transparent 1px),
                radial-gradient(circle at 50% 50%, rgba(0,0,0,0.03) 0%, transparent 1px)`,
              backgroundSize: "120px 120px, 80px 80px, 160px 160px",
            }}
          />
          {/* Dark mode: subtle light dots */}
          <div
            className="absolute inset-0 hidden opacity-40 dark:block"
            aria-hidden
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 1px),
                radial-gradient(circle at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 1px),
                radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 1px)`,
              backgroundSize: "120px 120px, 80px 80px, 160px 160px",
            }}
          />
        </ParallaxLayer>

        {/* ----- Page 0: Hero content (fixed feel, slight parallax) ----- */}
        <ParallaxLayer offset={0} speed={0.1} className="flex items-center justify-center">
          <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
            {/* Skill icons ring */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden
            >
              <div className="relative h-[min(88vh,620px)] w-[min(95vw,620px)] max-w-full">
                {LANDING_SKILLS.map((skill, i) => {
                  const angleDeg = (360 / LANDING_SKILLS.length) * i - 90;
                  const rad = (angleDeg * Math.PI) / 180;
                  const r = 52;
                  const x = 50 + r * Math.cos(rad);
                  const y = 50 + r * Math.sin(rad);
                  return (
                    <span
                      key={skill.name}
                      className="absolute flex items-center justify-center text-foreground/30 [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                        animation: "skill-float 5s ease-in-out infinite",
                        animationDelay: `${i * 0.2}s`,
                      }}
                      title={skill.name}
                    >
                      {skill.type === "svg" ? (
                        <SkillIcon svg={skill.svg} />
                      ) : (
                        <skill.Icon className="h-5 w-5 md:h-6 md:w-6" />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 opacity-0 animate-hero-in">
              <div className="mb-6 h-px w-12 bg-foreground/20" />
              <h1 className="mb-4 text-5xl font-extralight tracking-tight text-foreground md:text-7xl lg:text-8xl">
                Kyle Nel
              </h1>
              <p className="mb-2 text-sm font-light tracking-[0.3em] text-muted-foreground uppercase md:text-base">
                Full-Stack · Backend & APIs
              </p>
              <div className="mt-6 h-px w-12 bg-foreground/20" />
            </div>

            <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-muted-foreground">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* ----- Page 1: Middle section (tagline / about me) ----- */}
        <ParallaxLayer offset={1} speed={0.2} className="flex items-center justify-center">
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="max-w-md text-lg font-light tracking-wide text-foreground/80 md:text-xl">
              Backend, APIs & automation. Building systems that give clients a clear picture.
            </p>
            <p className="max-w-lg text-sm font-light leading-relaxed text-muted-foreground md:text-base">
              Aspiring 22-year-old building my company Skillance and learning as much as I can along the way — curious, hands-on, and focused on shipping things that work.
            </p>
          </div>
        </ParallaxLayer>

        {/* ----- Page 2: End of parallax (scroll to fade into main site) ----- */}
        <ParallaxLayer offset={2} speed={0} className="flex items-center justify-center">
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm font-light tracking-[0.2em] text-muted-foreground uppercase">
              Keep scrolling to enter
            </p>
            <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground/80" />
          </div>
        </ParallaxLayer>
      </Parallax>

      {/* Fade overlay when reaching end → then navigate */}
      <div
        className="pointer-events-none fixed inset-0 z-50 bg-background transition-opacity duration-500"
        style={{ opacity: exitOverlay ? 1 : 0 }}
        aria-hidden
      />
    </div>
  );
}
