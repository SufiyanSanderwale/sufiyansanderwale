import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function ProgressIndicator() {
  const [activeSection, setActiveSection] = useState("top");
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when the section occupies the center area of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-row items-center gap-4 lg:flex select-none">
      {/* Scroll indicator tracks the vertical progress line */}
      <div className="relative flex h-56 w-[2px] items-center justify-center rounded-full bg-white/5">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute inset-x-0 top-0 h-full rounded-full bg-gradient-to-b from-accent to-accent-2 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
        />
      </div>

      {/* Vertical dots stack with sliding text overlays */}
      <div className="flex flex-col gap-5">
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={(e) => handleClick(e, s.id)}
              className="group relative flex h-4 w-4 cursor-pointer items-center justify-end"
              aria-label={`Scroll to ${s.label}`}
            >
              {/* Tooltip sliding to the left on hover */}
              <span className="pointer-events-none absolute right-6 rounded-md border border-white/5 bg-[#0b0b0b]/90 px-2 py-1 text-[10px] uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 backdrop-blur-md">
                {s.label}
              </span>

              {/* Indicator Dot */}
              <span className="relative flex h-2 w-2 items-center justify-center">
                {isActive && (
                  <motion.span
                    layoutId="activeDotOutline"
                    className="absolute h-4 w-4 rounded-full border border-accent/60"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_8px_rgba(139,92,246,0.8)] scale-110"
                      : "bg-white/20 hover:bg-white/50"
                  }`}
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
