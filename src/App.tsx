import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Journey />
        <Contact />
      </main>
      <footer className="mx-auto flex w-full max-w-[1180px] flex-col gap-2 px-5 pt-10 pb-12 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Kyle Nel</p>
        <p>Full-stack developer · Pretoria, South Africa</p>
      </footer>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
