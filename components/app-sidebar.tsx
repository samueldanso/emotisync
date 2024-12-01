"use client";

import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { SIDEBAR_ITEMS } from "@/lib/constants/app";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <SidebarTrigger />
      <Sidebar>
        <SidebarHeader>
          <div className="flex h-16 items-center px-6">
            <Logo className="h-6 w-6" />
            <span className="ml-2 font-semibold">EmotiSync</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {SIDEBAR_ITEMS.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <a className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
