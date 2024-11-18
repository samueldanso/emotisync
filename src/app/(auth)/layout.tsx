import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background px-4 py-16">
      <div className="w-full max-w-[420px]">{children}</div>
    </div>
  );
}
