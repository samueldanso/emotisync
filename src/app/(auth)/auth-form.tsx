"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Spinner } from "@/components/icons/spinner"
import { supabaseClient } from "@/lib/supabase/client"
import { Logo } from "@/components/ui/logo"
import type { User } from "@supabase/supabase-js"

interface AuthFormProps {
  user?: User | null
}

export function AuthForm({ user: _user }: AuthFormProps) {
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
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <h1 className="text-center font-semibold text-3xl text-foreground/95 tracking-tight">
          Your personalized AI <br />
          mood companion.
        </h1>
      </div>

      <Button
        disabled={isPending}
        onClick={handleGoogleAuth}
        className="h-14 w-full rounded-xl text-base"
      >
        {isPending ? <Spinner /> : <Icons.google className="mr-2 size-5" />}
        Continue with Google
      </Button>
    </div>
  )
}
