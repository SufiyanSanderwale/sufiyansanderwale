import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, HTMLMotionProps } from "framer-motion";
import { SectionLabel } from "./About";
import { playCertSlideSound } from "@/lib/sound";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Sparkles,
  CheckCircle,
  Briefcase,
  Users,
  Calendar,
  MapPin,
  Download,
  Flame,
  ArrowRight,
  Monitor,
} from "lucide-react";
import pentagon from "@/assets/certs/pentagon.jpg";
import codtech from "@/assets/certs/codtech.png";
import ibm from "@/assets/certs/ibm.png";
import gcloud from "@/assets/certs/gcloud.png";
import upgrad from "@/assets/certs/upgrad.png";

// Types
type Certification = {
  title: string;
  org: string;
  year: string;
  img: string;
  description: string;
  skills: string[];
};

const certs: Certification[] = [
  {
    title: "Java Full Stack Internship",
    org: "Pentagon Space",
    year: "2026",
    img: pentagon,
    description:
      "In-depth development program focusing on enterprise Java architecture, Spring Boot services, database modeling, and scalable modern frontend integrations.",
    skills: ["Java EE", "Spring Boot", "Hibernate", "PostgreSQL", "React", "REST APIs"],
  },
  {
    title: "Full Stack Web Development",
    org: "CODTECH IT Solutions",
    year: "2026",
    img: codtech,
    description:
      "Hands-on engineering certification covering robust client-server platforms, JWT-based security layers, API routing, and server-side model pipelines.",
    skills: ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS", "JWT Auth"],
  },
  {
    title: "Introduction to Artificial Intelligence",
    org: "IBM",
    year: "2025",
    img: ibm,
    description:
      "Comprehensive foundational study of generative AI architectures, deep learning models, natural language processing, and industry-grade AI ethics.",
    skills: ["Generative AI", "Neural Networks", "Machine Learning", "NLP", "AI Ethics"],
  },
  {
    title: "Introduction to Generative AI Studio",
    org: "Google Cloud · Simplilearn",
    year: "2025",
    img: gcloud,
    description:
      "Explored advanced Google Cloud generative capabilities, large language model configurations, attention layers, and practical prompt development paradigms.",
    skills: ["LLMs", "Vertex AI", "Prompt Engineering", "Google Cloud", "Attention Mechanisms"],
  },
  {
    title: "Web Development Certification",
    org: "upGrad",
    year: "2023",
    img: upgrad,
    description:
      "Specialized certification program centered on building high-performance, semantic, and fully responsive layouts across standard web browsers.",
    skills: ["HTML5", "CSS3", "JavaScript ES6", "Responsive Design", "Flexbox & Grid", "DOM API"],
  },
];

// Achievements Stats Data
const stats = [
  { value: 5, suffix: "+", label: "Projects", icon: Flame, color: "from-violet-500 to-blue-500" },
  {
    value: 1,
    suffix: "",
    label: "Internship Completed",
    icon: Briefcase,
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    value: 5,
    suffix: "+",
    label: "Certifications",
    icon: Award,
    color: "from-cyan-500 to-blue-500",
  },
  {
    value: 3,
    suffix: "",
    label: "Live Production Site",
    icon: Monitor,
    color: "from-emerald-500 to-teal-500",
  },
];

// Continuous Animated Number component
function CountUp({
  end,
  suffix = "",
  prefix = "",
  start,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasStartedRef = useRef(false);
  const animationFrameRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start || hasStartedRef.current) return;
    hasStartedRef.current = true;
    startTimeRef.current = null;

    const duration = 1500;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = Math.min(timestamp - startTimeRef.current, duration);
      const progress = elapsed / duration;
      setCount(Math.floor(progress * end));

      if (elapsed < duration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [end, start]);

  return (
    <span className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// 3D Tilt Card wrapper
interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

function TiltCard({ children, className, ...props }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const boxRef = useRef<DOMRect | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    let box = boxRef.current;
    if (!box) {
      box = e.currentTarget.getBoundingClientRect();
      boxRef.current = box;
    }
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Max 10 degrees tilt
    setRotateX(-y / (box.height / 20));
    setRotateY(x / (box.width / 20));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    boxRef.current = null;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1000,
        y: isHovered ? -8 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Certifications() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);

  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(achievementsRef, { once: true, margin: "-80px" });
  const isCarouselInView = useInView(carouselContainerRef, { margin: "-50px" });

  // Auto scroll functionality for desktop
  useEffect(() => {
    if (isHoveringCarousel || activeCert || !isCarouselInView) return;

    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % certs.length);
    }, 1000);

    return () => clearInterval(timer);
  }, [isHoveringCarousel, activeCert, isCarouselInView]);

  const handlePrev = () => {
    playCertSlideSound();
    setCarouselIndex((prev) => (prev - 1 + certs.length) % certs.length);
  };

  const handleNext = () => {
    playCertSlideSound();
    setCarouselIndex((prev) => (prev + 1) % certs.length);
  };

  return (
    <section id="certifications" className="relative py-24 md:py-36 overflow-hidden bg-background">
      {/* Background Decorative Mesh & Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[25%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-violet-600/10 blur-[130px] animate-pulse-glow" />
        <div
          className="absolute bottom-[10%] left-[-15%] w-[40rem] h-[40rem] rounded-full bg-blue-600/10 blur-[140px] animate-pulse-glow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container-x relative z-10">
        {/* ==================================================
            CERTIFICATIONS SECTION HEADER
            ================================================== */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <SectionLabel index="05" label="Certifications" />

          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight text-white uppercase"
            >
              CERTIFI
              <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                CATIONS
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-muted/90 leading-relaxed font-sans"
          >
            My learning journey reflects continuous improvement through professional certifications
            in Java, Full Stack Development, Artificial Intelligence, and Modern Web Technologies.
          </motion.p>
        </div>

        {/* ==================================================
            CERTIFICATE DISPLAY (Draggable / Slider Component)
            ================================================== */}
        <div
          ref={carouselContainerRef}
          onMouseEnter={() => setIsHoveringCarousel(true)}
          onMouseLeave={() => setIsHoveringCarousel(false)}
          className="relative w-full overflow-visible py-4 mb-24 group/carousel"
        >
          {/* Navigation Controls (Visible on hover on Desktop) */}
          <div className="hidden lg:flex justify-between items-center absolute top-1/2 -translate-y-1/2 -left-12 -right-12 z-20 pointer-events-none">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full glass border border-white/10 text-white hover:bg-white/10 hover:border-violet-500/30 shadow-premium transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full glass border border-white/10 text-white hover:bg-white/10 hover:border-violet-500/30 shadow-premium transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Desktop Slider View (Horizontal Stagger Carousel) */}
          <div className="hidden lg:block relative h-[480px] w-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {certs.map((cert, idx) => {
                  // Display 3 items centered around the current index
                  const position = (idx - carouselIndex + certs.length) % certs.length;

                  // Only render the closest 3 cards
                  if (position > 1 && position < certs.length - 1) return null;

                  // Define layouts based on carousel position offsets
                  let xOffset = 0;
                  let scaleVal = 1;
                  let zIndexVal = 10;
                  let opacityVal = 1;
                  let rotation = 0;

                  if (position === 0) {
                    // Active/Centered Card
                    xOffset = 0;
                    scaleVal = 1;
                    zIndexVal = 30;
                    opacityVal = 1;
                    rotation = 0;
                  } else if (position === 1) {
                    // Next Card (Right)
                    xOffset = 380;
                    scaleVal = 0.85;
                    zIndexVal = 20;
                    opacityVal = 0.6;
                    rotation = 5;
                  } else if (position === certs.length - 1) {
                    // Previous Card (Left)
                    xOffset = -380;
                    scaleVal = 0.85;
                    zIndexVal = 20;
                    opacityVal = 0.6;
                    rotation = -5;
                  }

                  return (
                    <motion.div
                      key={cert.title}
                      initial={{ opacity: 0, scale: 0.7, x: xOffset * 1.5 }}
                      animate={{
                        opacity: opacityVal,
                        scale: scaleVal,
                        x: xOffset,
                        zIndex: zIndexVal,
                        rotate: rotation,
                      }}
                      exit={{ opacity: 0, scale: 0.7, x: xOffset * 1.5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      className="absolute w-[440px] cursor-pointer"
                      onClick={() => (position === 0 ? setActiveCert(cert) : setCarouselIndex(idx))}
                    >
                      <TiltCard className="relative overflow-hidden rounded-[32px] glass p-6 border border-white/10 bg-zinc-950/80 backdrop-blur-3xl shadow-premium h-[420px] flex flex-col justify-between group">
                        {/* Interactive light sheen sweep */}
                        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] group-hover:translate-x-full duration-[1.5s] ease-in-out -translate-x-full" />

                        <div>
                          {/* Image Thumbnail inside elegant glass frame */}
                          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                            <img
                              src={cert.img}
                              alt={cert.title}
                              className="w-full h-full object-cover object-top"
                            />
                            {/* Hover Eye Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                              <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-glow-purple scale-75 group-hover:scale-100 transition-transform duration-300">
                                <Eye size={18} />
                              </div>
                            </div>
                          </div>

                          {/* Info Header */}
                          <div className="mt-5 flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest font-mono text-accent">
                              {cert.org}
                            </span>
                            <span className="text-[10px] text-subtle font-mono font-medium">
                              {cert.year}
                            </span>
                          </div>

                          {/* Certificate Title */}
                          <h3 className="font-display font-bold text-lg text-white mt-2 leading-snug group-hover:text-accent transition-colors">
                            {cert.title}
                          </h3>

                          {/* Small Description */}
                          <p className="text-xs text-muted leading-relaxed mt-2 line-clamp-2">
                            {cert.description}
                          </p>
                        </div>

                        {/* Tech/Skills pills */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {cert.skills.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="text-[9px] font-mono text-subtle px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02]"
                            >
                              {s}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="text-[9px] font-mono text-accent px-1.5 py-0.5 rounded-full border border-violet-500/10 bg-violet-500/5">
                              +{cert.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Tablet (2 Column Grid) & Mobile (1 Column Stack) Views */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
            {certs.map((cert) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="cursor-pointer"
                onClick={() => setActiveCert(cert)}
              >
                <div className="relative overflow-hidden rounded-3xl glass p-5 border border-white/10 bg-zinc-950/80 backdrop-blur-3xl shadow-premium flex flex-col justify-between h-full group">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/5 bg-zinc-900">
                      <img
                        src={cert.img}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye size={20} className="text-white" />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                        {cert.org}
                      </span>
                      <span className="text-[10px] font-mono text-subtle">{cert.year}</span>
                    </div>

                    <h3 className="font-display font-semibold text-base text-white mt-1 leading-snug group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted mt-2 line-clamp-2">{cert.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cert.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-[9px] font-mono text-subtle px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Active Dots for Desktop */}
          <div className="hidden lg:flex justify-center gap-2 mt-8">
            {certs.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  carouselIndex === i ? "bg-violet-500 w-8" : "bg-white/10 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ==================================================
            ACHIEVEMENTS SECTION
            ================================================== */}
        <div id="milestones" ref={achievementsRef} className="border-t border-white/10 pt-24 mt-8">
          <div className="flex flex-col items-center text-center mb-16">
            <SectionLabel index="06" label="Milestones" />
            <div className="overflow-hidden mt-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase"
              >
                CAREER{" "}
                <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                  MILESTONES
                </span>
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="relative overflow-hidden rounded-[28px] glass p-6 border border-white/10 bg-zinc-950/50 backdrop-blur-3xl group"
                >
                  {/* Hover visual light glows */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-0 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}
                  />

                  <div className="flex justify-between items-start">
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 bg-clip-border text-white shadow-inner flex items-center justify-center`}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-subtle uppercase">
                      VERIFIED
                    </span>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white flex items-baseline">
                      <CountUp end={stat.value} suffix={stat.suffix} start={sectionInView} />
                    </h3>
                    <p className="text-xs md:text-sm font-medium text-muted mt-2">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Recruiter-focused Status Cards (Open to Work / Immediate Joiner) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl glass p-6 md:p-8 border border-emerald-500/20 bg-emerald-950/10 backdrop-blur-3xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="relative flex h-4 w-4 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-glow-emerald"></span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    OPEN TO WORK
                  </h4>
                  <p className="text-xs text-muted mt-1">
                    Available for full-time Software Engineering & Developer roles.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400">
                  Immediate Joiner
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400">
                  Ready To Relocate
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl glass p-6 md:p-8 border border-violet-500/20 bg-violet-950/10 backdrop-blur-3xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                  <CheckCircle size={18} className="text-violet-400" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-violet-400 group-hover:text-violet-300 transition-colors">
                    IMMEDIATE JOINER
                  </h4>
                  <p className="text-xs text-muted mt-1">
                    Completed all university timelines and ready for onboarding today.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase bg-violet-500/10 border border-violet-500/20 px-4 py-1.5 rounded-full text-violet-400 flex items-center gap-1.5">
                <Sparkles size={12} />
                Fully Onboardable
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================================================
          FULLSCREEN LIGHTBOX MODAL
          ================================================== */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 md:p-10"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative max-w-4xl w-full rounded-3xl bg-zinc-950/90 border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Certificate Full Image Display */}
              <div className="md:w-[60%] bg-black flex items-center justify-center p-4">
                <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={activeCert.img}
                    alt={activeCert.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Certificate Metadata Details */}
              <div className="md:w-[40%] p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-zinc-950">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 inline-block">
                    {activeCert.org}
                  </span>

                  <h3 className="font-display font-black text-2xl tracking-tight text-white mt-4 leading-tight">
                    {activeCert.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-subtle text-xs font-mono">
                    <Calendar size={12} />
                    <span>Issued: {activeCert.year}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted mt-5 leading-relaxed">
                    {activeCert.description}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-[10px] font-mono tracking-wider text-subtle uppercase font-semibold">
                      SKILLS DEMONSTRATED
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {activeCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono text-white bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                  <a
                    href={activeCert.img}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary btn-primary-hover flex-1 text-center py-2.5 flex items-center justify-center gap-2 text-xs"
                  >
                    <Eye size={14} />
                    <span>View Large</span>
                  </a>
                  <a
                    href={activeCert.img}
                    download={`Sufiyan_Sanderwale_${activeCert.title.replace(/\s+/g, "_")}`}
                    className="btn-ghost btn-ghost-hover flex-1 text-center py-2.5 flex items-center justify-center gap-2 text-xs"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
