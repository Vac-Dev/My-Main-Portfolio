import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface MobileNavProps {
  activePage: string;
}

const navItems = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function MobileNav({ activePage }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-50 flex h-14 items-center justify-end border-b border-border bg-background/80 px-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer rounded-md p-2 text-foreground transition-colors hover:bg-accent"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`cursor-pointer rounded-lg px-4 py-3 text-left text-base transition-colors ${
                  activePage === item.id
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
