"use client"

import { HomeIcon } from "lucide-react"
import { ButtonToggleTheme } from "./ButtonToggleTheme"

export function Header() {

    return (
        <header className="flex justify-between items-center py-2 px-4" >
            <HomeIcon/>
            <h1>Header</h1>
            <ButtonToggleTheme />
        </header>
    )
}

