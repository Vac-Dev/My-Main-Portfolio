import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, User } from "lucide-react";

interface TimelineEntry {
  date: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education" | "other";
}

const timelineData: TimelineEntry[] = [
  {
    date: "2021",
    title: "High School Graduation",
    organization: "Hatfield Christian School",
    description: "Completed high school education.",
    type: "education",
  },
  {
    date: "2022 (3 months)",
    title: "Receptionist",
    organization: "Planet Fitness",
    description:
      "Worked as a receptionist during my gap year, handling customer service and front desk operations.",
    type: "other",
  },
  {
    date: "2022 - 2023",
    title: "H & P Exports",
    organization: "Export Company",
    description:
      "Worked at H & P Exports, gaining experience in business operations and logistics.",
    type: "work",
  },
  {
    date: "2023 - 2025",
    title: "BSc Computer & Information Sciences",
    organization: "Varsity College -- Pretoria Campus",
    description:
      "Specialized in Application Development. Graduated with distinction. Focused on full-stack development, software architecture, and database design.",
    type: "education",
  },
  {
    date: "2024 - Present",
    title: "Full-Stack Developer (Mid-Level Responsibilities)",
    organization: "iCam Video Telematics",
    description:
      "Joined as an intern but owned end-to-end delivery across web apps, APIs, automations, and reporting -- effectively operating as the team's mid-level engineer.",
    type: "work",
  },
];

export default function Resume() {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">My Journey</h2>
      <Separator className="my-4" />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

        <div className="space-y-10">
          {timelineData.map((entry, index) => (
            <TimelineItem key={index} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const isLeft = index % 2 === 0;

  const icon =
    entry.type === "education" ? (
      <GraduationCap className="h-3.5 w-3.5 text-foreground" />
    ) : entry.type === "work" ? (
      <Briefcase className="h-3.5 w-3.5 text-foreground" />
    ) : (
      <User className="h-3.5 w-3.5 text-foreground" />
    );

  return (
    <div className="relative flex items-start">
      {/* Timeline dot */}
      <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card md:left-1/2">
        {icon}
      </div>

      {/* Content */}
      <div
        className={`ml-12 w-full md:ml-0 md:w-1/2 ${
          isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
        }`}
      >
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {entry.date}
        </span>
        <h3 className="mt-1 text-base font-semibold text-foreground">{entry.title}</h3>
        <p className="text-sm text-muted-foreground">{entry.organization}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {entry.description}
        </p>
      </div>
    </div>
  );
}
