import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2 rounded-lg border p-3 shadow-sm">
      <div className="space-y-0.5">
        <h2 className="font-bold">Theme</h2>
        <span className="text-sm text-muted-foreground">
          Switch between light and dark theme
        </span>
      </div>
      <div className="flex gap-2 items-center justify-end flex-1">
        {theme === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        )}
        <Switch
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </div>
    </div>
  );
}
