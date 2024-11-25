export function AppMeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full">
      {/* Primary gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* Brand accent gradients */}
      <div
        className="-translate-x-1/2 absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/10 opacity-20 blur-3xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(89, 73, 255, 0.07) 0%, rgba(89, 73, 255, 0) 100%)",
        }}
      />

      {/* Subtle mesh effect */}
      <div
        className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-primary/5 opacity-20 blur-3xl"
        style={{
          background:
            "linear-gradient(45deg, rgba(89, 73, 255, 0.05) 0%, rgba(131, 123, 199, 0.05) 100%)",
        }}
      />

      {/* Background noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />
    </div>
  )
}
