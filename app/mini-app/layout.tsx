"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function TelegramLayout({ children }: LayoutProps) {
  const pathname = usePathname();

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      if (pathname !== "/") {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
          window.history.back();
        });
      } else {
        tg.BackButton.hide();
      }
      return () => {
        tg.BackButton.offClick();
      };
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">{children}</main>
    </div>
  );
}
