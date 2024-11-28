import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"
import { constructMetadata } from "@/lib/config/metadata"

export const metadata = constructMetadata({
  title: "EmotiSync",
  description:
    "Your AI voice companion for emotional wellbeing and natural conversations.",
})

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
