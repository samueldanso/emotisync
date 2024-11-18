import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login — EmotiSync",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background px-4 py-16">
      <div className="w-full max-w-[420px]">{children}</div>
    </div>
  )
}
