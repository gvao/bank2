"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ComponentProps, useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemeProvider>) {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {setIsMounted(true)}, [])
    if (!isMounted) return null
    return (
        <NextThemeProvider {...props}>
            {children}
        </NextThemeProvider>
    )
}