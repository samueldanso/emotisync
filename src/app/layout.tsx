import type { Metadata } from "next"
import "@/styles/globals.css"
import Providers from "@/components/providers"
import { Outfit, Lexend } from "next/font/google"
import { cn } from "@/lib/utils"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
})

export const metadata: Metadata = {
  title: "EmotiSync — Your AI voice mood journal for emotional well-being",
  description:
    "EmotiSync is your intelligent voice companion for mood journaling and reflections. Simply talk, and AI instantly analyzes your feelings to offer personalized insights and actionable recommendations that enhance your well-being.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased",
          outfit.variable,
          lexend.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
