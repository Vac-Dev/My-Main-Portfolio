import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavbarProps {
  activePage: string;
}

const navItems = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activePage }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-end px-6">
        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/${item.id}`)}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors ${
                  activePage === item.id
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="ml-2 h-5 w-px bg-border" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
