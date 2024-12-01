"use client";

import { PrivyProvider, useWallets } from "@privy-io/react-auth";
import { defineChain } from "viem";
import { env } from "@/env";
import { useCapxAuth } from "./capx-auth";
import { useCallback, useEffect } from "react";
import { getTokens } from "@/lib/utils/cookies";
import { useXIDMinting } from "@/hooks/use-xid-minting";

// Keep chain configuration
const Capx = defineChain({
  id: Number(env.NEXT_PUBLIC_CAPX_CHAIN_ID),
  name: env.NEXT_PUBLIC_CAPX_CHAIN_NETWORK_NAME,
  network: env.NEXT_PUBLIC_CAPX_CHAIN_NETWORK_NAME,
  nativeCurrency: {
    decimals: 18,
    name: "ether",
    symbol: env.NEXT_PUBLIC_CAPX_CHAIN_CURRENCY,
  },
  rpcUrls: {
    default: {
      http: [env.NEXT_PUBLIC_CAPX_CHAIN_RPC_URL],
    },
    public: {
      http: [env.NEXT_PUBLIC_CAPX_CHAIN_RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: env.NEXT_PUBLIC_CAPX_CHAIN_EXPLORE_URL,
    },
  },
});

function PrivyWrapper({ children }: { children: React.ReactNode }) {
  const { user, txDetails } = useCapxAuth();
  const { wallets } = useWallets();
  const { mintXId } = useXIDMinting();

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    const attemptMinting = async () => {
      const userVersion = user?.version ?? 0;
      if (txDetails && userVersion < 3 && wallets.length > 0) {
        const success = await mintXId(txDetails);
        if (!success) {
          // Retry every 5 minutes as per requirements
          timer = setInterval(async () => {
            const retrySuccess = await mintXId(txDetails);
            if (retrySuccess) {
              clearInterval(timer);
            }
          }, 300000); // 5 minutes
        }
      }
    };

    void attemptMinting();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [txDetails, user?.version, wallets.length, mintXId]);

  return <>{children}</>;
}

export default function PrivyWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useCapxAuth();

  const getCustomToken = useCallback(async () => {
    if (!isAuthenticated) return undefined;
    const { accessToken } = getTokens();
    return accessToken || undefined;
  }, [isAuthenticated]);

  return (
    <PrivyProvider
      appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        supportedChains: [Capx],
        defaultChain: Capx,
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "/emotisync-icon.svg",
          showWalletLoginFirst: false,
        },
        customAuth: {
          enabled: isAuthenticated,
          isLoading: false,
          getCustomAccessToken: getCustomToken,
        },
      }}
    >
      <PrivyWrapper>{children}</PrivyWrapper>
    </PrivyProvider>
  );
}
