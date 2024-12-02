"use client"

import dynamic from "next/dynamic"
import type { Profile } from "@/lib/db/schemas/profiles"
import type { Companion } from "@/lib/db/schemas/companions"
import type { User } from "@/lib/db/schemas/users"

interface ChatProps {
  user: User
  profile: Profile
  avatar: Companion
}

const Chat = dynamic<ChatProps>(() => import("@/components/chat"), {
  ssr: false,
})

export function ClientChat({ user, profile, avatar }: ChatProps) {
  return <Chat user={user} profile={profile} avatar={avatar} />
}
