import "@/styles/globals.css";
import Providers from "@/components/providers";
import { Outfit, Urbanist } from "next/font/google";
import { cn } from "@/lib/utils";
import { getSEOTags } from "@/lib/utils/seo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata = getSEOTags({
  title: "EmotiSync - Your AI voice companion for emotional well-being.",
  description:
    "Skip writing, just talk naturally. Your AI companion transforms your daily voice conversations into personalized insights and recommendations, helping you find clarity and growth in minutes.",
  canonicalUrlRelative: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          outfit.variable,
          urbanist.variable
        )}
      >
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
