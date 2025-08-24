import { HomeIcon } from "lucide-react"
import { ButtonToggleTheme } from "./ButtonToggleTheme"
import { ButtonLogout } from "./ButtonLogout"
import Link from "next/link"
import { auth } from "../auth/better-auth"
import { headers } from "next/headers"

export async function Header() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <header className="flex justify-between items-center py-2 px-4" >
            <Link href="/" className="cursor-pointer">
                <HomeIcon />
            </Link>

            <div className="space-x-2" >
                {session && <ButtonLogout />}
                <ButtonToggleTheme />
            </div>
        </header>
    )
}

