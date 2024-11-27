import { getUser } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/db"
import { eq } from "drizzle-orm"
import { profiles } from "@/lib/db/schemas"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default async function ProfilePage() {
  const user = await getUser()
  if (!user?.email) redirect("/login")

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  })

  if (!profile?.onboarding_completed) redirect("/welcome/profile")

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="font-semibold text-2xl">Profile Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Voice Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Voice Settings</h3>
                <Badge variant="outline" className="bg-brand-primary/5">
                  Coming Soon
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Customize voice tone, speed, and accent
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">Theme</h3>
              <p className="text-muted-foreground text-sm">
                Choose your preferred theme
              </p>
            </div>
            <ThemeToggle />
          </div>
          <Separator />
          <div className="space-y-1">
            <h3 className="font-medium">Account</h3>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personality Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">AI Personality</h3>
                <Badge variant="outline" className="bg-brand-primary/5">
                  Coming Soon
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Adjust how your AI companion interacts with you
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
