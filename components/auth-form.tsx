"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export function AuthForm() {
  const [isPending, startTransition] = React.useTransition();

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
      });
    });
  };

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
          Welcome to EmotiSync
        </h2>
        <h1 className="mt-4 text-center font-sans text-foreground/80 text-lg">
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
          {isPending ? (
            <Spinner className="mr-2 h-4 w-4" />
          ) : (
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          )}
          Continue with Google
        </Button>
      </div>

      <div className="space-y-6">
        <p className="mx-auto max-w-sm text-center text-muted-foreground text-xs leading-relaxed">
          By continuing with Google, you acknowledge that you have read and
          agree to our{" "}
          <Link
            href="/terms"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
