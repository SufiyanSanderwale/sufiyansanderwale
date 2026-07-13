import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  MotionValue,
  useInView,
} from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";

// Tech stack SVG logos
import cssLogo from "@/assets/tech/CSS3.svg";
import eclipseLogo from "@/assets/tech/Eclipse IDE.svg";
import figmaLogo from "@/assets/tech/Figma.svg";
import gitLogo from "@/assets/tech/Git.svg";
import githubLogo from "@/assets/tech/GitHub.svg";
import htmlLogo from "@/assets/tech/HTML5.svg";
import intellijLogo from "@/assets/tech/IntelliJ IDEA.svg";
import javaLogo from "@/assets/tech/Java.svg";
import javascriptLogo from "@/assets/tech/JavaScript.svg";
import mysqlLogo from "@/assets/tech/MySQL.svg";
import postgresqlLogo from "@/assets/tech/PostgresSQL.svg";
import reactLogo from "@/assets/tech/React.svg";
import springLogo from "@/assets/tech/Spring.svg";
import tailwindLogo from "@/assets/tech/Tailwind CSS.svg";
import typescriptLogo from "@/assets/tech/TypeScript.svg";
import vercelLogo from "@/assets/tech/Vercel.svg";
import vscodeLogo from "@/assets/tech/Visual Studio Code (VS Code).svg";
import chatgptLogo from "@/assets/tech/chatgpt.svg";
import copilotLogo from "@/assets/tech/copilot.svg";
import geminiLogo from "@/assets/tech/gemini.svg";
import { SectionLabel } from "./About";
import {
  Code2,
  Database,
  Layout,
  Server,
  Wrench,
  Brain,
  Sparkles,
  GitBranch,
  Cloud,
  Cpu,
  Zap,
  BookOpen,
  Award,
  Bot,
} from "lucide-react";

type Tech = {
  name: string;
  desc: string;
  projects?: string[];
};

const techItems = [
  { name: "Java", logo: javaLogo, desc: "Primary backend language — OOP, collections, JDBC." },
  {
    name: "Spring Boot",
    logo: springLogo,
    desc: "REST controllers, DI, JPA, and enterprise services.",
  },
  {
    name: "React",
    logo: reactLogo,
    desc: "Dynamic and responsive UI components with state hooks.",
  },
  {
    name: "TypeScript",
    logo: typescriptLogo,
    desc: "Type-safe development for solid scalable applications.",
  },
  {
    name: "JavaScript",
    logo: javascriptLogo,
    desc: "Modern interactive web applications and async patterns.",
  },
  {
    name: "HTML5",
    logo: htmlLogo,
    desc: "Semantic structure and accessible layouts for SEO optimization.",
  },
  {
    name: "CSS3",
    logo: cssLogo,
    desc: "Modern and fluid layouts with transitions and animations.",
  },
  {
    name: "Tailwind CSS",
    logo: tailwindLogo,
    desc: "Utility-first CSS styling at lightning-fast production speeds.",
  },
  {
    name: "MySQL",
    logo: mysqlLogo,
    desc: "Relational database schema design and complex SQL queries.",
  },
  {
    name: "PostgreSQL",
    logo: postgresqlLogo,
    desc: "Advanced SQL modeling, transactions, and performance indexing.",
  },
  {
    name: "Git",
    logo: gitLogo,
    desc: "Distributed version control and branch management workflows.",
  },
  {
    name: "GitHub",
    logo: githubLogo,
    desc: "Social coding, repository hosting, and automated pipelines.",
  },
  {
    name: "VS Code",
    logo: vscodeLogo,
    desc: "Primary code editor for frontend development and web tooling.",
  },
  {
    name: "IntelliJ IDEA",
    logo: intellijLogo,
    desc: "Powerhouse IDE optimized for professional enterprise Java.",
  },
  {
    name: "Eclipse IDE",
    logo: eclipseLogo,
    desc: "Classic robust Java workspace for legacy and core development.",
  },
  {
    name: "Vercel",
    logo: vercelLogo,
    desc: "Frictionless edge deployment for Next.js and frontend builds.",
  },
  {
    name: "ChatGPT",
    logo: chatgptLogo,
    desc: "AI pair programming for brainstorming and documentation writing.",
  },
  {
    name: "Google Gemini",
    logo: geminiLogo,
    desc: "Advanced language model integrations and AI-powered workflows.",
  },
  {
    name: "GitHub Copilot",
    logo: copilotLogo,
    desc: "Real-time autocomplete and generative syntax suggestions.",
  },
  {
    name: "Figma",
    logo: figmaLogo,
    desc: "Collaborative interface prototyping, layouts, and vector assets.",
  },
];

const categories: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  kind: "glass" | "float" | "timeline" | "db" | "tool" | "chip";
  items: Tech[];
}[] = [
  {
    icon: Code2,
    title: "Programming Languages",
    kind: "glass",
    items: [
      {
        name: "Java",
        desc: "Primary backend language — OOP, collections, JDBC.",
        projects: ["Medicare", "Salon Management", "WELTH"],
      },
      {
        name: "JavaScript",
        desc: "Interactivity across every web project I ship.",
        projects: ["TM Tech Solutions", "WELTH", "Medicare"],
      },
      {
        name: "SQL",
        desc: "Relational modeling, joins, and query optimization.",
        projects: ["Medicare", "Salon Management"],
      },
    ],
  },
  {
    icon: Layout,
    title: "Frontend",
    kind: "float",
    items: [
      { name: "HTML5", desc: "Semantic, accessible markup." },
      { name: "CSS3", desc: "Modern layout — flex, grid, responsive." },
      { name: "JavaScript", desc: "DOM, events, async patterns." },
      {
        name: "React (Basic)",
        desc: "Components, hooks, state.",
        projects: ["TM Tech Solutions", "Salon Management"],
      },
      {
        name: "Next.js",
        desc: "Production routing & SEO.",
        projects: ["TM Tech Solutions", "WELTH"],
      },
      {
        name: "Tailwind CSS",
        desc: "Utility-first styling at speed.",
        projects: ["TM Tech Solutions", "WELTH"],
      },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    kind: "timeline",
    items: [
      { name: "Java", desc: "Core services & business logic." },
      {
        name: "Spring Boot (Basic)",
        desc: "REST controllers, DI, JPA.",
        projects: ["Salon Management"],
      },
      { name: "REST APIs", desc: "Designing clean HTTP contracts." },
      { name: "Node.js (Basic)", desc: "Lightweight server tasks." },
    ],
  },
  {
    icon: Database,
    title: "Database",
    kind: "db",
    items: [
      { name: "MySQL", desc: "Primary RDBMS on internship work.", projects: ["Medicare", "WELTH"] },
      { name: "PostgreSQL", desc: "Used on the Salon platform.", projects: ["Salon Management"] },
      { name: "JDBC", desc: "Java ↔ database connectivity." },
    ],
  },
  {
    icon: Wrench,
    title: "Tools",
    kind: "tool",
    items: [
      { name: "Git", desc: "Version control fundamentals." },
      { name: "GitHub", desc: "Repos, PRs, collaboration." },
      { name: "VS Code", desc: "Daily driver for web work." },
      { name: "IntelliJ IDEA", desc: "Preferred Java IDE." },
      { name: "Eclipse IDE", desc: "Classic Java workflows." },
      { name: "Vercel", desc: "Production hosting for Next.js." },
      { name: "GitHub Copilot", desc: "AI-assisted pair programming." },
    ],
  },
  {
    icon: Brain,
    title: "Software Concepts",
    kind: "chip",
    items: [
      { name: "Object Oriented Programming", desc: "Encapsulation, inheritance, polymorphism." },
      { name: "CRUD", desc: "End-to-end data operations." },
      { name: "DBMS", desc: "Schema, normalization, transactions." },
      { name: "SDLC", desc: "Full software lifecycle." },
      { name: "Problem Solving", desc: "Breaking problems into shippable steps." },
      { name: "Responsive Design", desc: "Mobile-first, fluid layouts." },
      { name: "Hosting", desc: "Configuring domains & environments." },
      { name: "Deployment", desc: "CI/CD to Vercel & similar." },
      { name: "REST API", desc: "Stateless, resource-driven design." },
    ],
  },
];

const aiKnowledge = [
  { icon: Brain, title: "AI Fundamentals" },
  { icon: Sparkles, title: "Generative AI Fundamentals" },
  { icon: Bot, title: "Prompt Engineering" },
  { icon: Bot, title: "ChatGPT" },
  { icon: Sparkles, title: "Google Gemini" },
  { icon: GitBranch, title: "GitHub Copilot" },
  { icon: Zap, title: "AI-Assisted Development" },
  { icon: Cpu, title: "AI Productivity" },
  { icon: Code2, title: "Basic AI Integration" },
  { icon: Sparkles, title: "Modern AI Workflows" },
];

const learningNow = [
  "Advanced Java",
  "Spring Boot",
  "Modern React",
  "Next.js",
  "AI-Powered Applications",
  "Cloud Deployment",
  "REST API Best Practices",
  "Containerization Basics",
];

const certBadges = ["IBM AI", "Google Cloud", "Simplilearn", "upGrad", "Pentagon Space", "CODTECH"];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-40">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl animate-blob-a"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5), transparent 60%)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl animate-blob-b"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5), transparent 60%)" }}
        />
      </div>

      <div className="container-x relative">
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <SectionLabel
              index="03"
              label="Tech Stack"
              className="justify-center lg:justify-start"
            />

            <motion.h2
              initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 md:mt-8 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
              style={{ fontWeight: 900 }}
            >
              TECH <span className="text-gradient-accent">STACK</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 md:mt-6 max-w-md lg:max-w-xl text-base leading-relaxed text-muted lg:text-lg"
            >
              I enjoy building modern software with <span className="text-white">Java</span>,
              contemporary <span className="text-white">web technologies</span>, and{" "}
              <span className="text-white">AI-assisted development</span>. My focus is shipping
              reliable, real-world products — and I keep learning new tools as the stack evolves.
            </motion.p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <TechShowcase />
          </div>
        </div>

        {/* Category grid */}
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

        {/* AI Section */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[10px] uppercase tracking-[0.28em] text-accent">
              Modern Workflow
            </div>
            <h3 className="font-display mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              AI & <span className="text-gradient-accent">Modern Development</span>
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Passionate about integrating Artificial Intelligence into modern software development
              workflows. Familiar with Generative AI concepts, Prompt Engineering, AI-powered
              productivity tools, and AI-assisted application development.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {aiKnowledge.map((k, i) => {
              const Icon = k.icon;
              return (
                <motion.div
                  key={k.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl glass p-4"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.15), transparent 50%, rgba(59,130,246,0.15))",
                    }}
                  />
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.2))",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  <div className="font-display mt-3 text-sm font-semibold leading-snug">
                    {k.title}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Currently Learning */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[32px] glass-strong p-8 md:p-12"
          >
            <div
              className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%)",
              }}
            />
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.25))",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <BookOpen size={16} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-subtle">
                Currently Learning
              </div>
            </div>
            <h3 className="font-display mt-5 max-w-2xl text-2xl font-semibold leading-tight md:text-4xl">
              Sharpening the stack,{" "}
              <span className="text-gradient-accent">one topic at a time</span>.
            </h3>

            <div className="relative mt-10">
              <div className="absolute left-0 right-0 top-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {learningNow.map((t, i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div
                      className="mx-auto h-2 w-2 rounded-full animate-pulse-glow"
                      style={{
                        background: "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                        boxShadow: "0 0 12px rgba(139,92,246,0.8)",
                      }}
                    />
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-xs text-muted">
                      {t}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certification badges */}
        <div className="mt-16">
          <div className="text-[10px] uppercase tracking-[0.28em] text-subtle">Certified by</div>
          <div className="mt-5 flex flex-wrap gap-3">
            {certBadges.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="group relative flex items-center gap-2 rounded-full glass px-4 py-2 text-xs transition-all"
              >
                <Award size={12} className="text-accent" />
                <span>{b}</span>
                <div
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 30px rgba(139,92,246,0.5)" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Category Card ---------- */

function CategoryCard({
  category,
  index,
}: {
  category: (typeof categories)[number];
  index: number;
}) {
  const Icon = category.icon;
  const [active, setActive] = useState<Tech | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[28px] glass p-7"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.35), transparent 40%, transparent 60%, rgba(59,130,246,0.3))",
          padding: 1,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor" as React.CSSProperties["WebkitMaskComposite"],
          maskComposite: "exclude" as React.CSSProperties["maskComposite"],
        }}
      />
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.2))",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Icon size={18} />
        </div>
        <h3 className="font-display text-lg font-semibold">{category.title}</h3>
      </div>

      {/* Layout variants */}
      {category.kind === "timeline" ? (
        <div className="relative mt-6 pl-5">
          <div className="absolute left-1 top-1 bottom-1 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent" />
          <div className="space-y-3">
            {category.items.map((t) => (
              <TechItem key={t.name} tech={t} onActive={setActive} variant="row" />
            ))}
          </div>
        </div>
      ) : category.kind === "chip" ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {category.items.map((t) => (
            <TechItem key={t.name} tech={t} onActive={setActive} variant="chip" />
          ))}
        </div>
      ) : category.kind === "db" ? (
        <div className="mt-5 space-y-2">
          {category.items.map((t) => (
            <TechItem key={t.name} tech={t} onActive={setActive} variant="db" />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap gap-2">
          {category.items.map((t) => (
            <TechItem key={t.name} tech={t} onActive={setActive} variant="pill" />
          ))}
        </div>
      )}

      {/* Popup */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-display text-sm font-semibold text-white">{active.name}</div>
              {active.projects && (
                <div className="text-[10px] uppercase tracking-[0.24em] text-accent">Used In</div>
              )}
            </div>
            <div className="mt-1 text-xs leading-relaxed text-muted">{active.desc}</div>
            {active.projects && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {active.projects.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-muted"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TechItem({
  tech,
  onActive,
  variant,
}: {
  tech: Tech;
  onActive: (t: Tech | null) => void;
  variant: "pill" | "row" | "chip" | "db";
}) {
  const base =
    "cursor-pointer border border-white/10 bg-white/[0.03] text-muted transition-all duration-300 hover:border-accent/50 hover:text-white hover:bg-white/[0.06]";

  if (variant === "row") {
    return (
      <div
        onMouseEnter={() => onActive(tech)}
        onMouseLeave={() => onActive(null)}
        className="relative"
      >
        <div className="absolute -left-[17px] top-1.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
        <div className={`rounded-xl px-3 py-2 text-sm ${base}`}>{tech.name}</div>
      </div>
    );
  }

  if (variant === "db") {
    return (
      <div
        onMouseEnter={() => onActive(tech)}
        onMouseLeave={() => onActive(null)}
        className={`group/db relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm ${base}`}
      >
        <span className="flex items-center gap-2">
          <Database size={13} className="text-accent" />
          {tech.name}
        </span>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full bg-accent-2 opacity-40 transition-opacity"
              style={{ animation: `pulseGlow 1.4s ${i * 0.2}s ease-in-out infinite` }}
            />
          ))}
        </span>
      </div>
    );
  }

  if (variant === "chip") {
    return (
      <button
        onMouseEnter={() => onActive(tech)}
        onMouseLeave={() => onActive(null)}
        className={`rounded-full px-3 py-1 text-xs ${base} hover:scale-105`}
      >
        {tech.name}
      </button>
    );
  }

  return (
    <button
      onMouseEnter={() => onActive(tech)}
      onMouseLeave={() => onActive(null)}
      className={`rounded-full px-3 py-1.5 text-xs ${base} hover:-translate-y-0.5`}
    >
      {tech.name}
    </button>
  );
}

/* ---------- Interactive Vertical Tech Showcase ---------- */

export function TechShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });
  const [dimensions, setDimensions] = useState({
    containerHeight: 450,
    itemHeight: 106,
    containerWidth: 250,
  });
  const [activeTech, setActiveTech] = useState(techItems[0]);
  const activeTechRef = useRef(techItems[0]);
  const y = useMotionValue(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth >= 1024) {
        // lg / desktop
        setDimensions({ containerHeight: 450, itemHeight: 106, containerWidth: 300 });
      } else if (window.innerWidth >= 768) {
        // md / tablet
        setDimensions({ containerHeight: 380, itemHeight: 84, containerWidth: 240 });
      } else {
        // sm / mobile
        setDimensions({ containerHeight: 280, itemHeight: 64, containerWidth: 180 });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useAnimationFrame((time, delta) => {
    if (!isInView) return;

    // Constant smooth speed scrolling
    const speed = 35; // px per sec
    const currentY = y.get();
    const totalHeight = techItems.length * dimensions.itemHeight;

    // delta cap to prevent giant jumps when tab is inactive
    const safeDelta = Math.min(delta, 100);
    let nextY = currentY - speed * (safeDelta / 1000);
    if (nextY <= -totalHeight) {
      nextY += totalHeight;
    }
    y.set(nextY);

    // Calculate active item based on the center of the viewport (wrapped)
    const containerCenter = dimensions.containerHeight / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < techItems.length; i++) {
      const rawY = nextY + i * dimensions.itemHeight;
      const wrappedY =
        ((((rawY + dimensions.itemHeight) % totalHeight) + totalHeight) % totalHeight) -
        dimensions.itemHeight;
      const cardCenterY = wrappedY + dimensions.itemHeight / 2;
      const distance = Math.abs(cardCenterY - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    const activeItem = techItems[closestIndex];
    if (activeItem && activeItem.name !== activeTechRef.current.name) {
      activeTechRef.current = activeItem;
      setActiveTech(activeItem);
    }
  });

  const cardSize =
    dimensions.containerHeight === 450 ? 90 : dimensions.containerHeight === 380 ? 70 : 52;

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-16 w-full select-none"
    >
      {/* Active Tech Name and Details display - Apple Vision Pro style HUD */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-[200px] h-[70px] md:h-auto justify-center md:justify-start pb-2 md:pb-0">
        <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-medium mb-1.5 opacity-80">
          Selected Tech
        </div>
        <div className="relative h-12 w-full overflow-hidden flex items-center justify-center md:justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTech.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute font-display text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3"
            >
              <span className="text-gradient-accent uppercase">{activeTech.name}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="hidden md:block mt-2 text-xs text-muted max-w-[200px] leading-relaxed transition-opacity duration-300">
          {activeTech.desc}
        </p>
      </div>

      {/* Scrolling container */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          height: dimensions.containerHeight,
          width: dimensions.containerWidth,
          maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      >
        {/* Infinite stack of cards */}
        <div className="absolute top-0 left-0 right-0 bottom-0">
          {techItems.map((tech, i) => {
            return (
              <ScrollCard
                key={i}
                tech={tech}
                index={i}
                y={y}
                dimensions={dimensions}
                cardSize={cardSize}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface ScrollCardProps {
  tech: (typeof techItems)[number];
  index: number;
  y: MotionValue<number>;
  dimensions: { containerHeight: number; itemHeight: number; containerWidth: number };
  cardSize: number;
}

const ScrollCard = memo(({ tech, index, y, dimensions, cardSize }: ScrollCardProps) => {
  const cardY = useTransform(y, (latestY) => {
    const rawY = latestY + index * dimensions.itemHeight;
    const totalHeight = techItems.length * dimensions.itemHeight;
    return (
      ((((rawY + dimensions.itemHeight) % totalHeight) + totalHeight) % totalHeight) -
      dimensions.itemHeight
    );
  });

  const cardCenterY = useTransform(cardY, (cy) => {
    return cy + dimensions.itemHeight / 2;
  });

  const distanceFromCenter = useTransform(cardCenterY, (latestCenter) => {
    return latestCenter - dimensions.containerHeight / 2;
  });

  // Scale: 1.15 at 0 (center), drops down to 0.75 outside the center
  const scale = useTransform(
    distanceFromCenter,
    [-dimensions.containerHeight / 2, 0, dimensions.containerHeight / 2],
    [0.75, 1.15, 0.75],
  );

  // Opacity: fully opaque in center, fades out towards top and bottom
  const opacity = useTransform(
    distanceFromCenter,
    [-dimensions.containerHeight * 0.6, 0, dimensions.containerHeight * 0.6],
    [0.2, 1, 0.2],
  );

  // x displacement: Curves to the right (positive x) at top and bottom, curves to the left (negative x) at center
  // This makes the center card bow out to the left towards the HUD/text, and top/bottom cards recede to the right!
  // Let's make it look like a smooth crescent moon / curved arc!
  const x = useTransform(
    distanceFromCenter,
    [
      -dimensions.containerHeight * 0.6,
      -dimensions.containerHeight * 0.3,
      0,
      dimensions.containerHeight * 0.3,
      dimensions.containerHeight * 0.6,
    ],
    [80, 20, -50, 20, 80],
  );

  // Z-axis tilt to align with the tangent of the curve
  const rotateZ = useTransform(
    distanceFromCenter,
    [-dimensions.containerHeight / 2, 0, dimensions.containerHeight / 2],
    [-18, 0, 18],
  );

  // Y-axis 3D rotation to wrap around a vertical cylinder
  const rotateY = useTransform(
    distanceFromCenter,
    [-dimensions.containerHeight / 2, 0, dimensions.containerHeight / 2],
    [28, 0, -28],
  );

  // Purple glow at center
  const glowOpacity = useTransform(
    distanceFromCenter,
    [-dimensions.containerHeight * 0.2, 0, dimensions.containerHeight * 0.2],
    [0, 0.8, 0],
  );
  const boxShadow = useTransform(glowOpacity, (o) => `0 0 32px rgba(139, 92, 246, ${o * 0.75})`);

  // Light up brightness/contrast when active (maintain perfect sharpness, no blur)
  const brightness = useTransform(
    distanceFromCenter,
    [-dimensions.containerHeight * 0.4, 0, dimensions.containerHeight * 0.4],
    [75, 115, 75],
  );
  const filter = useTransform(brightness, (br) => `brightness(${br}%)`);

  return (
    <motion.div
      style={{
        y: cardY,
        x,
        rotateZ,
        rotateY,
        transformPerspective: 1000,
        scale,
        opacity,
        filter,
        WebkitFilter: filter,
        boxShadow,
        width: cardSize,
        height: cardSize,
      }}
      className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-2xl border border-white/[0.08] bg-black/45 backdrop-blur-lg cursor-pointer hover:border-accent/40 hover:bg-black/60 transition-colors duration-300 group z-10"
      whileHover={{ scale: 1.25, zIndex: 50, transition: { duration: 0.2 } }}
    >
      {/* Soft inner radial gradient on active/hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-[#8b5cf6]/10 to-[#3b82f6]/10 pointer-events-none" />

      {/* SVG Image centered */}
      <img
        src={tech.logo}
        alt={tech.name}
        aria-label={tech.name}
        className="w-[50%] h-[50%] object-contain group-hover:brightness-110 transition-transform duration-300 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
});

ScrollCard.displayName = "ScrollCard";
