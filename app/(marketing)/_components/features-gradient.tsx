export function FeaturesGradient() {
  return (
    <div className="-top-32 pointer-events-none absolute inset-0">
      {/* Main smooth gradient - toned down */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A5B4FF]/30 via-[#C5B6FF]/30 to-[#F0E6FF]/45" />

      {/* Purple accent - more subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,#6e38d6/40,transparent_70%)]" />

      {/* Rose pink accent - softer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#f5bad0/50,transparent_8%)]" />

      {/* Even subtler noise */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  )
}
