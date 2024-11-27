export function HeroMeshGradient() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px]">
      {/* Main gradient wrap - increased opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-brand-background" />

      {/* Radial glow - increased opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#6e38d6/25,transparent_70%)]" />

      {/* Subtle side accents - increased opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,#f5bad0/30,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,#A5B4FF/30,transparent_50%)]" />
    </div>
  )
}
