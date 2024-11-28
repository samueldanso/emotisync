"use client"

import { Toaster } from "sonner"
import { UserAuthContext } from "@/contexts/user-auth-context"
import { ThemeProvider } from "next-themes"

// Dynamically import providers
interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <UserAuthContext>
        {children}
        <Toaster />
      </UserAuthContext>
    </ThemeProvider>
  )
}

export default Providers
