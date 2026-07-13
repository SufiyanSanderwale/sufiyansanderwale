import { motion } from "framer-motion";
import { SectionLabel } from "./About";
import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    kind: "work",
    role: "Software Developer Intern",
    org: "Pentagon Space Pvt. Ltd.",
    place: "Bengaluru",
    period: "Jan 2026 — Present",
    bullets: [
      "Training in Java, SQL and modern web development technologies.",
      "Applied Object-Oriented Programming concepts to practical applications.",
      "Built web applications using Java, HTML, CSS, JavaScript and MySQL.",
      "Sharpened problem-solving and debugging through hands-on project work.",
    ],
  },
];

const education = [
  {
    degree: "B.E. — Computer Science & Engineering",
    org: "Maratha Mandal Engineering College, Belagavi",
    period: "2022 — 2026",
    score: "83.3%",
  },
  {
    degree: "Pre-University (Science)",
    org: "B. Shankaranand PU College, Kudachi",
    period: "2021 — 2022",
    score: "70%",
  },
  {
    degree: "SSLC",
    org: "Junnedia High School, Kudachi",
    period: "2019 — 2020",
    score: "67%",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-40">
      <div className="container-x">
        <SectionLabel index="02" label="Journey" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-8 max-w-3xl text-4xl leading-tight tracking-tight md:text-6xl font-semibold"
        >
          Experience & <span className="text-gradient-accent">education</span>.
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Experience column */}
          <div>
            <ColumnTitle icon={<Briefcase size={16} />} title="Experience" />
            <div className="mt-6 space-y-4">
              {experience.map((e, i) => (
                <TimelineCard
                  key={i}
                  title={e.role}
                  subtitle={`${e.org} · ${e.place}`}
                  period={e.period}
                >
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </TimelineCard>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <ColumnTitle icon={<GraduationCap size={16} />} title="Education" />
            <div className="mt-6 space-y-4">
              {education.map((e, i) => (
                <TimelineCard
                  key={i}
                  title={e.degree}
                  subtitle={e.org}
                  period={e.period}
                  badge={e.score}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ColumnTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.2))",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {icon}
      </div>
      <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
        {title}
      </span>
    </div>
  );
}

function TimelineCard({
  title,
  subtitle,
  period,
  badge,
  children,
}: {
  title: string;
  subtitle: string;
  period: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="glass rounded-[28px] p-6 md:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight md:text-xl">{title}</h3>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </div>
        {badge && (
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-accent">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-widest text-subtle">{period}</div>
      {children}
    </motion.div>
  );
}
