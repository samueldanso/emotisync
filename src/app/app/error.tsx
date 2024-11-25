"use client";

import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/utils/errors";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 font-semibold text-2xl">Something went wrong!</h2>
        <p className="mb-4 text-muted-foreground">{getErrorMessage(error)}</p>
        <Button onClick={() => reset()} type="button">
          Try again
        </Button>
      </div>
    </div>
  );
}
