import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Mail } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  contactEmail?: string;
}

const projects: Project[] = [
  {
    title: "Skillance",
    description:
      "Co-Founder. Marketplace platform connecting customers with local service providers across 13+ categories (automotive, cleaning, computer services, education, fitness, gardening, handyman, music, photography, videography, etc.). Location-based search with PostGIS, booking system with real-time availability and session verification, in-app messaging with moderation, Walletdoc payments, and an admin dashboard with analytics, user management, and verification workflows. Security includes geo-blocking, rate limiting, threat detection, and audit logging.",
    tags: ["Fastify", "React", "TypeScript", "PostgreSQL", "PostGIS", "Redis", "Firebase", "AWS S3", "Flutter"],
    liveUrl: "https://www.skillance.co.za",
  },
  {
    title: "Custom CRM for Fleet Operations",
    description:
      "Internal CRM built with shadcn/ui that consolidates customer profiles, fleet metadata, and automated follow-ups for iCam Video Telematics.",
    tags: ["React", "shadcn/ui", "Node.js", "PostgreSQL"],
  },
  {
    title: "Automated Driver Tagging Program",
    description:
      "C# service that watches for driver/route changes and automatically issues device commands to update on-board trackers without manual intervention.",
    tags: ["C#", ".NET", "Device Commands"],
  },
  {
    title: "Afrisist Alarm Monitoring",
    description:
      "Self-hosted, real-time web application for managing vehicle alarms for large fleets with WebSocket-based live updates and automated notification logic.",
    tags: ["React", "Node.js", "Supabase", "WebSocket", "DaisyUI"],
    contactEmail: "martin@afrisist.com",
  },
  {
    title: "Knowledge Portal",
    description:
      "Quiz training platform built with C# MVC. Serves as a knowledge and assessment tool for training and certification.",
    tags: ["C#", "ASP.NET MVC", ".NET"],
  },
  {
    title: "Java Maze Game",
    description:
      "Grade 12 project. Java desktop application—a maze game with save/load progress, multiple maze levels, and persistence (e.g. Access database). Built with Java and Ant.",
    tags: ["Java", "Desktop"],
    githubUrl: "https://github.com/Vac-Dev/JavaProjects",
  },
  {
    title: "Siren Alarm Monitoring",
    description:
      "Backend service that listens for alarms via webhook, persists them to PostgreSQL, determines the correct client for each alarm, then sends a command through device APIs to trigger a siren in that client's office—end-to-end alarm routing and activation.",
    tags: ["Webhooks", "PostgreSQL", "REST APIs", "Device Commands"],
  },
];

export default function Portfolio() {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">Portfolio</h2>
      <Separator className="my-4" />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/10 hover:shadow-md">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
        <div className="flex items-center gap-2">
          {project.contactEmail && (
            <a
              href={`mailto:${project.contactEmail}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
              title={project.contactEmail}
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs font-normal">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
