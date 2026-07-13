import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  // Position of cursor
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);

  // Smooth springs for outer ring and text
  const springConfig = { stiffness: 220, damping: 28, mass: 0.2 };
  const sx = useSpring(cx, springConfig);
  const sy = useSpring(cy, springConfig);

  // Track cursor position and hovered targets
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    // Hide native cursor on desktop
    const style = document.createElement("style");
    style.innerHTML = `
      @media (pointer: fine) {
        body, a, button, select, input, textarea, [role="button"], [data-cursor] {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverable = target.closest("a, button, [data-cursor], [role='button']");
      let nextText: string | null = null;
      if (hoverable) {
        // Decide appropriate text
        const explicitAttr = hoverable.getAttribute("data-cursor");
        if (explicitAttr) {
          nextText = explicitAttr.toUpperCase();
        } else if (hoverable.closest("#work") && hoverable.tagName === "A") {
          nextText = "VIEW";
        } else if (hoverable.getAttribute("target") === "_blank") {
          nextText = "OPEN";
        } else {
          nextText = "CLICK";
        }
      }

      setCursorText((prev) => (prev === nextText ? prev : nextText));
    };

    const onLeave = () => {
      setCursorText(null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [cx, cy]);

  if (!enabled) return null;

  const isHovered = cursorText !== null;

  return (
    <>
      {/* Inner Dot: precise white tracker, hides when hovered over interactive items */}
      <motion.div
        className="pointer-events-none fixed z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{
          left: cx,
          top: cy,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />

      {/* Outer Ring & Glow: expanding difference mask with contextual tags */}
      <motion.div
        className="pointer-events-none fixed z-[99] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 bg-accent/5 flex items-center justify-center mix-blend-difference"
        style={{
          left: sx,
          top: sy,
          boxShadow: isHovered
            ? "0 0 40px rgba(139,92,246,0.35), inset 0 0 12px rgba(139,92,246,0.2)"
            : "0 0 20px rgba(139,92,246,0.15)",
        }}
        animate={{
          width: isHovered ? 80 : 36,
          height: isHovered ? 80 : 36,
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0)",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.45)" : "rgba(139, 92, 246, 0.4)",
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 24,
          mass: 0.6,
        }}
      >
        {/* Dynamic Contextual Typography */}
        <motion.span
          className="text-[9px] font-bold uppercase tracking-[0.24em] text-white font-mono pl-[0.24em]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          {cursorText}
        </motion.span>
      </motion.div>
    </>
  );
}
