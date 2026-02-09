import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const techStack = [
  "JavaScript",
  "C#",
  "React",
  "Node.js",
  "ASP.NET",
  "PostgreSQL",
];

export default function About() {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">About Me</h2>
      <Separator className="my-4" />

      <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          I'm a full-stack developer and BSc IT student specializing in Application
          Development, with a strong preference for backend, databases, and APIs. Day-to-day
          I work at iCam Video Telematics building programs, websites, APIs, automations,
          and reporting systems that give fleet managers a clear picture of their operations.
        </p>

        <p>
          I like working with APIs a lot -- designing them, orchestrating data flows, and
          keeping services resilient. I'm happy to jump into frontend or DevOps when it
          helps ship the product, but my sweet spot is the backend. I aim to stay an
          all-rounder who can bridge multiple disciplines rather than specialize in a
          single title.
        </p>

        <p>
          Outside of work I'm usually in the gym or experimenting with new backend stacks
          in my home lab. I'm a curious learner who prefers hands-on exploration over
          giving advice, and I pour that energy back into the products I build.
        </p>

        <div className="pt-4">
          <h3 className="mb-3 text-lg font-medium text-foreground">Technical Focus</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <h3 className="mb-3 text-lg font-medium text-foreground">What I Do</h3>
          <ul className="list-inside space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
              <span>APIs & Backend -- designing and building APIs, data flows, automations, and resilient services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
              <span>Databases -- schema design, queries, and making data reliable and fast</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
              <span>Full-Stack Delivery -- end-to-end web apps when the product needs it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
              <span>Reporting & Analytics -- systems that turn raw data into clear insights</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
