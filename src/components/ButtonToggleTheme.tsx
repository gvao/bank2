'use client'

import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { useTheme } from "next-themes"
import { Computer, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ButtonToggleTheme() {
    const { setTheme, themes, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    if (!mounted) return null
    const icons: { [k: typeof themes[number]]: React.FC } = {
        light: Sun,
        dark: Moon,
        system: Computer,
    }
    const index = themes.findIndex((t) => t === resolvedTheme)
    const nextTheme = themes[(index + 1) % themes.length]

    const NextIcon = icons[nextTheme]
    const toggleTheme = () => { setTheme(nextTheme) }
    return (
        <Tooltip>

            <TooltipTrigger>
                <Button onClick={toggleTheme} size={"icon"} className="p-2 cursor-pointer" asChild>
                    <NextIcon />
                </Button>
            </TooltipTrigger>

            <TooltipContent>
                {nextTheme}
            </TooltipContent>

        </Tooltip>
    )
}