import { lazy, Suspense, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/Reveal";

const ContactMap = lazy(() => import("@/components/sections/ContactMap"));

const channels = [
  { icon: Mail, label: "Email", value: "kylenel46@gmail.com", href: "mailto:kylenel46@gmail.com" },
  { icon: Phone, label: "Phone", value: "+27 79 503 5019", href: "tel:+27795035019" },
  { icon: Github, label: "GitHub", value: "Vac-Dev", href: "https://github.com/Vac-Dev" },
  { icon: Linkedin, label: "LinkedIn", value: "Kyle Nel", href: "https://linkedin.com" },
] as const;

const field =
  "h-12 rounded-2xl border-0 bg-background px-4 text-base shadow-none ring-1 ring-hairline transition-shadow focus-visible:ring-2 focus-visible:ring-primary md:text-base";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapNear = useInView(mapRef, { once: true, margin: "300px" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );
      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-[1180px] px-5 pt-24 pb-16 sm:px-8 sm:pt-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="title text-[clamp(2.5rem,7vw,4.5rem)]">Get in touch.</h2>
            <p className="lede mt-5 max-w-[40ch] text-lg text-muted-foreground">
              Have a question or want to work together? Send a message and I'll get back to you as
              soon as possible.
            </p>
          </Reveal>

          <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
            {channels.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.05}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 py-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground/6 text-muted-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted-foreground">{c.label}</span>
                    <span className="block truncate text-base font-medium tracking-tight">{c.value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-[28px] bg-surface p-6 ring-1 ring-hairline sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="user_name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="user_name" name="user_name" placeholder="Your name" autoComplete="name" required className={field} />
              </div>
              <div className="space-y-2">
                <label htmlFor="user_email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="user_email"
                  name="user_email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className={field}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" name="subject" placeholder="What is this about?" required className={field} />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message…"
                rows={6}
                required
                className={`${field} h-auto resize-none py-3.5`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </motion.button>
          </form>
        </Reveal>
      </div>

      <Reveal className="mt-20">
        <div
          ref={mapRef}
          className="relative h-[300px] overflow-hidden rounded-[28px] bg-surface ring-1 ring-hairline sm:h-[380px]"
        >
          {mapNear && (
            <Suspense fallback={null}>
              <ContactMap />
            </Suspense>
          )}
          <div className="glass pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <MapPin className="h-4 w-4 text-primary" />
            Pretoria, South Africa
          </div>
        </div>
      </Reveal>
    </section>
  );
}
