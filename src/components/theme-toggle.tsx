import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Toggle Theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span>Toggle Theme</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}