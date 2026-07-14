import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { ArrowDown, Download, Eye, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-sufiyan.png";

import { Magnetic } from "./Magnetic";
import { Lightweight3DScene } from "./Lightweight3DScene";
import { playClickSound } from "@/lib/sound";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/SufiyanSanderwale" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/sufiyan-sanderwale" },
  { icon: Mail, label: "Email", href: "mailto:sufiyansanderwale54@gmail.com" },
];

const roles = ["Software Developer", "Java Developer", "AI Enthusiast"];

interface HeroProps {
  isLoaded?: boolean;
}

export function Hero({ isLoaded = false }: HeroProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotX = useTransform(sy, [-1, 1], [8, -8]);
  const rotY = useTransform(sx, [-1, 1], [-8, 8]);
  const tX = useTransform(sx, [-1, 1], [-18, 18]);
  const tY = useTransform(sy, [-1, 1], [-18, 18]);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "100px" });
  const { scrollY } = useScroll();
  const portraitScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const headingY = useTransform(scrollY, [0, 600], [0, 80]);
  const bgY = useTransform(scrollY, [0, 600], [0, 140]);

  // Track if scrolling has occurred to fade scroll indicator
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let rect: DOMRect | null = null;
    const updateRect = () => {
      if (ref.current) {
        rect = ref.current.getBoundingClientRect();
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    const onMove = (e: MouseEvent) => {
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2))));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mx, my]);

  const headingWords = ["HI,", "I'M", "SUFIYAN"];

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[#050505] pt-24 pb-16 sm:pt-28 md:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* 3D Wireframe sphere drawn on interactive Canvas */}
      <div className="absolute right-[5%] top-[10%] h-[320px] w-[320px] md:h-[450px] md:w-[450px] pointer-events-none z-0">
        <Lightweight3DScene active={isLoaded} />
      </div>

      {/* Local background objects (parallax) */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10">
        {/* Sequence 2: Background purple glow behind portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.8, delay: 0.1, ease }}
          className="absolute right-[8%] top-1/3 h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 65%)" }}
        />
        {/* Blue glow near bottom left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.3, ease }}
          className="absolute bottom-[-120px] left-1/4 h-[420px] w-[520px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.45), transparent 65%)" }}
        />

        {/* Small floating particles */}
        {isLoaded &&
          isInView &&
          Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/60"
              style={{
                left: `${(i * 73) % 100}%`,
                top: `${(i * 37) % 100}%`,
                boxShadow: "0 0 10px rgba(139,92,246,0.9)",
              }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
      </motion.div>

      <div className="container-x grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 relative z-10">
        {/* LEFT COMPONENT */}
        <motion.div style={{ y: headingY }} className="order-2 lg:order-1">
          {/* Sequence 7: Availability badge fades */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.9, delay: 1.7, ease }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for Work
          </motion.div>

          {/* Sequence 4: Heading reveals word-by-word / line-by-line */}
          <h1 className="font-display mt-6 max-w-[12ch] text-[13vw] font-bold leading-[0.9] tracking-[-0.04em] sm:text-7xl lg:text-[7rem] select-none">
            {headingWords.map((w, i) => (
              <span key={w} className="mr-4 inline-block overflow-hidden align-top">
                <motion.span
                  initial={{ y: "115%", opacity: 0, filter: "blur(12px)" }}
                  animate={
                    isLoaded
                      ? { y: 0, opacity: 1, filter: "blur(0px)" }
                      : { y: "115%", opacity: 0, filter: "blur(12px)" }
                  }
                  transition={{ duration: 1.1, delay: 0.6 + i * 0.15, ease }}
                  className={`inline-block ${w === "SUFIYAN" ? "text-gradient-accent" : "text-white"}`}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Sequence 5: Subtitle roles stagger reveal */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium uppercase tracking-[0.2em] text-muted md:text-base">
            {roles.map((r, i) => (
              <div key={r} className="flex items-center gap-3">
                <motion.span
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={
                    isLoaded
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 12, filter: "blur(8px)" }
                  }
                  transition={{ duration: 0.9, delay: 1.2 + i * 0.15, ease }}
                >
                  {r}
                </motion.span>
                {i < roles.length - 1 && <span className="text-accent">•</span>}
              </div>
            ))}
          </div>

          {/* Paragraph reveals */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 1.5, ease }}
            className="mt-7 max-w-[560px] text-[15px] leading-[1.8] text-muted md:text-base"
          >
            I build modern web applications, Java-based software solutions, and AI-powered
            applications with a strong focus on performance, scalability, clean architecture, and
            exceptional user experience.
          </motion.p>

          {/* Sequence 6: Buttons slide upward */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 1.1, delay: 1.65, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic range={50} strength={0.3}>
              <a
                href="/Sufiyan_Sanderwale_Resume.pdf"
                download="Sufiyan_Sanderwale_Resume.pdf"
                onClick={playClickSound}
                className="btn-primary btn-primary-hover group"
              >
                <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
                Download Resume
              </a>
            </Magnetic>
            <Magnetic range={50} strength={0.3}>
              <a href="#work" onClick={playClickSound} className="btn-ghost btn-ghost-hover group">
                <Eye size={16} className="transition-transform group-hover:scale-110" />
                View Projects
              </a>
            </Magnetic>
          </motion.div>

          {/* Social Links with Cursor magnetic effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 1.95 }}
            className="mt-9 flex items-center gap-3"
          >
            {socials.map(({ icon: Icon, label, href }) => (
              <Magnetic key={label} range={45} strength={0.35}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                  aria-label={label}
                  title={label}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-full glass transition-all duration-500 hover:scale-110 hover:rotate-6 hover:border-accent/60"
                  style={{ boxShadow: "0 0 0 rgba(139,92,246,0)" }}
                >
                  <Icon size={16} className="text-muted transition-colors group-hover:text-white" />
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ boxShadow: "0 0 24px rgba(139,92,246,0.7)" }}
                  />
                  <span className="pointer-events-none absolute -bottom-9 whitespace-nowrap rounded-md glass px-2 py-1 text-[10px] uppercase tracking-widest text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {label}
                  </span>
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COMPONENT — Portrait with 3D Tilt */}
        <div className="relative order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)", rotate: 2 }}
            animate={
              isLoaded
                ? { opacity: 1, scale: 1, filter: "blur(0px)", rotate: 0 }
                : { opacity: 0, scale: 0.85, filter: "blur(20px)", rotate: 2 }
            }
            transition={{ duration: 1.6, ease, delay: 0.35 }}
            style={{
              rotateX: rotX,
              rotateY: rotY,
              transformPerspective: 1200,
              scale: portraitScale,
            }}
            className="relative mx-auto aspect-[4/5.2] w-[72%] sm:w-[60%] md:w-[50%] lg:w-full max-w-[340px] lg:max-w-[420px]"
          >
            {/* outer floating rings */}
            <motion.div
              style={{ x: tX, y: tY }}
              className="pointer-events-none absolute -inset-6 -z-10"
            >
              <div className="absolute inset-0 rounded-[48px] border border-white/10" />
              <div className="absolute inset-4 rounded-[44px] border border-white/5" />
            </motion.div>

            {/* purple backdrop glow */}
            <motion.div style={{ x: tX, y: tY }} className="absolute inset-0 -z-10 blur-3xl">
              <div
                className="absolute inset-6 rounded-[80px] opacity-80"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.9), transparent 60%), radial-gradient(circle at 70% 80%, rgba(59,130,246,0.7), transparent 60%)",
                }}
              />
            </motion.div>

            {/* Frame with reflection sweep and float */}
            <div
              className="animate-floaty relative h-full w-full overflow-hidden rounded-[36px] glass-strong"
              style={{
                boxShadow:
                  "0 40px 100px -30px rgba(0,0,0,0.9), 0 0 80px -20px rgba(139,92,246,0.5)",
                background:
                  "linear-gradient(135deg, rgba(15, 12, 30, 0.5) 0%, rgba(7, 5, 15, 0.65) 100%)",
              }}
            >
              {/* rim edge light */}
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-[36px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.25), transparent 40%, transparent 60%, rgba(59,130,246,0.2))",
                  mixBlendMode: "screen",
                }}
              />

              {/* Ambient lighting overlay to integrate portrait with background */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(139,92,246,0.15), transparent 50%), radial-gradient(circle at 75% 75%, rgba(59,130,246,0.12), transparent 50%)",
                  mixBlendMode: "screen",
                }}
              />

              {/* Layer 1: Dark gradient base inside the frame */}
              <div
                className="absolute inset-0 -z-30"
                style={{
                  background: "linear-gradient(180deg, #0a0815 0%, #030206 100%)",
                }}
              />

              {/* Layer 2: Purple radial glow centered slightly behind head and shoulders */}
              <div
                className="absolute inset-0 -z-20"
                style={{
                  background:
                    "radial-gradient(circle at 45% 40%, rgba(139,92,246,0.45) 0%, rgba(139,92,246,0) 70%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Layer 3: Blue ambient glow near the lower-right area */}
              <div
                className="absolute inset-0 -z-15"
                style={{
                  background:
                    "radial-gradient(circle at 80% 75%, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 65%)",
                  filter: "blur(50px)",
                }}
              />

              {/* Layer 4: Soft floating particles behind the image for magical depth */}
              {isLoaded &&
                isInView &&
                Array.from({ length: 6 }).map((_, i) => (
                  <motion.span
                    key={`inner-particle-${i}`}
                    className="absolute h-[3px] w-[3px] rounded-full bg-white/40 -z-10"
                    style={{
                      left: `${((i * 23 + 15) % 80) + 10}%`,
                      top: `${((i * 31 + 20) % 60) + 15}%`,
                      boxShadow: "0 0 8px rgba(139,92,246,0.8)",
                    }}
                    animate={{ y: [0, -15, 0], opacity: [0.1, 0.8, 0.1] }}
                    transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}

              {/* Layer 5: Very subtle noise texture to give a cinematic paper/analog feel */}
              <div
                className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                }}
              />

              <img
                src={heroImg}
                alt="Portrait of Sufiyan Sanderwale, Software Developer"
                className="h-full w-full object-cover transition-transform duration-500"
                style={{
                  objectPosition: "center 8%",
                  transform: "scale(1.02) translateY(12px)",
                }}
                draggable={false}
              />

              {/* Reflection Sweep light sweep runs every 8s */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-20"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  repeatDelay: 6.4,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                }}
              />

              {/* bottom shadow gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Floating Info card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={
                isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }
              }
              transition={{ duration: 1, delay: 1.15, ease }}
              className="absolute -bottom-6 -left-4 z-30 w-[240px] rounded-2xl glass-strong p-4"
              style={{ boxShadow: "0 20px 60px -20px rgba(0,0,0,0.9)" }}
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-subtle">
                <MapPin size={12} className="text-accent" />
                Belagavi, Karnataka
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-semibold text-white">Open To Work</span>
              </div>
              <div className="mt-1 text-[11px] leading-relaxed text-muted">
                Immediate Joiner · Ready to Relocate
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - animates slowly and disappears after first scroll */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 2.3, duration: 1 }}
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-subtle md:flex z-20"
          >
            <span>Scroll to Explore</span>
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
              <motion.span
                className="h-1.5 w-1 rounded-full bg-white/70"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={12} />
            </motion.div>
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
}
