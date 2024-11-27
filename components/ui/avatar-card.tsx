"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarCardProps {
  imageUrl: string
  name: string
  description: string
  className?: string
}

export function AvatarCard({
  imageUrl,
  name,
  description,
  className,
}: AvatarCardProps) {
  return (
    <div className={cn("relative rounded-lg bg-card p-6", className)}>
      <div className="flex flex-col items-center">
        <div className="relative h-32 w-32 overflow-hidden rounded-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <h3 className="mt-4 font-medium">{name}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  )
}
