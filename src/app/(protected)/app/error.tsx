"use client";

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
        <p className="mb-4 text-muted-foreground">{error.message}</p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-primary px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
