import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      if (onComplete) onComplete();
    }, 1800);

    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] select-none"
        >
          {/* Subtle ambient glow behind center */}
          <div
            className="absolute h-[300px] w-[300px] rounded-full opacity-35 blur-3xl animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center gap-8">
            {/* Centered Name */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl font-black tracking-[0.4em] text-white md:text-6xl pl-[0.4em]"
              style={{
                textShadow: "0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(59,130,246,0.2)",
              }}
            >
              SUFIYAN
            </motion.div>

            {/* Glowing line that grows from left to right */}
            <div className="relative h-[2px] w-64 overflow-hidden rounded-full bg-white/5 md:w-80">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                  boxShadow: "0 0 16px rgba(139,92,246,0.8), 0 0 32px rgba(59,130,246,0.5)",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
