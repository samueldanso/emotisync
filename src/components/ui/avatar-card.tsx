"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarCardProps {
  imageUrl: string;
  name: string;
  description?: string;
  className?: string;
}

export function AvatarCard({
  imageUrl,
  name,
  description,
  className,
}: AvatarCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-8 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <Image
          src={imageUrl}
          alt={name}
          width={140}
          height={140}
          className="mb-6 rounded-full shadow-lg ring-1 ring-primary/10"
          priority
        />
        <h2 className="mb-2 text-xl font-medium">{name}</h2>
        {description && (
          <p className="text-center text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
