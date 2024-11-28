"use client"

export function CallGradient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-50"
      style={{
        background: `
          radial-gradient(
            circle at center,
            hsl(var(--brand-primary)) 0%,
            transparent 70%
          )
        `,
        animation: "pulse 4s ease-in-out infinite",
      }}
    />
  )
}
