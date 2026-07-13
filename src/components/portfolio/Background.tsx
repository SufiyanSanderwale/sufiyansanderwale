export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 15% 0%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(1000px 700px at 85% 20%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(900px 600px at 50% 100%, rgba(139,92,246,0.12), transparent 60%), #050505",
        }}
      />
      {/* grid */}
      <div className="grid-bg absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* blobs */}
      <div
        className="animate-blob-a absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.55), transparent 60%)" }}
      />
      <div
        className="animate-blob-b absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5), transparent 60%)" }}
      />
      <div
        className="animate-blob-a absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 60%)" }}
      />

      {/* noise */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
