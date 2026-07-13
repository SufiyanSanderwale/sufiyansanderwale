import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Lightweight3DSceneProps {
  active?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
}

export function Lightweight3DScene({ active = false }: Lightweight3DSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    // Set canvas dimensions
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || 300;
      height = rect?.height || 300;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    // Generate points on a sphere (Fibonacci lattice for perfectly even distribution)
    const points: Point3D[] = [];
    const sphereRadius = isMobile ? 65 : 100;
    const pointCount = isMobile ? 45 : 95; // Lower count on mobile for absolute performance

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      points.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z,
      });
    }

    // Capture mouse movement for interactive rotation
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.targetX = (e.clientX - cx) * 0.0003;
      mouseRef.current.targetY = (e.clientY - cy) * 0.0003;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Rotation angles
    const angleX = 0.003;
    const angleY = 0.0045;

    const focalLength = 320;
    const cameraDistance = 250;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse rotations for smooth lag effect
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Combine constant rotation with mouse influence
      const currentAngleX = angleX + mouseRef.current.y;
      const currentAngleY = angleY + mouseRef.current.x;

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      const projectedPoints: { x: number; y: number; z: number; scale: number }[] = [];

      // Rotate and project points
      points.forEach((p) => {
        // Rotate around Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Update positions
        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Perspective projection
        const depth = focalLength / (z2 + cameraDistance);
        const screenX = width / 2 + x1 * depth;
        const screenY = height / 2 + y2 * depth;

        projectedPoints.push({
          x: screenX,
          y: screenY,
          z: z2,
          scale: depth,
        });
      });

      // Draw wireframe connection lines between nearby points
      ctx.lineWidth = 0.6;
      const maxDistance = isMobile ? 55 : 75;

      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        const pt3d1 = points[i];

        // Draw node circles
        const size = Math.max(0.5, p1.scale * 1.8);
        const opacity = Math.max(0.1, Math.min(1, (pt3d1.z + sphereRadius) / (sphereRadius * 2)));

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, size, 0, Math.PI * 2);
        // Gradient color based on depth
        ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 0.85})`;
        ctx.fill();

        // Connect with neighbors
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          const pt3d2 = points[j];

          const dx = pt3d1.x - pt3d2.x;
          const dy = pt3d1.y - pt3d2.y;
          const dz = pt3d1.z - pt3d2.z;
          const distance3d = Math.hypot(dx, dy, dz);

          if (distance3d < maxDistance) {
            const lineOpacity =
              (1 - distance3d / maxDistance) *
              0.15 *
              Math.min(p1.scale, p2.scale) *
              ((pt3d1.z + pt3d2.z + sphereRadius * 2) / (sphereRadius * 4));

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Shift colors between purple and blue based on connection depth
            const blueWeight = Math.min(
              1,
              Math.max(0, (pt3d1.z + sphereRadius) / (sphereRadius * 2)),
            );
            if (blueWeight > 0.5) {
              ctx.strokeStyle = `rgba(59, 130, 246, ${lineOpacity})`;
            } else {
              ctx.strokeStyle = `rgba(139, 92, 246, ${lineOpacity})`;
            }
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
    >
      <canvas ref={canvasRef} className="block h-full w-full opacity-60" />
    </motion.div>
  );
}
