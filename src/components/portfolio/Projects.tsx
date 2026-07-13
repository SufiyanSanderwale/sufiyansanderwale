import { useState, useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "./About";
import { playClickSound } from "@/lib/sound";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Sparkles,
  Activity,
  Cpu,
  Search,
  Zap,
  Globe,
  Lock,
  Calendar,
  Shield,
} from "lucide-react";

import tmtechHome from "@/assets/projects/tmtech-home.png";
import tmtechServices from "@/assets/projects/tmtech-services.png";
import tmtechAbout from "@/assets/projects/tmtech-about.png";
import welthHome from "@/assets/projects/welth-home.png";
import welthDash from "@/assets/projects/welth-dashboard.png";
import welthAdd from "@/assets/projects/welth-add.png";
import salonDash from "@/assets/projects/salon-dashboard.png";
import salonSvc from "@/assets/projects/salon-services.png";
import salonStaff from "@/assets/projects/salon-staff.png";
import medicareHome from "@/assets/projects/medicare-home.png";
import medicareDoc from "@/assets/projects/medicare-doc-Mngnt.png";
import medicareBook from "@/assets/projects/medicare-book-aptt.png";

// Types
type FeatureCardType = {
  title: string;
  description: string;
  icon:
    "Sparkles" | "Activity" | "Cpu" | "Search" | "Zap" | "Globe" | "Lock" | "Calendar" | "Shield";
};

type MetricType = {
  label: string;
  value: string;
};

type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  featuresHighlight: FeatureCardType[];
  metrics: MetricType[];
  timeline: {
    planning: string;
    development: string;
    testing: string;
    deployment: string;
  };
  images: string[];
  mockupType: "macbook" | "browser";
  links: {
    github: string;
    demo: string | null;
  };
};

const projects: Project[] = [
  {
    id: "welth",
    title: "WELTH",
    subtitle: "AI Powered Personal Finance Platform",
    category: "Featured Project",
    description:
      "WELTH is an AI-powered personal finance platform designed to simplify expense tracking, budgeting, financial insights, and investment planning through intelligent automation.",
    longDescription:
      "WELTH integrates state-of-the-art AI with modern financial tracking tools. Users can scan physical receipts, consult a financial advisory chatbot, and visualize budgeting forecasts through dynamic charts.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Google Gemini AI",
    ],
    features: [
      "AI Receipt Scanner",
      "Expense Tracking",
      "Budget Planner",
      "AI Finance Chatbot",
      "Investment Suggestions",
      "Analytics Dashboard",
      "Responsive Design",
    ],
    featuresHighlight: [
      {
        title: "AI Receipt Scanner",
        description: "Real-time parsing & OCR for expense categorization using Gemini API.",
        icon: "Sparkles",
      },
      {
        title: "Analytics Dashboard",
        description: "Interactive financial charting and predictive models.",
        icon: "Activity",
      },
      {
        title: "AI Finance Chatbot",
        description: "24/7 AI chatbot offering contextual investment and saving ideas.",
        icon: "Cpu",
      },
    ],
    metrics: [
      { label: "OCR Accuracy", value: "99.2%" },
      { label: "Insight Speed", value: "<1.2s" },
      { label: "UI Design", value: "5-Star" },
    ],
    timeline: {
      planning: "Jan 2025",
      development: "Feb 2025",
      testing: "Mar 2025",
      deployment: "Mar 2025",
    },
    images: [welthHome, welthDash, welthAdd],
    mockupType: "macbook",
    links: {
      github: "https://github.com/SufiyanSanderwale/Welth",
      demo: "https://welth-flax.vercel.app/",
    },
  },
  {
    id: "tmtech",
    title: "TM Tech Solutions",
    subtitle: "Corporate Website",
    category: "Live Production Project",
    description:
      "Designed and developed a production-ready corporate website for TM Tech Solutions with a focus on responsive design, SEO optimization, structured data, and business-focused user experience.",
    longDescription:
      "A high-performance corporate platform crafted for industrial engineering services, integrating semantic HTML, metadata, schema tags, and a localized contact pipeline.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GitHub", "Vercel"],
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Metadata Stack",
      "Structured Data",
      "Performance Tuning",
      "Hosting & CDN",
      "Deployment Pipe",
      "Custom Domain",
    ],
    featuresHighlight: [
      {
        title: "SEO Optimization",
        description: "Top ranking metadata schema, sitemaps, and rich results.",
        icon: "Search",
      },
      {
        title: "Edge Performance",
        description: "Highly optimized static builds yielding near-perfect Core Web Vitals.",
        icon: "Zap",
      },
      {
        title: "Live Production",
        description: "Shipped with custom domain and Vercel continuous deployment.",
        icon: "Globe",
      },
    ],
    metrics: [
      { label: "Core Web Vitals", value: "100/100" },
      { label: "SEO Score", value: "100/100" },
      { label: "Load Time", value: "0.4s" },
    ],
    timeline: {
      planning: "Jan 2026",
      development: "Feb 2026",
      testing: "Mar 2026",
      deployment: "Mar 2026",
    },
    images: [tmtechHome, tmtechServices, tmtechAbout],
    mockupType: "browser",
    links: {
      github: "https://github.com/SufiyanSanderwale/tm-tech-solutions",
      demo: "https://tmtechsolutions.in",
    },
  },
  {
    id: "salon",
    title: "Salon Management Platform",
    subtitle: "Full Stack Management System",
    category: "Full Stack SaaS",
    description:
      "A modern salon management platform designed to streamline appointments, customer management, billing, inventory, and staff administration.",
    longDescription:
      "A robust SaaS ecosystem for salon administrators and personnel. Integrates secure JSON Web Token authentication, transactional databases, and fine-grained role-based operations.",
    techStack: ["Spring Boot", "React", "PostgreSQL", "JWT", "Java", "Tailwind CSS"],
    features: [
      "Role Based Authentication",
      "Appointments Scheduling",
      "Billing & Invoicing",
      "Inventory Logs",
      "Staff Management",
      "Admin Dashboard",
      "REST APIs Layer",
      "Secure JWT Login",
    ],
    featuresHighlight: [
      {
        title: "Role Based Auth",
        description: "Fine-grained permissions for administrators, staff, and clients.",
        icon: "Lock",
      },
      {
        title: "Appointments Desk",
        description: "Collision-free appointments calendar with automatic timeslot allocation.",
        icon: "Calendar",
      },
      {
        title: "Secure APIs",
        description: "Robust Spring Boot REST architecture with secure JWT filters.",
        icon: "Shield",
      },
    ],
    metrics: [
      { label: "Role Levels", value: "3 Tiers" },
      { label: "API Latency", value: "<80ms" },
      { label: "Security Layer", value: "JWT" },
    ],
    timeline: {
      planning: "Mar 2026",
      development: "Apr 2026",
      testing: "May 2026",
      deployment: "Jun 2026",
    },
    images: [salonDash, salonSvc, salonStaff],
    mockupType: "browser",
    links: {
      github: "https://github.com/Umair-dev0/salonManagement",
      demo: null,
    },
  },
  {
    id: "medicare",
    title: "Medicare",
    subtitle: "Hospital Management System",
    category: "Full Stack Java System",
    description:
      "A comprehensive Hospital Management System developed to organize patient registries, doctor assignments, clinical operations, and responsive appointments administration.",
    longDescription:
      "Built with a high-performance Java core and MySQL database integration via JDBC, Medicare implements role-based access, full CRUD capabilities, and robust SQL querying to maximize medical center efficiency.",
    techStack: ["Java", "MySQL", "JDBC", "HTML5", "CSS3", "JavaScript"],
    features: [
      "Patient Directory",
      "Doctor Directory",
      "Appointment Booking",
      "CRUD Operations",
      "Database Integration",
      "Operational Efficiency",
      "Responsive Interface",
      "Java Business Logic",
    ],
    featuresHighlight: [
      {
        title: "Appointment Booking",
        description: "Seamless doctor schedule matching with database appointment allocation.",
        icon: "Calendar",
      },
      {
        title: "Robust CRUD Logic",
        description: "Secure data transactional pipelines utilizing optimized MySQL and JDBC.",
        icon: "Shield",
      },
      {
        title: "Responsive Frontend",
        description:
          "Clean medical portals styled using adaptive and interactive web technologies.",
        icon: "Globe",
      },
    ],
    metrics: [
      { label: "Data Latency", value: "<45ms" },
      { label: "CRUD Operations", value: "Instant" },
      { label: "DB Engine", value: "MySQL" },
    ],
    timeline: {
      planning: "Feb 2026",
      development: "Mar 2026",
      testing: "Mar 2026",
      deployment: "Apr 2026",
    },
    images: [medicareHome, medicareDoc, medicareBook],
    mockupType: "browser",
    links: {
      github: "https://github.com/SufiyanSanderwale/MediCare",
      demo: null,
    },
  },
];

function getFeatureIcon(iconType: string) {
  switch (iconType) {
    case "Sparkles":
      return Sparkles;
    case "Activity":
      return Activity;
    case "Cpu":
      return Cpu;
    case "Search":
      return Search;
    case "Zap":
      return Zap;
    case "Globe":
      return Globe;
    case "Lock":
      return Lock;
    case "Calendar":
      return Calendar;
    case "Shield":
      return Shield;
    default:
      return Sparkles;
  }
}

export function Projects() {
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);

  return (
    <section id="work" className="relative py-24 md:py-36 overflow-hidden bg-background">
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-[20%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-accent-2/10 blur-[130px] animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        {/* Fine background noise grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="container-x relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <SectionLabel index="04" label="Selected Work" />
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight text-white uppercase"
            >
              FEATURED{" "}
              <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                PROJECTS
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-muted/90 leading-relaxed font-sans"
          >
            These projects demonstrate practical, hands-on experience in full-stack engineering,
            Java systems, AI integrations, performance-tuned responsive designs, and secure
            production-ready deployments.
          </motion.p>
        </div>

        {/* Sticky Cards Scroll Stacking Grid */}
        <div className="relative mt-12 flex flex-col items-center">
          {projects.map((project, index) => (
            <ProjectCardWrapper
              key={project.id}
              project={project}
              index={index}
              highlightedTech={highlightedTech}
              setHighlightedTech={setHighlightedTech}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardWrapper({
  project,
  index,
  highlightedTech,
  setHighlightedTech,
}: {
  project: Project;
  index: number;
  highlightedTech: string | null;
  setHighlightedTech: (tech: string | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll tracking to trigger cinematic scale-down, fading and blur of the older/underlying cards
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(2px)"]);

  // Dynamic filter highlight state
  const isMatch = highlightedTech ? project.techStack.includes(highlightedTech) : true;
  const isDimmed = highlightedTech && !isMatch;

  return (
    <div ref={cardRef} className="lg:sticky lg:top-[12vh] w-full mb-16 lg:mb-28 z-10">
      <motion.article
        style={{
          scale,
          opacity,
          filter: blurValue,
          willChange: "transform, opacity, filter",
        }}
        animate={{
          scale: isMatch ? 1 : 0.98,
          opacity: isDimmed ? 0.45 : 1,
          borderColor:
            isMatch && highlightedTech ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.08)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full rounded-[32px] glass p-6 md:p-12 shadow-premium overflow-hidden border border-white/10 group relative bg-zinc-950/90 backdrop-blur-3xl"
      >
        {/* Subtle glowing borders hover overlay */}
        <div
          className="absolute inset-0 rounded-[32px] border border-transparent bg-gradient-to-br from-violet-500/15 via-transparent to-blue-500/15 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700"
          style={{ margin: "-1px" }}
        />

        {/* Glowing Radial Ambient Aura */}
        <div
          className="pointer-events-none absolute -top-48 -right-48 h-96 w-96 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)" }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Premium Image Mockup */}
          <div className="lg:col-span-6 w-full h-full flex flex-col justify-center">
            {project.mockupType === "macbook" ? (
              <MacbookMockup images={project.images} title={project.title} />
            ) : (
              <BrowserMockup images={project.images} title={project.title} />
            )}
          </div>

          {/* RIGHT COLUMN: Project Details */}
          <div className="lg:col-span-6 flex flex-col h-full justify-between">
            <div>
              {/* Category, Title, Subtitle */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold bg-violet-500/10 px-2.5 py-0.5 rounded-full border border-violet-500/20">
                  {project.category}
                </span>
              </div>

              <h3 className="font-display font-black text-3xl md:text-5xl tracking-tight text-white mt-4">
                {project.title}
              </h3>

              <p className="text-sm text-subtle font-medium mt-1 font-mono">{project.subtitle}</p>

              {/* Descriptions */}
              <p className="mt-5 text-sm md:text-base leading-relaxed text-muted">
                {project.description}
              </p>

              <p className="mt-2 text-xs md:text-sm leading-relaxed text-subtle italic">
                {project.longDescription}
              </p>

              {/* Tech Stack Pills (Clickable filter) */}
              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-[0.15em] text-subtle font-semibold mb-2">
                  TECH STACK (CLICK TO HIGHLIGHT)
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => {
                    const isSelected = highlightedTech === tech;
                    return (
                      <button
                        key={tech}
                        onClick={() => {
                          playClickSound();
                          setHighlightedTech(isSelected ? null : tech);
                        }}
                        className={`relative rounded-full px-3 py-1 text-xs transition-all duration-300 font-mono flex items-center gap-1.5 cursor-pointer select-none border ${
                          isSelected
                            ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white border-transparent shadow-glow-purple scale-105"
                            : "border-white/10 bg-white/[0.03] text-muted hover:border-violet-500/30 hover:text-white"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Premium Statistics Metrics Panel */}
              <div className="grid grid-cols-3 gap-3 bg-white/[0.01] border border-white/5 rounded-2xl p-4 mt-6">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="text-center md:text-left">
                    <div className="text-xl md:text-2xl font-black font-display bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                      {metric.value}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-subtle mt-0.5 font-semibold">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons with Hover Lift Effects */}
              <div className="mt-8 flex flex-wrap gap-4">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="btn-primary btn-primary-hover flex items-center gap-2 group/btn"
                  >
                    <span>Visit Website</span>
                    <ExternalLink
                      size={14}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                    />
                  </a>
                )}
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                  className="btn-ghost btn-ghost-hover flex items-center gap-2 group/btn"
                >
                  <Github size={14} />
                  <span>View Codebase</span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROWS: Animated Feature Cards & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10">
          {project.featuresHighlight.map((feat) => {
            const Icon = getFeatureIcon(feat.icon);
            return (
              <div
                key={feat.title}
                className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-violet-500/20 hover:bg-white/[0.03] transition-all group/feat flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/10 to-blue-500/10 flex items-center justify-center text-accent group-hover/feat:scale-110 transition-transform">
                    <Icon size={15} />
                  </div>
                  <h4 className="mt-3 font-semibold text-xs md:text-sm text-white">{feat.title}</h4>
                  <p className="mt-1 text-[11px] md:text-xs text-subtle leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modern Progress Line Timeline */}
        <ProjectTimeline timeline={project.timeline} />
      </motion.article>
    </div>
  );
}

const MacbookMockup = memo(function MacbookMockup({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative group/mockup flex flex-col items-center w-full max-w-[500px] mx-auto lg:max-w-none">
      {/* Laptop Screen Frame */}
      <div className="relative w-full aspect-[16/10] bg-zinc-950 border-[7px] border-zinc-800 rounded-t-2xl shadow-2xl overflow-hidden transition-all duration-500 group-hover/mockup:shadow-violet-500/15">
        {/* Light reflection sweep on hover */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] group-hover/mockup:translate-x-full duration-[1.5s] ease-in-out -translate-x-full" />

        {/* Camera dot */}
        <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-900 z-30" />

        {/* Display Image */}
        <div className="w-full h-full bg-zinc-950 relative overflow-hidden">
          {images.map((img, i) => (
            <motion.img
              key={img}
              src={img}
              alt={`${title} Screen ${i + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === i ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700"
            />
          ))}
        </div>
      </div>

      {/* Laptop Base Keyboard */}
      <div className="relative w-[108%] h-3 bg-zinc-700 rounded-b-xl shadow-lg border-b border-white/10 z-10">
        {/* Trackpad Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/5 h-1.5 bg-zinc-900 rounded-b-md" />
      </div>

      {/* Screenshot Switcher Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 justify-center z-20 flex-wrap">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => {
                playClickSound();
                setActiveIndex(i);
              }}
              className={`w-12 h-8 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                activeIndex === i
                  ? "border-violet-500 shadow-glow-purple scale-110"
                  : "border-white/10 hover:border-white/40"
              }`}
            >
              <img src={img} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

const BrowserMockup = memo(function BrowserMockup({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative group/mockup flex flex-col items-center w-full max-w-[500px] mx-auto lg:max-w-none">
      <div className="relative w-full border border-white/10 rounded-2xl bg-zinc-950/80 shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Browser Top Header */}
        <div className="h-8 bg-zinc-900/95 border-b border-white/5 flex items-center px-4 gap-2 relative z-30">
          {/* Controls */}
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/85" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/85" />
            <span className="w-2 h-2 rounded-full bg-green-500/85" />
          </div>
          {/* URL bar */}
          <div className="bg-black/40 border border-white/5 text-[9px] text-zinc-500 px-6 py-0.5 rounded-md mx-auto w-1/2 text-center select-none font-mono truncate">
            {title.toLowerCase().replace(/\s+/g, "")}.com
          </div>
        </div>

        {/* Display Image */}
        <div className="w-full aspect-[16/10] bg-zinc-950 relative overflow-hidden">
          {/* Light reflection sweep on hover */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] group-hover/mockup:translate-x-full duration-[1.5s] ease-in-out -translate-x-full" />

          {images.map((img, i) => (
            <motion.img
              key={img}
              src={img}
              alt={`${title} Screen ${i + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === i ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700"
            />
          ))}
        </div>
      </div>

      {/* Screenshot Switcher Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 justify-center z-20 flex-wrap">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => {
                playClickSound();
                setActiveIndex(i);
              }}
              className={`w-12 h-8 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                activeIndex === i
                  ? "border-violet-500 shadow-glow-purple scale-110"
                  : "border-white/10 hover:border-white/40"
              }`}
            >
              <img src={img} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

function ProjectTimeline({
  timeline,
}: {
  timeline: { planning: string; development: string; testing: string; deployment: string };
}) {
  const steps = [
    { label: "Planning", date: timeline.planning },
    { label: "Development", date: timeline.development },
    { label: "Testing", date: timeline.testing },
    { label: "Deployment", date: timeline.deployment },
  ];

  return (
    <div className="mt-8 pt-8 border-t border-white/10">
      <div className="text-[10px] uppercase tracking-[0.2em] text-subtle mb-6 font-semibold">
        PROJECT LIFECYCLE TIMELINE
      </div>
      <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-4">
        {/* Progress connecting line */}
        <div className="absolute top-4 left-4 md:left-0 md:right-0 h-full md:h-[2px] w-[2px] md:w-full bg-white/5 z-0">
          <motion.div
            initial={{ height: 0, width: 0 }}
            whileInView={{ height: "100%", width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="bg-gradient-to-r from-violet-500 to-blue-500 h-full w-full"
          />
        </div>

        {steps.map((step, idx) => (
          <div
            key={step.label}
            className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-2 z-10 md:flex-1"
          >
            {/* Step node */}
            <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-accent/60 flex items-center justify-center text-accent shadow-glow-purple group-hover:scale-110 transition-transform">
              <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
            </div>

            {/* Step labels */}
            <div className="text-left md:text-center mt-1">
              <div className="text-xs font-semibold text-white">{step.label}</div>
              <div className="text-[10px] text-muted font-mono mt-0.5">{step.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
