"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWindow } from "@/hooks/use-window";
import { SIDEBAR_ITEMS } from "@/lib/constants/menus";

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile } = useWindow();

  return (
    <nav
      className={cn(
        "fixed z-40 transition-all duration-300",
        // Mobile: Bottom navigation
        isMobile && "inset-x-0 bottom-0 flex justify-center",
        // Desktop: Side navigation - centered vertically
        !isMobile &&
          "left-8 top-1/2 -translate-y-1/2 flex w-16 flex-col items-center"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-6",
          // Mobile: Horizontal layout
          isMobile && "h-16 w-full max-w-md justify-around px-4",
          // Desktop: Vertical layout
          !isMobile && "flex-col"
        )}
      >
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center p-2 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="mt-1 text-xs">{item.label}</span>
              {item.badge && (
                <span className="absolute -right-1 -top-1 rounded-full bg-primary/10 px-1.5 py-px text-[8px] text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
