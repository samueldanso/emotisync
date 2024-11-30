import type { Chain } from "viem"

declare module "@privy-io/react-auth" {
  export interface WalletClient {
    walletClientType: string
    switchChain: (chainId: string | number) => Promise<void>
    getEthersProvider: () => Promise<any>
  }

  export interface PrivyInterface {
    authenticated: boolean
    user: {
      wallet?: any
    } | null
    createWallet: () => Promise<void>
  }

  export interface PrivyProviderProps {
    appId: string
    config: {
      supportedChains: Chain[]
      defaultChain: Chain
      appearance?: {
        theme?: "light" | "dark"
        accentColor?: string
        showWalletLoginFirst?: boolean
      }
      customAuth?: {
        enabled: boolean
        isLoading: boolean
        getCustomAccessToken: () => Promise<string | undefined>
      }
    }
    children: React.ReactNode
  }

  export function PrivyProvider(props: PrivyProviderProps): JSX.Element
  export function usePrivy(): PrivyInterface
  export function useWallets(): { wallets: WalletClient[] }
}

declare module "@telegram-apps/sdk-react" {
  export interface SDKError {
    code: string
    message: string
    details?: any
  }

  export interface SDKProviderProps {
    acceptCustomStyles?: boolean
    debug?: boolean
    onError?: (error: SDKError) => void
    children: React.ReactNode
  }

  export function SDKProvider(props: SDKProviderProps): JSX.Element
}
