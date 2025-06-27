'use client'

import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { Computer, Moon, Sun } from "lucide-react"

export function ButtonToggleTheme() {

    const { setTheme, theme, themes, forcedTheme } = useTheme()
    const index = themes.findIndex((t) => t === theme)
    const nextTheme = themes[(index + 1) % themes.length]
    const icons: Record<string, React.FC> = {
        light: Sun,
        dark: Moon,
        system: Computer,
    }

    const NextIcon = icons[nextTheme]
    const toggleTheme = () => { setTheme(nextTheme) }
    return (
        <Button onClick={toggleTheme} size={"sm"} asChild>
            <div>
                {<NextIcon />}
                {nextTheme}
            </div>
        </Button>
    )
}