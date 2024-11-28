"use client"
import { SIDEBAR_ITEMS } from "@/lib/constants/menus"
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarTrigger />
      <SidebarContent>
        {/* Logo section */}
        <div className="flex items-center gap-2 p-4">
          <Image
            src="/emotisync-icon.svg"
            alt="EmotiSync"
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="font-heading font-semibold text-lg">EmotiSync</span>
        </div>

        {/* Menu items */}
        <SidebarMenu>
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton disabled={item.disabled}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className="ml-auto bg-brand-primary/5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
