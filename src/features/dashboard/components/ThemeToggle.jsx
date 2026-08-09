import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const isDarkMode = theme === "dark"


    function handleThemeChange(checked) {
        setTheme(checked ? "dark" : "light")
    }

    return (
        <div className="flex items-center gap-2">
            <Sun
                className="size-4 text-muted-foreground"
                aria-hidden="true"
            />

            <Switch
                checked={isDarkMode}
                onCheckedChange={handleThemeChange}
                aria-label="Activar modo oscuro"
            />

            <Moon
                className="size-4 text-muted-foreground"
                aria-hidden="true"
            />
        </div>
    )



}