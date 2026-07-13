import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export function Magnetic({ children, range = 70, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rect: DOMRect | null = null;

    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });

    const onMove = (e: MouseEvent) => {
      if (!rect) {
        rect = el.getBoundingClientRect();
      }
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < range) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const onLeave = () => {
      rect = null;
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, range, strength]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className="inline-block">
      {children}
    </motion.div>
  );
}
