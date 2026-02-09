import { Link } from "react-router-dom";
import { MapPin, Phone, Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  return (
    <aside className="sticky top-6 h-fit w-72 shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm lg:block">
      {/* Profile picture */}
      <div className="flex flex-col items-center">
        <div className="mb-4 h-28 w-28 overflow-hidden rounded-2xl bg-muted">
          {/* Replace with your actual profile picture */}
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
            KN
          </div>
        </div>
        <Link to="/" className="text-lg font-semibold text-foreground transition-colors hover:underline">
          Kyle Nel
        </Link>
        <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
        <p className="text-xs text-muted-foreground/80">Backend & APIs</p>
      </div>

      <Separator className="my-5" />

      {/* Info items */}
      <div className="space-y-4">
        <InfoItem icon={<Phone className="h-4 w-4" />} label="Phone" value="+27 79 503 5019" />
        <InfoItem icon={<MapPin className="h-4 w-4" />} label="Location" value="Pretoria, South Africa" />
        <InfoItem icon={<Mail className="h-4 w-4" />} label="Email" value="kylenel46@gmail.com" />
      </div>

      <Separator className="my-5" />

      {/* Social icons */}
      <div className="flex items-center justify-center gap-3">
        <SocialLink href="https://github.com/Vac-Dev" icon={<Github className="h-4 w-4" />} label="GitHub" />
        <SocialLink href="https://linkedin.com" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
        <SocialLink href="mailto:kylenel46@gmail.com" icon={<Mail className="h-4 w-4" />} label="Email" />
      </div>
    </aside>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
