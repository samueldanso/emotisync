import "@/styles/globals.css"
import { Providers } from "@/components/providers"
import { Outfit, Urbanist } from "next/font/google"
import { cn } from "@/lib/utils"
import { constructMetadata } from "@/lib/config/metadata"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
})

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          outfit.variable,
          urbanist.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
