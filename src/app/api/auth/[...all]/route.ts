import { getAuth } from "@/src/auth/better-auth"
import { toNextJsHandler } from "better-auth/next-js"

export const { GET, POST } = await (async () => {
    const auth = await getAuth();
    return toNextJsHandler(auth);
})()