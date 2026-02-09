import { Link } from "react-router-dom";
import { MapPin, Mail, Github, Linkedin } from "lucide-react";

export default function MobileSidebar() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-4">
        {/* Profile picture */}
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            KN
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <Link to="/" className="text-base font-semibold text-foreground hover:underline">
            Kyle Nel
          </Link>
          <p className="text-sm text-muted-foreground">Full-Stack · Backend & APIs</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Pretoria, SA
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              kylenel46@gmail.com
            </span>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex shrink-0 items-center gap-1">
          <SocialLink href="https://github.com/Vac-Dev" icon={<Github className="h-3.5 w-3.5" />} label="GitHub" />
          <SocialLink href="https://linkedin.com" icon={<Linkedin className="h-3.5 w-3.5" />} label="LinkedIn" />
        </div>
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
      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
