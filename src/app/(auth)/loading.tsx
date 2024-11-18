"use client";

import { Spinner } from "@/components/icons/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Spinner className="h-10 w-10" />
    </div>
  );
}
