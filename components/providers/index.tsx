"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { PrivyProvider } from "@privy-io/react-auth";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { UserAuthContext } from "@/contexts/user-auth-context";
import { env } from "@/env";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <PrivyProvider appId={env.NEXT_PUBLIC_PRIVY_APP_ID}>
        <SDKProvider acceptCustomStyles debug>
          <UserAuthContext>
            {children}
            <Toaster />
          </UserAuthContext>
        </SDKProvider>
      </PrivyProvider>
    </ThemeProvider>
  );
}
