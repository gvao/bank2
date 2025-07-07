import { HomeIcon } from "lucide-react"
import { ButtonToggleTheme } from "./ButtonToggleTheme"
import { ButtonLogout } from "./ButtonLogout"
import Link from "next/link"

export function Header() {

    return (
        <header className="flex justify-between items-center py-2 px-4" >
            <Link href="/" className="cursor-pointer">
                <HomeIcon />
            </Link>

            <div className="space-x-2" >
                <ButtonLogout />
                <ButtonToggleTheme />
            </div>
        </header>
    )
}

