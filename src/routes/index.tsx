import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Background } from "@/components/portfolio/Background";
import { Cursor } from "@/components/portfolio/Cursor";
import { Loader } from "@/components/portfolio/Loader";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { ProgressIndicator } from "@/components/portfolio/ProgressIndicator";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize smooth momentum scrolling (Lenis) for desktop devices and handle instant navbar jumps
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    let lenis: Lenis | null = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.8,
      });

      // Expose lenis globally for components like ProgressIndicator
      (window as any).lenis = lenis;
    }

    let rafId = 0;
    if (lenis) {
      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // Handle local anchor link clicks: jump instantly to target section
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          if (lenis) {
            lenis.scrollTo(targetElement, { immediate: true });
          } else {
            targetElement.scrollIntoView({ behavior: "auto" });
          }
          // Update URL hash without native browser jump scroll
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      (window as any).lenis = undefined;
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-white">
      {/* Loading experience */}
      <Loader onComplete={() => setIsLoaded(true)} />

      {/* Global Background, Cursor, Nav */}
      <Background />
      <Cursor />
      <Nav isLoaded={isLoaded} />

      {/* Desktop Vertical Progress Indicator */}
      <ProgressIndicator />

      {/* Main Content Area */}
      <main className="relative z-10">
        <Hero isLoaded={isLoaded} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
