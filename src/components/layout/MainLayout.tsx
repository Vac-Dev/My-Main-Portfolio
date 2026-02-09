import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import FadeIn from "@/components/FadeIn";

export default function MainLayout() {
  const location = useLocation();
  // Extract active page from pathname e.g. "/about" -> "about"
  const activePage = location.pathname.replace("/", "") || "about";

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile nav */}
      <MobileNav activePage={activePage} />

      {/* Mobile sidebar card */}
      <div className="block px-4 pt-4 md:hidden">
        <MobileSidebar />
      </div>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-8">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="min-w-0 flex-1">
          {/* Desktop nav */}
          <div className="hidden md:block">
            <Navbar activePage={activePage} />
          </div>

          {/* Page content */}
          <main className="py-6 md:py-8">
            <FadeIn key={activePage}>
              <Outlet />
            </FadeIn>
          </main>
        </div>
      </div>
    </div>
  );
}
