export function AppMeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Main gradient wrap */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/10 to-brand-background" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#6e38d6/20,transparent_70%)]" />

      {/* Side accents with rose pink */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,#f5bad0/25,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,#ffb4e1/25,transparent_50%)]" />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
    </div>
  )
}

// Radial gradient for chat
export function ChatRadialGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f5bad0/10,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffb4e1/5,transparent_50%)]" />
    </div>
  )
}
