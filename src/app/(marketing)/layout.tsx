import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"

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
