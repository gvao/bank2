"use client"
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

export const ButtonLogout = () => {
    const session = useSession()
    if (session.status !== "authenticated") return null
    return (
        <Button
            className="cursor-pointer"
            variant={"destructive"}
            onClick={async () => { await signOut({ redirectTo: "/login" }) }}
        >
            Logout
        </Button>
    )
}