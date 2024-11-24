"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU } from "@/lib/constants/menus";
import { Logo } from "@/components/ui/logo";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col space-y-4">
      <div className="px-6 py-4">
        <Logo />
      </div>

      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {SIDEBAR_MENU.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary",
                pathname === route.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <div className="flex items-center">
                <route.icon className="mr-3 h-5 w-5" />
                {route.title}
              </div>
              {route.badge && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {route.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="fixed top-4 left-4 z-40 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed hidden h-full w-[280px] border-r bg-background lg:block">
        <SidebarContent />
      </div>
    </>
  );
}
