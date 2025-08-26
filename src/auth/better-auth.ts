import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import clientPromise from "@/src/lib/mongodb"
import { nextCookies } from "better-auth/next-js"

export const getAuth = async () => {
    const dbName = process.env.MONGODB_DB_NAME
    const client = await clientPromise
    const db = client.db(dbName)
    return betterAuth({
        database: mongodbAdapter(db),
        emailAndPassword: {
            enabled: true,
        },
        socialProviders: {},
        plugins: [nextCookies()]
    })
}