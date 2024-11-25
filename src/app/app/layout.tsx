import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { profiles, users } from "@/lib/db/schemas";
import { AppHeader } from "@/components/global/app-header";
import { AppSidebar } from "@/components/global/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseUser = await getUser();
  if (!supabaseUser) redirect("/login");

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, supabaseUser.id),
  });
  if (!dbUser) redirect("/login");

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, dbUser.id),
  });
  if (!profile) redirect("/welcome/profile");

  return (
    <div className="relative min-h-screen bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6842d8]/5 via-[#9064d5]/5 to-[#f4b1c8]/5" />

      {/* Header */}
      <AppHeader user={dbUser} profile={profile} />

      {/* Main Content */}
      <main className="relative mx-auto max-w-5xl px-4 pt-24 pb-20 md:px-8 md:pl-32">
        {children}
      </main>

      {/* Navigation */}
      <AppSidebar />
    </div>
  );
}
