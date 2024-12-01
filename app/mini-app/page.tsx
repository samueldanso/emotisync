"use client";
import dynamic from "next/dynamic";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { CapxAuthProvider } from "./contexts/capx-auth";
import PrivyWalletProvider from "./contexts/privy-provider";
import { Spinner } from "@/components/ui/spinner";

// Dynamically import the real component with no SSR
const TelegramApp = dynamic(() => import("./telegram-app"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  ),
});

export default function Page() {
  return (
    <SDKProvider acceptCustomStyles debug>
      <CapxAuthProvider>
        <PrivyWalletProvider>
          <TelegramApp />
        </PrivyWalletProvider>
      </CapxAuthProvider>
    </SDKProvider>
  );
}
