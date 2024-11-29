import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import { constructMetadata } from "@/lib/config/metadata"

export const metadata = constructMetadata({
  title: "Login",
  path: "/login",
})

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  if (user) redirect("/chat")

  return <div className="min-h-screen">{children}</div>
}
