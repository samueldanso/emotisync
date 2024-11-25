"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/icons/spinner"
import { supabaseClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Icons } from "@/components/icons/icon-index"

export function AuthForm() {
  const [isPending, startTransition] = React.useTransition()

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
        <h2 className="mt-8 text-center font-heading text-2xl text-foreground/90">
          Welcome to EmotiSync AI
        </h2>
        <h1 className="mt-4 text-center font-sans text-foreground/70 text-lg">
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
