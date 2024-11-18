import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { AppSidebar } from "./_components/sidebar";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { profiles } from "@/db/schemas";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user?.email) {
    redirect("/login");
  }

  // Check profile directly from database to ensure fresh data
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });

  if (!profile?.onboarding_completed) {
    redirect("/welcome/profile");
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex min-h-0 flex-1 pl-[260px]">
        <div className="container flex min-h-0 grow p-8">{children}</div>
      </main>
    </div>
  );
}
