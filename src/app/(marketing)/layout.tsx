import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { getSEOTags } from "@/lib/utils/seo";

export const metadata = getSEOTags({
  title: "EmotiSync",
  description:
    "Your AI voice companion for emotional well-being and natural conversations.",
  canonicalUrlRelative: "/",
});

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
