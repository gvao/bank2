"use client"

import { authClient } from "../lib/auth-client"
import { Button } from "./ui/button"

export const ButtonLogout = () => {
    return (
        <Button
            className="cursor-pointer"
            variant={"destructive"}
            onClick={async () => {
                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => console.log("Sign out successful")
                    }
                })
            }}
        >
            Logout
        </Button>
    )
}