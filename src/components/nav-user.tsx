"use client"

import {
  IconLogout,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar"

import { SidebarMenu, SidebarMenuItem } from "./ui/sidebar"
import { User } from "./types/user.interface"
import { Button } from "./ui/button"

export function NavUser({ user }: { user: User | null }) {
  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem className="p-4 space-y-2" >

        <Button
          className="w-full"
          variant="ghost"
          size="icon"
        >
          <div className="flex items-start gap-4 w-full px-2" >
            <IconLogout />
            Log out
          </div>
        </Button>

        <div className="flex items-center gap-2" >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={user.image!} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
        </div>

      </SidebarMenuItem>
    </SidebarMenu>
  )
}
