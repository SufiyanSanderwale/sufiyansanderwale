import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";
import { SectionLabel } from "./About";
import { playClickSound } from "@/lib/sound";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Download,
  Loader2,
  Sparkles,
  ChevronUp,
} from "lucide-react";

// Contact Details from Resume
const contactDetails = {
  email: "sufiyansanderwale54@gmail.com",
  phone: "+91 90191 91892",
  location: "Belagavi, Karnataka · India",
  linkedin: "https://www.linkedin.com/in/sufiyan-sanderwale",
  linkedinLabel: "in/sufiyan-sanderwale",
  github: "https://github.com/SufiyanSanderwale",
  githubLabel: "SufiyanSanderwale",
};

// Magnetic Pull wrapper component
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    // Magnetic pull distance
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// Interactive Canvas background particle network
function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    const particleCount = Math.min(Math.floor((width * height) / 16000), 55);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
      });
    }

    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    let isScrolling = false;
    let scrollTimeout: number;
    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 120);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    if (isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            draw();
          }
        });
      },
      { threshold: 0 },
    );

    observer.observe(canvas);

    const draw = () => {
      if (!isVisible) return;

      if (isMobile && isScrolling) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(139, 92, 246, 0.15)";
      ctx.strokeStyle = "rgba(139, 92, 246, 0.05)";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce back boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Attract particles slightly to mouse cursor
        if (mouse.x > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= dx * force * 0.02;
            p.y -= dy * force * 0.02;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw interactive mesh lines between close nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const opacity = ((110 - dist) / 110) * 0.08;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (isMobile) {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      }
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
  );
}

// 3D Tilt Contact Card
function ContactCard({
  icon: Icon,
  title,
  value,
  copyValue,
  link,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
  copyValue?: string;
  link?: string;
}) {
  const [copied, setCopied] = useState(false);
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
    setRotateX(-y / (box.height / 25)); // scale tilt degree
    setRotateY(x / (box.width / 25));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    boxRef.current = null;
    setRotateX(0);
    setRotateY(0);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playClickSound();
    if (!copyValue) return;
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CardContent = (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1000,
        y: isHovered ? -6 : 0,
        borderColor: isHovered ? "rgba(139, 92, 246, 0.4)" : "rgba(255, 255, 255, 0.08)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex items-center justify-between p-6 rounded-[28px] glass border border-white/10 bg-zinc-950/80 backdrop-blur-3xl overflow-hidden group/card shadow-premium w-full select-none"
    >
      {/* Light sheen sweep on hover */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] group-hover/card:translate-x-full duration-[1.5s] ease-in-out -translate-x-full" />

      {/* Dynamic hover glow spot */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-violet-600/10 blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center gap-4 relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-white/5 text-accent group-hover/card:scale-110 group-hover/card:shadow-glow-purple transition-all duration-300">
          <Icon
            size={18}
            className="group-hover/card:rotate-12 transition-transform duration-300"
          />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-subtle font-semibold">
            {title}
          </div>
          <div className="mt-1 text-sm md:text-base font-medium text-white group-hover/card:text-accent transition-colors truncate max-w-[200px] md:max-w-[280px]">
            {value}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 relative z-10">
        {copyValue && (
          <button
            onClick={handleCopy}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.02] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/10 text-muted hover:text-white transition-all cursor-pointer"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        )}

        {link && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.02] border border-white/5 text-muted hover:text-white group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all">
            <ArrowUpRight size={14} />
          </div>
        )}
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noreferrer" className="block w-full">
        {CardContent}
      </a>
    );
  }

  return <div className="w-full">{CardContent}</div>;
}

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Field Validations
    if (!formState.name.trim()) {
      toast.error("Name is required.", {
        style: {
          background: "rgba(15, 10, 25, 0.9)",
          color: "#f87171",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          backdropFilter: "blur(12px)",
        },
      });
      return;
    }

    if (!formState.email.trim()) {
      toast.error("Email is required.", {
        style: {
          background: "rgba(15, 10, 25, 0.9)",
          color: "#f87171",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          backdropFilter: "blur(12px)",
        },
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast.error("Please enter a valid email address.", {
        style: {
          background: "rgba(15, 10, 25, 0.9)",
          color: "#f87171",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          backdropFilter: "blur(12px)",
        },
      });
      return;
    }

    if (!formState.subject.trim()) {
      toast.error("Subject is required.", {
        style: {
          background: "rgba(15, 10, 25, 0.9)",
          color: "#f87171",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          backdropFilter: "blur(12px)",
        },
      });
      return;
    }

    if (formState.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters long.", {
        style: {
          background: "rgba(15, 10, 25, 0.9)",
          color: "#f87171",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          backdropFilter: "blur(12px)",
        },
      });
      return;
    }

    setStatus("loading");

    try {
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        subject: formState.subject,
        message: formState.message,
      };

      await emailjs.send(
        "service_769ici2",
        "template_yb9fnsd",
        templateParams,
        "ua-66grbiqnAAWYef",
      );

      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });

      // Reset back to idle after a while
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("EmailJS sending failed:", error);
      setStatus("idle");
      toast.error("Something went wrong. Please try again.", {
        style: {
          background: "rgba(15, 10, 25, 0.9)",
          color: "#f87171",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          backdropFilter: "blur(12px)",
        },
      });
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden bg-background">
      <Toaster richColors theme="dark" position="bottom-right" />
      {/* Background Glowing Mesh Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-[5%] right-[-5%] w-[45rem] h-[45rem] rounded-full bg-violet-600/10 blur-[130px] animate-pulse-glow" />
        <div
          className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-glow"
          style={{ animationDelay: "2.5s" }}
        />
        {/* Subtle grid mesh line overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <CanvasParticles />

      <div className="container-x relative z-10">
        {/* Floating Open-To-Work Status Badge */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-emerald-500/20 bg-emerald-950/10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              Immediate Onboarding Available · Ready to Relocate
            </span>
          </motion.div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <SectionLabel index="07" label="Get In Touch" />

          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.95] text-white uppercase max-w-4xl"
            >
              LET'S BUILD <br />
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
                SOMETHING AMAZING
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
            I'm always excited to discuss new opportunities, collaborate on innovative projects, and
            build impactful software solutions. Whether you have a job opportunity, freelance
            project, or simply want to connect, I'd love to hear from you.
          </motion.p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Cards Pile */}
          <div className="lg:col-span-5 flex flex-col gap-4 w-full">
            <ContactCard
              icon={Mail}
              title="Email Address"
              value={contactDetails.email}
              copyValue={contactDetails.email}
              link={`mailto:${contactDetails.email}`}
            />
            <ContactCard
              icon={Phone}
              title="Phone Number"
              value={contactDetails.phone}
              copyValue={contactDetails.phone}
              link={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
            />
            <ContactCard icon={MapPin} title="Current Location" value={contactDetails.location} />
            <ContactCard
              icon={Linkedin}
              title="LinkedIn Profile"
              value={contactDetails.linkedinLabel}
              link={contactDetails.linkedin}
            />
            <ContactCard
              icon={Github}
              title="GitHub Profile"
              value={contactDetails.githubLabel}
              link={contactDetails.github}
            />

            {/* Resume Button with Glow & Magnetic Pull */}
            <div className="mt-4 flex justify-start">
              <Magnetic>
                <a
                  href="/Sufiyan_Sanderwale_Resume.pdf"
                  download="Sufiyan_Sanderwale_Resume.pdf"
                  onClick={playClickSound}
                  className="relative group/resume inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 font-semibold text-white border border-white/10 shadow-glow-purple cursor-pointer select-none overflow-hidden hover:scale-105 transition-all duration-300"
                >
                  {/* Sheen sweep */}
                  <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.1] to-white/[0.2] group-hover/resume:translate-x-full duration-[1.5s] ease-in-out -translate-x-full" />
                  <Download
                    size={16}
                    className="group-hover/resume:translate-y-0.5 transition-transform"
                  />
                  <span>Download Résumé</span>
                  <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded-full font-mono font-medium text-white border border-white/5">
                    PDF
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right: Modern Glass Contact Form */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[32px] glass p-6 md:p-10 border border-white/10 bg-zinc-950/80 backdrop-blur-3xl shadow-premium"
            >
              {/* Status Banner */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shadow-glow-emerald">
                      <Sparkles size={24} className="animate-pulse" />
                    </div>
                    <h4 className="font-display font-bold text-2xl text-emerald-400">
                      Message Dispatched!
                    </h4>
                    <p className="text-xs text-muted mt-2 max-w-sm leading-relaxed">
                      Your message has been sent successfully. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-subtle font-semibold">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Doe"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          disabled={status === "loading"}
                          className="w-full bg-white/[0.02] border border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-zinc-600 font-sans"
                        />
                      </div>

                      {/* Email field */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-subtle font-semibold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@example.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          disabled={status === "loading"}
                          className="w-full bg-white/[0.02] border border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-zinc-600 font-sans"
                        />
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-subtle font-semibold">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Collaboration Opportunity"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        disabled={status === "loading"}
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-zinc-600 font-sans"
                      />
                    </div>

                    {/* Message field */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-subtle font-semibold">
                        Your Message
                      </label>
                      <textarea
                        required
                        minLength={10}
                        rows={5}
                        placeholder="Hi Sufiyan, I'd love to connect regarding a software developer position..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        disabled={status === "loading"}
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-zinc-600 resize-none font-sans leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-2">
                      <Magnetic>
                        <button
                          type="submit"
                          onClick={playClickSound}
                          disabled={status === "loading"}
                          className="relative group/submit w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/[0.03] hover:bg-violet-600 border border-white/10 hover:border-transparent text-sm font-semibold text-white cursor-pointer hover:shadow-glow-purple select-none transition-all duration-300 disabled:opacity-50"
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 size={16} className="animate-spin text-accent" />
                              <span>Broadcasting Message...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <Send
                                size={14}
                                className="group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5 transition-transform"
                              />
                            </>
                          )}
                        </button>
                      </Magnetic>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================================================
// PREMIUM MINIMALIST FOOTER COMPONENT
// ==================================================
export function Footer() {
  const handleScrollTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-zinc-950 py-16 z-10 overflow-hidden">
      <div className="container-x">
        {/* Top Segment: 3-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Brand & Focus */}
          <div className="lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h3 className="font-display font-black text-2xl tracking-tight text-white uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              SUFIYAN
            </h3>
            <p className="text-xs text-muted max-w-sm leading-relaxed">
              Computer Science Graduate dedicated to full stack applications, enterprise backend
              integration, performance optimizations, and robust clean designs.
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start mt-2">
              <span className="text-[9px] font-mono text-accent uppercase tracking-wider bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                Software Developer
              </span>
              <span className="text-[9px] font-mono text-accent uppercase tracking-wider bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                Java Developer
              </span>
              <span className="text-[9px] font-mono text-accent uppercase tracking-wider bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                AI Enthusiast
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-subtle font-bold">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <a href="#about" className="text-xs text-muted hover:text-white transition-colors">
                About
              </a>
              <a href="#skills" className="text-xs text-muted hover:text-white transition-colors">
                Skills
              </a>
              <a href="#work" className="text-xs text-muted hover:text-white transition-colors">
                Projects
              </a>
              <a
                href="#experience"
                className="text-xs text-muted hover:text-white transition-colors"
              >
                Experience
              </a>
              <a
                href="#certifications"
                className="text-xs text-muted hover:text-white transition-colors"
              >
                Certificates
              </a>
              <a href="#contact" className="text-xs text-muted hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Column 3: Direct Connect */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-4 justify-between h-full">
            <div className="flex flex-col gap-3 w-full">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-subtle font-bold">
                Connect Directly
              </h4>
              <div className="flex gap-2 justify-center md:justify-start">
                <Magnetic>
                  <a
                    href={contactDetails.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl glass border border-white/10 hover:border-violet-500/40 text-muted hover:text-white transition-all group/icon"
                    title="GitHub"
                  >
                    <Github
                      size={15}
                      className="group-hover/icon:rotate-[360deg] transition-transform duration-500"
                    />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={contactDetails.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl glass border border-white/10 hover:border-violet-500/40 text-muted hover:text-white transition-all group/icon"
                    title="LinkedIn"
                  >
                    <Linkedin
                      size={15}
                      className="group-hover/icon:rotate-[360deg] transition-transform duration-500"
                    />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl glass border border-white/10 hover:border-violet-500/40 text-muted hover:text-white transition-all group/icon"
                    title="Email"
                  >
                    <Mail
                      size={15}
                      className="group-hover/icon:rotate-[360deg] transition-transform duration-500"
                    />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="/Sufiyan_Sanderwale_Resume.pdf"
                    download="Sufiyan_Sanderwale_Resume.pdf"
                    className="flex h-9 w-9 items-center justify-center rounded-xl glass border border-white/10 hover:border-violet-500/40 text-muted hover:text-white transition-all group/icon"
                    title="Resume"
                  >
                    <Download
                      size={15}
                      className="group-hover/icon:rotate-[360deg] transition-transform duration-500"
                    />
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Scroll back to top button */}
            <button
              onClick={handleScrollTop}
              className="mt-4 flex items-center gap-1.5 text-[9px] font-mono text-subtle hover:text-white transition-colors cursor-pointer group/top"
            >
              <span>BACK TO TOP</span>
              <ChevronUp
                size={12}
                className="group-hover/top:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>© 2026 All Rights Reserved</div>
          <div className="text-center group/dev">
            Designed & Developed by{" "}
            <span className="text-zinc-400 group-hover/dev:text-violet-400 transition-colors">
              Sufiyan Sanderwale
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
