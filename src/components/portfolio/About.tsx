import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  User,
  Code2,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  FolderGit2,
  Zap,
  Brain,
  Users,
  Rocket,
  Flame,
  BookOpen,
  Quote,
} from "lucide-react";

export function SectionLabel({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-4 ${className}`}
    >
      <span className="font-display text-xs text-accent">{index}</span>
      <span className="h-px w-14 bg-gradient-to-r from-accent to-transparent" />
      <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
        {label}
      </span>
    </motion.div>
  );
}

const introLines = [
  "I'm Sufiyan Sanderwale — a Computer Science graduate from Maratha Mandal Engineering College, Belagavi,",
  "driven by a genuine love for software development, clean architecture, and problem-solving.",
  "Java is my craft — I enjoy building robust, object-oriented systems and full-stack web applications",
  "with SQL, HTML, CSS and JavaScript. I'm also deeply curious about Artificial Intelligence",
  "and how it will reshape the software we build tomorrow.",
  "Currently sharpening my skills as a Software Developer Intern at Pentagon Space, Bengaluru,",
  "I approach every problem with a learner's mindset — writing thoughtful code, refining details,",
  "and building things that actually solve real problems for real people.",
];

const profileRows = [
  { icon: User, label: "Name", value: "Sufiyan Sanderwale" },
  { icon: Code2, label: "Role", value: "Software Developer · Java · AI Enthusiast" },
  { icon: MapPin, label: "Location", value: "Belagavi, Karnataka" },
  {
    icon: Sparkles,
    label: "Availability",
    value: "Open to work · Immediate joiner · Ready to relocate",
  },
];

const metrics = [
  { icon: FolderGit2, value: 3, suffix: "+", label: "Projects" },
  { icon: Briefcase, value: 1, suffix: "", label: "Internship" },
  { icon: Award, value: 5, suffix: "+", label: "Certifications" },
  { icon: GraduationCap, value: 0, suffix: "", label: "B.E. CSE", isText: true, text: "B.E." },
];

const techChips = [
  "Java",
  "SQL",
  "Spring Boot",
  "HTML",
  "CSS",
  "JavaScript",
  "MySQL",
  "OOP",
  "Git",
];

const strengths = [
  { icon: Zap, label: "Quick Learner" },
  { icon: Brain, label: "Problem Solver" },
  { icon: Users, label: "Team Player" },
  { icon: Rocket, label: "Adaptable" },
  { icon: Flame, label: "Self Motivated" },
  { icon: BookOpen, label: "Continuous Learner" },
];

const journey = ["School", "PUC", "Engineering", "Internship", "Open to Work", "Future SDE"];

const quote =
  "I enjoy building software that solves real-world problems through clean code, thoughtful design, and continuous learning.";

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-40">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-30 blur-3xl animate-blob-a"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 60%)" }}
        />
        <div
          className="absolute right-10 bottom-20 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl animate-blob-b"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 60%)" }}
        />
      </div>

      <div className="container-x relative">
        <SectionLabel index="01" label="About" />

        {/* Title */}
        <div className="mt-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="text-white">ABOUT </span>
            <span className="text-gradient-accent">ME</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 text-sm uppercase tracking-[0.4em] text-subtle"
          >
            The story behind the code
          </motion.p>
        </div>

        {/* Intro + Profile card */}
        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {introLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-base leading-relaxed text-muted md:text-lg"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <ProfileCard />
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} {...m} delay={i * 0.1} />
          ))}
        </div>

        {/* Strengths */}
        <div className="mt-32">
          <TimelineHeading eyebrow="Strengths" title="What I bring to a team." />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {strengths.map((s, i) => (
              <StrengthCard key={s.label} icon={s.icon} label={s.label} delay={i * 0.08} />
            ))}
          </div>
        </div>

        {/* Journey */}
        <div className="mt-32">
          <TimelineHeading eyebrow="Journey" title="From classroom to production." />
          <JourneyTrack />
        </div>

        {/* Quote */}
        <QuoteBlock />
      </div>
    </section>
  );
}

/* ---------- Profile Card ---------- */
function ProfileCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ry.set(x * 10);
    rx.set(-y * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong relative overflow-hidden rounded-[32px] p-8 md:p-10"
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-60"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.25), transparent 40%, rgba(59,130,246,0.2))",
          maskImage: "linear-gradient(black, transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-[11px] uppercase tracking-widest text-muted">Available</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-subtle">Profile</span>
        </div>

        <div className="mt-8 space-y-5">
          {profileRows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-all hover:border-accent/30 hover:bg-white/[0.03] hover:shadow-glow-purple"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.15))",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <r.icon size={16} className="text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-subtle">{r.label}</div>
                <div className="mt-1 text-sm font-medium text-white">{r.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Metric Card with counter ---------- */
function MetricCard({
  icon: Icon,
  value,
  suffix,
  label,
  isText,
  text,
  delay,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  isText?: boolean;
  text?: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || isText) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, isText]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass group relative overflow-hidden rounded-3xl p-6 transition-shadow hover:shadow-glow-purple"
    >
      <div className="flex items-center justify-between">
        <Icon size={18} className="text-accent" />
        <span className="text-[10px] uppercase tracking-widest text-subtle">{label}</span>
      </div>
      <div className="mt-6 font-display text-4xl font-black tracking-tight md:text-5xl">
        {isText ? (
          <span className="text-gradient-accent">{text}</span>
        ) : (
          <span className="text-gradient-accent">
            {n}
            {suffix}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ---------- Timeline heading + line ---------- */
function TimelineHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
        {eyebrow}
      </span>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display mt-3 text-3xl font-bold tracking-tight md:text-5xl"
      >
        {title}
      </motion.h3>
    </div>
  );
}

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-4 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
    >
      <div className="absolute inset-0 bg-white/5" />
      <motion.div
        initial={{ height: "0%" }}
        animate={inView ? { height: "100%" } : {}}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 w-full"
        style={{ background: "linear-gradient(180deg, #8b5cf6, #3b82f6, transparent)" }}
      />
    </div>
  );
}

function TimelinePoint() {
  return (
    <div className="absolute left-4 top-8 -translate-x-1/2 md:left-1/2">
      <span className="relative flex h-4 w-4">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: "rgba(139,92,246,0.6)" }}
        />
        <span
          className="relative inline-flex h-4 w-4 rounded-full"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
            boxShadow: "0 0 20px rgba(139,92,246,0.8)",
          }}
        />
      </span>
    </div>
  );
}

/* ---------- Experience ---------- */
function ExperienceCard() {
  return (
    <div className="relative pl-12 md:pl-0">
      <TimelinePoint />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        className="glass-strong ml-0 rounded-[28px] p-7 md:ml-[calc(50%+2.5rem)] md:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h4 className="font-display text-xl font-semibold md:text-2xl">
              Software Developer Intern
            </h4>
            <p className="mt-1 text-sm text-muted">Pentagon Space Pvt. Ltd. · Bengaluru</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-accent">
            Jan 2026 — Present
          </span>
        </div>

        <ul className="mt-5 grid gap-2 text-sm text-muted md:grid-cols-2">
          {[
            "Professional training in Java & SQL",
            "Modern web development stack",
            "Object-Oriented Programming in practice",
            "Debugging & problem-solving discipline",
            "Building hands-on production projects",
            "Applying clean-code fundamentals",
          ].map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {techChips.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/80 transition hover:border-accent/40 hover:bg-white/[0.08] hover:text-white"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Education ---------- */
function EducationCard({
  degree,
  org,
  period,
  score,
  side,
  index,
}: {
  degree: string;
  org: string;
  period: string;
  score: string;
  side: "left" | "right";
  index: number;
}) {
  const isLeft = side === "left";
  return (
    <div className="relative pl-12 md:pl-0">
      <TimelinePoint />
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        className={`glass rounded-[28px] p-6 transition-shadow hover:shadow-glow-purple md:w-[calc(50%-2.5rem)] md:p-7 ${
          isLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-lg font-semibold leading-tight md:text-xl">{degree}</h4>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-accent">
            {score}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">{org}</p>
        <div className="mt-3 text-[11px] uppercase tracking-widest text-subtle">{period}</div>
      </motion.div>
    </div>
  );
}

/* ---------- Strengths ---------- */
function StrengthCard({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all hover:border-accent/40 hover:shadow-glow-purple"
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.15))",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Icon size={18} className="text-accent" />
      </div>
      <span className="font-display text-sm font-medium md:text-base">{label}</span>
    </motion.div>
  );
}

/* ---------- Journey ---------- */
function JourneyTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="mt-12 overflow-x-auto pb-4">
      <div className="relative flex min-w-max items-center gap-6 md:gap-10">
        {/* line */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/5" />
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-1/2 h-px -translate-y-1/2"
          style={{ background: "linear-gradient(90deg, #8b5cf6, #3b82f6, transparent)" }}
        />
        {journey.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                boxShadow: "0 0 16px rgba(139,92,246,0.7)",
              }}
            />
            <span className="glass whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium text-white md:text-sm">
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Quote ---------- */
function QuoteBlock() {
  const words = quote.split(" ");
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong relative mt-32 overflow-hidden rounded-[36px] p-10 text-center md:p-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px 300px at 50% 0%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(500px 300px at 50% 100%, rgba(59,130,246,0.2), transparent 60%)",
        }}
      />
      <Quote size={72} className="mx-auto text-accent/40" strokeWidth={1} />
      <p className="relative mx-auto mt-6 max-w-4xl font-display text-2xl font-semibold leading-snug tracking-tight md:text-4xl lg:text-5xl">
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            <span className={i > 3 && i < 7 ? "text-gradient-accent" : ""}>{w}</span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </motion.span>
        ))}
      </p>
      <div className="relative mt-8 text-[11px] uppercase tracking-[0.4em] text-subtle">
        — Sufiyan Sanderwale
      </div>
    </motion.div>
  );
}
