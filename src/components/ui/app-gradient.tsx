"use client";

interface AppMeshGradientProps {
  className?: string;
}

export function AppMeshGradient({ className }: AppMeshGradientProps) {
  return (
    <div className={className}>
      <div className="fixed inset-0 bg-gradient-to-b from-background to-background/80" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-primary/20 via-background/0 to-background/0" />
    </div>
  );
}

// Radial gradient for chat
export function ChatRadialGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f5bad0/10,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffb4e1/5,transparent_50%)]" />
    </div>
  );
}
