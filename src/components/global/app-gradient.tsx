"use client";

// Only keep the chat gradient
export function ChatRadialGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f5bad0/10,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffb4e1/5,transparent_50%)]" />
    </div>
  );
}
