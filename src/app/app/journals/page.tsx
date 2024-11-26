import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";

export default async function JournalsPage() {
  // Keep auth check
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 font-semibold text-2xl">Journal Feature</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </div>
    </div>
  );
}
