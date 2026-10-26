import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Reveal } from "@/components/Reveal";

const STATEMENT =
  "I'm a full-stack developer with a BSc in Computer & Information Sciences (Application Development), with a strong preference for backend, databases, and APIs. Day-to-day I work at iCam Video Telematics building programs, websites, APIs, automations, and reporting systems that give fleet managers a clear picture of their operations.";

const techStack = [
  "JavaScript",
  "C#",
  "React",
  "Node.js",
  "ASP.NET",
  "PostgreSQL",
  "n8n Automation",
];

const whatIDo = [
  ["APIs & Backend", "Designing and building APIs, data flows, automations, and resilient services."],
  ["Databases", "Schema design, queries, and making data reliable and fast."],
  ["Full-Stack Delivery", "End-to-end web apps when the product needs it."],
  ["Reporting & Analytics", "Systems that turn raw data into clear insights."],
] as const;

function Word({
  word,
  range,
  progress,
  reduce,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity: reduce ? 1 : opacity }} className="mr-[0.26em] inline-block">
      {word}
    </motion.span>
  );
}

export default function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.45"] });
  const words = STATEMENT.split(" ");

  return (
    <section id="about" className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
      <p
        ref={ref}
        className="title max-w-[26ch] text-[clamp(1.75rem,4.6vw,3.25rem)] text-foreground sm:max-w-[30ch]"
        aria-label={STATEMENT}
      >
        <span aria-hidden>
          {words.map((w, i) => (
            <Word
              key={i}
              word={w}
              reduce={reduce}
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 4) / words.length)]}
            />
          ))}
        </span>
      </p>

      <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="space-y-6">
          <Reveal>
            <p className="lede max-w-[60ch] text-lg text-muted-foreground">
              I like working with APIs a lot — designing them, orchestrating data flows, and keeping
              services resilient. I'm happy to jump into frontend or DevOps when it helps ship the
              product, but my sweet spot is the backend. I aim to stay an all-rounder who can bridge
              multiple disciplines rather than specialize in a single title.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lede max-w-[60ch] text-lg text-muted-foreground">
              Outside of work I'm usually in the gym or experimenting with new backend stacks in my
              home lab. I'm a curious learner who prefers hands-on exploration over giving advice, and
              I pour that energy back into the products I build.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lede max-w-[60ch] text-lg text-muted-foreground">
              Aspiring 22-year-old building my company Skillance and learning as much as I can along
              the way — curious, hands-on, and focused on shipping things that work.
            </p>
          </Reveal>
        </div>

        <div>
          <h3 className="sr-only">What I do</h3>
          <ul className="divide-y divide-hairline border-y border-hairline">
            {whatIDo.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 0.06} className="py-6 first:pt-6">
                <p className="text-xl font-semibold tracking-tight">{title}</p>
                <p className="lede mt-1.5 text-base text-muted-foreground">{body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1} className="mt-10">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Technical focus</h3>
            <ul className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <motion.li
                  key={t}
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="cursor-default rounded-full bg-surface px-4 py-2 text-sm font-medium tracking-tight ring-1 ring-hairline"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
