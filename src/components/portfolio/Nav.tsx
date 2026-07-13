import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { playClickSound, playNavClickSound } from "@/lib/sound";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#milestones", label: "Milestones" },
  { href: "#contact", label: "Contact" },
];

interface NavProps {
  isLoaded?: boolean;
}

export function Nav({ isLoaded = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const threshold = 10;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Handle scrolled state for backdrop style change
      setScrolled(scrollY > 60);

      // At the very top, always show navbar
      if (scrollY < 50) {
        setVisible(true);
        ticking = false;
        return;
      }

      const diff = scrollY - lastScrollY;

      // Only act if scroll difference is larger than the threshold
      if (Math.abs(diff) >= threshold) {
        if (diff > 0) {
          // Scrolling down - hide
          setVisible(false);
        } else {
          // Scrolling up - show
          setVisible(true);
        }
        lastScrollY = scrollY;
      }
      ticking = false;
    };

    // Run initially
    handleScroll();

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // If mobile menu is open, force navbar to be visible
  const activeVisible = visible || open;

  const springTransition = {
    type: "spring",
    stiffness: 140,
    damping: 18,
    mass: 0.8,
    opacity: { duration: 0.25 },
  } as const;

  const easeTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  } as const;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{
        y: !isLoaded ? -40 : activeVisible ? 0 : "-120%",
        opacity: !isLoaded ? 0 : activeVisible ? 1 : 0.95,
      }}
      transition={
        !isLoaded
          ? { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
          : activeVisible
            ? springTransition
            : easeTransition
      }
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4 select-none"
    >
      <div
        className={`flex w-full max-w-[1400px] items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] border border-white/10 backdrop-blur-[20px]"
            : "border border-transparent bg-transparent"
        }`}
      >
        {/* LOGO brand */}
        <Magnetic range={50} strength={0.25}>
          <a
            href="#top"
            className={`group flex items-center gap-2 transition-transform duration-500 ${
              scrolled ? "scale-105" : "scale-100"
            }`}
          >
            {/* Custom Premium Animated S Monogram Logo */}
            <div className="relative flex items-center justify-center w-9 h-9">
              {/* Outer glowing aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6] to-[#3b82f6] rounded-xl blur-md opacity-35 group-hover:opacity-75 transition-opacity duration-500" />

              {/* Glassmorphic card base */}
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-[#0d0c1d]/90 border border-white/10 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105 group-hover:rotate-[3deg] group-hover:border-white/20">
                {/* Internal gradient shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                <div className="absolute -inset-full bg-gradient-to-tr from-[#8b5cf6]/10 via-transparent to-[#3b82f6]/10 rotate-45 group-hover:animate-pulse" />

                {/* SVG S Monogram */}
                <svg
                  className="w-[22px] h-[22px] relative z-10"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="monogram-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient
                      id="monogram-grad-secondary"
                      x1="100%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <linearGradient
                      id="monogram-grad-highlight"
                      x1="0%"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                    >
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Underlay glow path */}
                  <path
                    d="M74 30 C74 18, 26 18, 26 34 C26 46, 46 48, 50 54 C54 60, 74 62, 74 74 C74 90, 26 90, 26 78"
                    stroke="url(#monogram-grad-primary)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.25"
                  />

                  {/* Core Ribbon path */}
                  <path
                    d="M74 30 C74 18, 26 18, 26 34 C26 46, 46 48, 50 54 C54 60, 74 62, 74 74 C74 90, 26 90, 26 78"
                    stroke="url(#monogram-grad-primary)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Overlay highlight for 3D interlocking depth */}
                  <path
                    d="M50 54 C54 60, 74 62, 74 74 C74 90, 40 90, 32 84"
                    stroke="url(#monogram-grad-secondary)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />

                  {/* Top-end crisp highlight line */}
                  <path
                    d="M72 29 C70 22, 34 18, 31 28 C28 34, 42 38, 48 46"
                    stroke="url(#monogram-grad-highlight)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>
            <span className="font-display text-sm font-bold tracking-[0.22em] uppercase text-white transition-all duration-500 group-hover:[text-shadow:0_0_18px_rgba(139,92,246,0.9)]">
              Sufiyan<span className="text-accent">.</span>
            </span>
          </a>
        </Magnetic>

        {/* NAVIGATION LINKS */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Magnetic key={l.href} range={40} strength={0.3}>
              <a
                href={l.href}
                onClick={playNavClickSound}
                className="group relative block rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted transition-all duration-500 hover:text-white hover:[text-shadow:0_0_16px_rgba(139,92,246,0.7)]"
              >
                {l.label}
                <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </Magnetic>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:block">
          <Magnetic range={60} strength={0.35}>
            <a
              href="#contact"
              onClick={playNavClickSound}
              className="inline-flex btn-primary btn-primary-hover !py-2.5 !px-6 !text-xs"
            >
              Let's Talk
            </a>
          </Magnetic>
        </div>

        <button
          onClick={() => {
            playClickSound();
            setOpen((s) => !s);
          }}
          className="md:hidden rounded-full glass p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-3 w-[calc(100%-2rem)] max-w-[1400px] glass-strong rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => {
                    playNavClickSound();
                    setOpen(false);
                  }}
                  className="rounded-2xl px-4 py-3 text-sm uppercase tracking-widest text-muted hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
