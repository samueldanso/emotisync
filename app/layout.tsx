import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { Outfit, Urbanist } from "next/font/google";
import { constructMetadata } from "@/lib/config/metadata";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { isTelegramWebApp } from "@/lib/utils/platform";

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

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable}${urbanist.variable}`}
    >
      <body>
        {isTelegramWebApp() ? (
          <SDKProvider acceptCustomStyles debug>
            <Providers>{children}</Providers>
          </SDKProvider>
        ) : (
          <Providers>{children}</Providers>
        )}
      </body>
    </html>
  );
}
