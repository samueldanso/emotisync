import type { Metadata } from "next"
import "@/styles/globals.css"
import Providers from "@/components/providers"
import { Outfit, Lexend } from "next/font/google"
import { cn } from "@/lib/utils/client"
import { TelegramAuthProvider } from "@/context/telegram-auth"
import { SDKProvider } from "@telegram-apps/sdk-react"
import PrivyWalletProvider from "@/context/privy-provider"

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
  title: {
    default: "EmotiSync — Your AI voice companion for emotional well-being",
    template: "%s — EmotiSync",
  },
  description:
    "EmotiSync is your intelligent voice companion for emotional well-being and journaling. Skip writing, just talk naturally. Your AI companion transforms your daily voice conversations into personalized insights and recommendations, helping you find clarity and growth in minutes.",
  openGraph: {
    title: "EmotiSync — AI Voice Companion",
    description:
      "Your intelligent voice companion for mood journaling and reflections.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmotiSync — AI Voice Companion",
    description: "Your intelligent voice companion for emotional well-being.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(outfit.variable, lexend.variable)}>
        <SDKProvider acceptCustomStyles debug>
          <Providers>
            <TelegramAuthProvider>
              <PrivyWalletProvider>{children}</PrivyWalletProvider>
            </TelegramAuthProvider>
          </Providers>
        </SDKProvider>
      </body>
    </html>
  )
}
