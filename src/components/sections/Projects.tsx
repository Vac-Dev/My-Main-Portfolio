import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProjectArt, type ArtKey } from "@/components/projects/ProjectArt";
import { easeOutExpo } from "@/lib/motion";

interface Project {
  title: string;
  description: string;
  tags: string[];
  art: ArtKey;
  hue: number;
  /** Tailwind grid placement at lg */
  span?: string;
  liveUrl?: string;
  githubUrl?: string;
  contactEmail?: string;
}

const projects: Project[] = [
  {
    title: "Skillance",
    art: "skillance",
    hue: 250,
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    description:
      "Co-Founder. Marketplace platform connecting customers with local service providers across 13+ categories (automotive, cleaning, computer services, education, fitness, gardening, handyman, music, photography, videography, etc.). Location-based search with PostGIS, booking system with real-time availability and session verification, in-app messaging with moderation, Walletdoc payments, and an admin dashboard with analytics, user management, and verification workflows. Security includes geo-blocking, rate limiting, threat detection, and audit logging.",
    tags: ["Fastify", "React", "TypeScript", "PostgreSQL", "PostGIS", "Redis", "Firebase", "AWS S3", "Flutter"],
    liveUrl: "https://www.skillance.co.za",
  },
  {
    title: "Custom CRM for Fleet Operations",
    art: "crm",
    hue: 195,
    description:
      "Internal CRM built with shadcn/ui that consolidates customer profiles, fleet metadata, and automated follow-ups for iCam Video Telematics.",
    tags: ["React", "shadcn/ui", "Node.js", "PostgreSQL"],
  },
  {
    title: "Automated Driver Tagging Program",
    art: "tagging",
    hue: 155,
    description:
      "C# service that watches for driver/route changes and automatically issues device commands to update on-board trackers without manual intervention.",
    tags: ["C#", ".NET", "Device Commands"],
  },
  {
    title: "Afrisist Alarm Monitoring",
    art: "afrisist",
    hue: 25,
    span: "sm:col-span-2 lg:col-span-2",
    description:
      "Self-hosted, real-time web application for managing vehicle alarms for large fleets with WebSocket-based live updates and automated notification logic.",
    tags: ["React", "Node.js", "Supabase", "WebSocket", "DaisyUI"],
    contactEmail: "martin@afrisist.com",
  },
  {
    title: "Siren Alarm Monitoring",
    art: "siren",
    hue: 350,
    description:
      "Backend service that listens for alarms via webhook, persists them to PostgreSQL, determines the correct client for each alarm, then sends a command through device APIs to trigger a siren in that client's office—end-to-end alarm routing and activation.",
    tags: ["Webhooks", "PostgreSQL", "REST APIs", "Device Commands"],
  },
  {
    title: "Knowledge Portal",
    art: "portal",
    hue: 300,
    description:
      "Quiz training platform built with C# MVC. Serves as a knowledge and assessment tool for training and certification.",
    tags: ["C#", "ASP.NET MVC", ".NET"],
  },
  {
    title: "Java Maze Game",
    art: "maze",
    hue: 85,
    description:
      "Grade 12 project. Java desktop application—a maze game with save/load progress, multiple maze levels, and persistence (e.g. Access database). Built with Java and Ant.",
    tags: ["Java", "Desktop"],
    githubUrl: "https://github.com/Vac-Dev/JavaProjects",
  },
];

export default function Projects() {
  return (
    <section id="work" className="mx-auto w-full max-w-[1180px] px-5 pt-24 pb-28 sm:px-8 sm:pt-32">
      <Reveal>
        <h2 className="title max-w-[16ch] text-[clamp(2.5rem,7vw,4.5rem)]">
          Selected work.
          <span className="block text-muted-foreground">Built, shipped, running.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Tile key={p.title} project={p} index={i} />
        ))}
        <GithubTile />
      </div>
    </section>
  );
}

function Tile({ project: p, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const href = p.liveUrl ?? p.githubUrl ?? (p.contactEmail ? `mailto:${p.contactEmail}` : undefined);
  const big = p.span?.includes("row-span-2");

  const Wrapper = href ? "a" : "div";
  const linkProps = href
    ? {
        href,
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
        "aria-label": `${p.title}${p.liveUrl ? ", open live site" : p.githubUrl ? ", open on GitHub" : ", email"}`,
      }
    : {};

  return (
    <motion.article
      className={`tile group relative isolate flex ${p.span ?? ""}`}
      style={{ ["--h" as string]: p.hue }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.08, ease: easeOutExpo }}
    >
      <motion.div
        className="relative flex w-full flex-col overflow-hidden rounded-[28px] bg-surface ring-1 ring-hairline shadow-[0_1px_2px_rgba(0,0,0,0.06),0_24px_48px_-28px_rgba(0,0,0,0.35)]"
        whileHover={reduce ? undefined : { y: -6, scale: 1.008 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
      >

        {/* Art */}
        <div
          className={`relative overflow-hidden text-(--ink) ${big ? "h-56 sm:h-72 lg:h-[19rem]" : "h-44"}`}
          style={{ background: "color-mix(in oklab, var(--ink) 9%, var(--surface))" }}
        >
          <div className="h-full w-full transition-transform duration-[900ms] ease-(--ease-out-expo) group-hover:scale-[1.05]">
            <ProjectArt name={p.art} />
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-1 flex-col p-6 pt-4 sm:p-8 sm:pt-5">
          <div className="flex items-start justify-between gap-4">
            <h3
              className={`title text-balance ${big ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}
            >
              {href ? (
                <Wrapper {...linkProps} className="after:absolute after:inset-0 after:z-20 after:rounded-[28px] after:content-['']">
                  {p.title}
                </Wrapper>
              ) : (
                p.title
              )}
            </h3>
            {href && (
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground/6 text-muted-foreground transition-all duration-300 group-hover:bg-(--ink) group-hover:text-surface"
              >
                {p.githubUrl ? (
                  <Github className="h-4 w-4" />
                ) : p.contactEmail ? (
                  <Mail className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </span>
            )}
          </div>

          <p className="lede mt-3 text-[15px] text-muted-foreground sm:text-base">{p.description}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded-full bg-foreground/6 px-2.5 py-1 text-xs font-medium tracking-tight text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.article>
  );
}

function GithubTile() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href="https://github.com/Vac-Dev"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-[28px] bg-foreground p-6 text-background sm:p-8"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      whileHover={reduce ? undefined : { y: -6, scale: 1.008 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.9, ease: easeOutExpo }}
    >
      <Github aria-hidden className="h-9 w-9" />
      <div className="flex items-end justify-between gap-4">
        <p className="title text-2xl">
          More on
          <br />
          GitHub
        </p>
        <ArrowUpRight
          aria-hidden
          className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </motion.a>
  );
}
