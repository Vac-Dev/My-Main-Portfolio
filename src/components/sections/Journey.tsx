import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Download } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface Entry {
  date: string;
  title: string;
  organization: string;
  description: string;
}

/** Newest first. */
const timeline: Entry[] = [
  {
    date: "2024 – Present",
    title: "Full-Stack Developer (Mid-Level Responsibilities)",
    organization: "iCam Video Telematics",
    description:
      "Joined as an intern but owned end-to-end delivery across web apps, APIs, automations, and reporting -- effectively operating as the team's mid-level engineer.",
  },
  {
    date: "2023 – 2025",
    title: "BSc Computer & Information Sciences",
    organization: "Varsity College — Pretoria Campus",
    description:
      "Specialized in Application Development. Graduated with distinction. Focused on full-stack development, software architecture, and database design.",
  },
  {
    date: "2022 – 2023",
    title: "H & P Exports",
    organization: "Export Company",
    description: "Worked at H & P Exports, gaining experience in business operations and logistics.",
  },
  {
    date: "2022 (3 months)",
    title: "Receptionist",
    organization: "Planet Fitness",
    description:
      "Worked as a receptionist during my gap year, handling customer service and front desk operations.",
  },
  {
    date: "2021",
    title: "High School Graduation",
    organization: "Hatfield Christian School",
    description: "Completed high school education.",
  },
];

interface Doc {
  title: string;
  meta: string;
  href?: string;
  note?: string;
}

const documents: Doc[] = [
  { title: "CV", meta: "Professional summary · PDF", href: "/documents/Kyle Nel Resume.pdf" },
  {
    title: "Academic Transcript",
    meta: "Varsity College — Pretoria Campus · 2025",
    href: "/documents/Academic Transcipt.pdf",
  },
  {
    title: "BSc Computer & Information Sciences",
    meta: "Varsity College — Pretoria Campus · 2025",
    note: "Awaiting degree certificate. Contact me for details.",
  },
];

export default function Journey() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.6 });

  return (
    <section id="journey" className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <h2 className="title text-[clamp(2.5rem,7vw,4.5rem)]">The path so far.</h2>
      </Reveal>

      <ol ref={ref} className="relative mt-16 space-y-12 sm:space-y-16">
        {/* Rail and the progress that fills it */}
        <div aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-hairline sm:left-[9.5rem]" />
        <motion.div
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-primary sm:left-[9.5rem]"
          style={{ scaleY: reduce ? 1 : line }}
        />

        {timeline.map((e) => (
          <li key={e.title} className="relative grid gap-2 pl-8 sm:grid-cols-[9rem_1fr] sm:gap-12 sm:pl-0">
            <motion.span
              aria-hidden
              className="absolute top-[0.45rem] left-0 h-[11px] w-[11px] rounded-full ring-4 ring-background sm:left-[calc(9.5rem-5px)]"
              initial={{ backgroundColor: "var(--hairline)", scale: 0.7 }}
              whileInView={{ backgroundColor: "var(--primary)", scale: 1 }}
              viewport={{ margin: "0px 0px -40% 0px" }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            />
            <Reveal className="tabular pt-0.5 text-sm font-medium text-muted-foreground sm:text-right">
              {e.date}
            </Reveal>
            <Reveal delay={0.05} className="sm:pl-6">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{e.title}</h3>
              <p className="mt-1 text-base text-muted-foreground">{e.organization}</p>
              <p className="lede mt-3 max-w-[58ch] text-base text-muted-foreground">{e.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <div id="credentials" className="mt-28">
        <Reveal>
          <h3 className="title text-3xl sm:text-4xl">Credentials.</h3>
          <p className="lede mt-3 max-w-[52ch] text-lg text-muted-foreground">
            My academic credentials and professional certifications. Download copies below.
          </p>
        </Reveal>

        <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
          {documents.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 0.06}>
              <DocRow doc={d} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DocRow({ doc }: { doc: Doc }) {
  const body = (
    <>
      <div className="min-w-0">
        <p className="text-lg font-semibold tracking-tight">{doc.title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{doc.note ?? doc.meta}</p>
      </div>
      {doc.href && (
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground/6 px-4 py-2 text-sm font-medium transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </span>
      )}
    </>
  );

  return doc.href ? (
    <a href={doc.href} download className="group flex items-center justify-between gap-6 py-6">
      {body}
    </a>
  ) : (
    <div className="flex items-center justify-between gap-6 py-6">{body}</div>
  );
}
