import { useEffect, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeIn({ children, className = "" }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use a small timeout to ensure the browser has painted the initial state
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
