import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import MainLayout from "@/components/layout/MainLayout";
import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import Portfolio from "@/components/sections/Portfolio";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<MainLayout />}>
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          {/* Redirect /home to /about as default */}
          <Route path="/home" element={<Navigate to="/about" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
