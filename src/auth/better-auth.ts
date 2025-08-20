import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import client from "../lib/mongodb"
import { nextCookies } from "better-auth/next-js"

export const auth = betterAuth({
    database: mongodbAdapter(client.db()),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {},
    plugins: [nextCookies()]
})