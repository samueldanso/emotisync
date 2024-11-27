import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Login",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (user) redirect("/app/chat");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background px-4 py-16">
      <div className="w-full max-w-[420px]">{children}</div>
    </div>
  );
}
