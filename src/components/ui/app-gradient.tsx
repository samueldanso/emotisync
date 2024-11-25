export function AppMeshGradient() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Main gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6842d8]/5 via-[#9064d5]/5 to-[#f4b1c8]/5" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#6842d8/10,transparent_70%)]" />

      {/* Subtle accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,#f4b1c8/15,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,#9064d5/15,transparent_50%)]" />
    </div>
  );
}
