"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./button";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="default"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("w-full justify-start gap-3", className)}
    >
      {isDark ? (
        <>
          <Moon className="h-5 w-5" />
          <span>Dark</span>
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          <span>Light</span>
        </>
      )}
    </Button>
  );
}
