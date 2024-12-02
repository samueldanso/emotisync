"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { supabaseClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { generateTypewriterKey } from "@/lib/utils/text"

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
    <div className="flex min-h-screen">
      {/* Left gradient section */}
      <div className="relative hidden w-1/2 bg-gradient-to-b from-brand-accent via-brand-primary to-brand-primary lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0%,_transparent_100%)]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center p-12">
          <motion.h1 className="text-center font-bold font-heading text-4xl text-white">
            {Array.from("Let's Talk").map((char, index) => (
              <motion.span
                key={generateTypewriterKey(char, index, "auth")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: index * 0.05,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="mt-4 text-center text-lg text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Your AI companion is waiting to chat with you
          </motion.p>
        </div>
      </div>

      {/* Right form section */}
      <div className="flex w-full items-center justify-center bg-brand-background px-4 py-16 lg:w-1/2">
        <div className="w-full max-w-[420px] space-y-8">
          {/* Rest of your auth form content stays the same */}
          <div className="flex flex-col items-center">
            <Image
              src="/emotisync-icon.svg"
              alt="EmotiSync"
              width={48}
              height={48}
              className="h-10 w-10"
              priority
            />
            <h1 className="mt-6 text-center font-heading text-3xl text-brand-foreground">
              EmotiSync
            </h1>
            <h2 className="mt-4 text-center font-sans text-2xl text-brand-foreground/70">
              Your personalized AI companion.
            </h2>
          </div>

          {/* Auth buttons */}
          <div className="flex flex-col items-center gap-6">
            <Button
              disabled={isPending}
              onClick={handleGoogleAuth}
              className="h-[52px] w-[340px] rounded-lg border border-zinc-300 bg-white font-medium text-zinc-700 hover:bg-zinc-50"
              variant="ghost"
            >
              {isPending ? (
                <Spinner className="mr-2 h-4 w-4" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  className={cn("mr-2 h-5 w-5", isPending && "animate-spin")}
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Continue with Google
            </Button>

            <div className="relative w-[340px]">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-zinc-300 border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-brand-background px-2 font-medium text-brand-muted">
                  or
                </span>
              </div>
            </div>

            <Button
              asChild
              variant="ghost"
              className="h-[52px] w-[340px] rounded-lg border border-zinc-300 bg-white font-medium text-zinc-700 hover:bg-zinc-50"
            >
              <a
                href="https://t.me/emotisync_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-5 w-5"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                Open Telegram Mini App
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
            <Link
              href="/terms"
              className="font-semibold text-brand-primary hover:opacity-90"
            >
              Terms of Service
            </Link>
            <span className="text-brand-muted">—</span>
            <Link
              href="/privacy"
              className="font-semibold text-brand-primary hover:opacity-90"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
