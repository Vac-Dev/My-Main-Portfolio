import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
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
  // Ensure the icon uses currentColor (so our opacity/color styling applies).
  const normalized = svg.replace("<svg ", '<svg fill="currentColor" ');
  return <span className={className} dangerouslySetInnerHTML={{ __html: normalized }} aria-hidden />;
}

function LandingContent() {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (hasNavigated.current) return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const fadeProgress = Math.min(scrollY / (windowHeight * 0.4), 1);
      setOpacity(1 - fadeProgress);

      if (scrollY > windowHeight * 0.5) {
        hasNavigated.current = true;
        navigate("/about");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  const handleEnter = () => {
    navigate("/about");
  };

  return (
    <div className="relative bg-[#0a0a0a]">
      <div className="relative h-screen w-full overflow-hidden">
        <Parallax speed={-20} className="absolute inset-0">
          <div className="h-[120vh] w-full bg-[#0a0a0a]">
            <div className="h-full w-full bg-[#0a0a0a]" />
          </div>
        </Parallax>

        <div className="absolute inset-0 z-[1] bg-[#0a0a0a]/40" />

        <Parallax speed={-5} className="absolute inset-0 z-[2]">
          <div
            className="relative flex h-screen flex-col items-center justify-center px-6 text-center transition-opacity duration-300"
            style={{ opacity }}
          >
            {/* Floating skill icons (real tech logos) in a wide ring around the name */}
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
                      className="absolute flex items-center justify-center text-white/30 transition-colors hover:text-white/50 [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6"
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

            <div className="relative z-10">
              <div className="mb-6 h-px w-12 bg-white/20" />
              <h1 className="mb-4 text-5xl font-extralight tracking-tight text-white md:text-7xl lg:text-8xl">
                Kyle Nel
              </h1>
              <p className="mb-2 text-sm font-light tracking-[0.3em] text-white/50 uppercase md:text-base">
                Full-Stack · Backend & APIs
              </p>
              <div className="mt-6 h-px w-12 bg-white/20" />
            </div>
          </div>
        </Parallax>

        <button
          onClick={handleEnter}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 cursor-pointer animate-bounce text-white/30 transition-colors hover:text-white/60"
          style={{ opacity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </div>
        </button>
      </div>

      <div className="h-[60vh] bg-[#0a0a0a]" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <ParallaxProvider>
      <LandingContent />
    </ParallaxProvider>
  );
}
