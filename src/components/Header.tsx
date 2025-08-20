import { HomeIcon } from "lucide-react"
import { ButtonToggleTheme } from "./ButtonToggleTheme"
import { ButtonLogout } from "./ButtonLogout"
import Link from "next/link"
import { authClient } from "../lib/auth-client"

export async function Header() {
    const { data, error } = await authClient.getSession()
    if(error) return null
    const session = data?.session
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

