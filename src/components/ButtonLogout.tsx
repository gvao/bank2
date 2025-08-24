"use client"

import { authClient } from "../lib/auth-client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"


export const ButtonLogout = () => {
    const router = useRouter()
    return (
        <Button
            className="cursor-pointer"
            variant={"destructive"}
            onClick={async () => {
                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            console.log("Sign out successful")
                            router.push("/login")
                        }
                    }, 
                })
            }}
        >
            Logout
        </Button>
    )
}