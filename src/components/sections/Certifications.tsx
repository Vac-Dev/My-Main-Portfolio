import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Award } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  downloadUrl?: string;
  /** Shown instead of Download when certificate is not yet available */
  note?: string;
}

const certificates: Certificate[] = [
  {
    title: "BSc Computer & Information Sciences",
    issuer: "Varsity College — Pretoria Campus",
    date: "2025",
    note: "Contact me, Awaiting Degree Certificate",
  },
  {
    title: "CV",
    issuer: "Professional summary",
    date: "PDF",
    downloadUrl: "/documents/Kyle Nel Resume.pdf",
  },
  {
    title: "Academic Transcript",
    issuer: "Varsity College — Pretoria Campus",
    date: "2025",
    downloadUrl: "/documents/Academic Transcipt.pdf",
  },
];

export default function Certifications() {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">Certifications</h2>
      <Separator className="my-4" />

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        My academic credentials and professional certifications. Download copies below.
      </p>

      <div className="space-y-4">
        {certificates.map((cert, index) => (
          <CertificateItem key={index} cert={cert} />
        ))}
      </div>
    </section>
  );
}

function CertificateItem({ cert }: { cert: Certificate }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/10">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Award className="h-5 w-5 text-foreground" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
          <p className="text-sm text-muted-foreground">
            {cert.issuer} &middot; {cert.date}
          </p>
        </div>
      </div>

      {cert.note ? (
        <p className="shrink-0 text-sm text-muted-foreground">{cert.note}</p>
      ) : cert.downloadUrl ? (
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <a href={cert.downloadUrl} download>
            <Download className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </Button>
      ) : null}
    </div>
  );
}
