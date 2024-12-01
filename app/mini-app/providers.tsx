"use client";

import { SDKProvider } from "@telegram-apps/sdk-react";
import { CapxAuthProvider } from "./contexts/capx-auth";
import PrivyWalletProvider from "./contexts/privy-provider";

export function MiniAppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SDKProvider acceptCustomStyles debug>
      <CapxAuthProvider>
        <PrivyWalletProvider>{children}</PrivyWalletProvider>
      </CapxAuthProvider>
    </SDKProvider>
  );
}
