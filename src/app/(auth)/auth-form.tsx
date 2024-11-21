"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Spinner } from "@/components/icons/spinner"
import { supabaseClient } from "@/lib/supabase/client"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function AuthForm() {
  const [isPending, startTransition] = React.useTransition()
  const pathname = usePathname()
  const isSignUp = pathname === "/signup"

  const headingText = isSignUp ? "Create your account" : "Log in to EmotiSync"

  const handleGoogleAuth = () => {
    startTransition(async () => {
      await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
            scopes: "email profile",
          },
        },
      })
    })
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center">
        <Image
          src="/emotisync-icon.svg"
          alt="EmotiSync"
          width={48}
          height={48}
          className="h-11 w-11"
          priority
        />
        <h2 className="mt-8 text-center font-semibold text-2xl text-foreground/90 tracking-tight">
          {headingText}
        </h2>
        <h1 className="mt-4 text-center font-medium text-foreground/70 text-lg tracking-tight">
          Your personalized AI companion.
        </h1>
      </div>

      <div className="flex justify-center">
        <Button
          disabled={isPending}
          onClick={handleGoogleAuth}
          className="h-[52px] w-[340px] rounded-lg font-medium text-base shadow-sm transition-shadow hover:shadow-md"
          variant="default"
        >
          {isPending ? <Spinner /> : <Icons.google className="mr-2 size-4" />}
          Continue with Google
        </Button>
      </div>
    </div>
  )
}
