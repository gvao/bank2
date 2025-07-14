import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUserByEmail } from '../(core)';

const publicRoutes = [
    { path: "/login", action: "redirect" },
    { path: "/signup", action: "redirect" },
    { path: "/logout", action: "redirect" }
] as const

export const authConfig = {
    pages: {
        signIn: '/login',
        newUser: '/signup',
        signOut: '/logout',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        authorized: ({ auth, request: { nextUrl } }) => {
            const isLoggedIn = !!auth?.user;
            const publicRoutePath = publicRoutes.find(route => route.path === nextUrl.pathname);
            const isPrivateRoute = !publicRoutePath

            if (isPrivateRoute) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }

            if (isLoggedIn && publicRoutePath?.action === "redirect") {
                return Response.redirect(new URL('/', nextUrl));
            }

            return true;
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(3) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;
                const { email, password } = parsedCredentials.data;
                const { errors, data: user } = await getUserByEmail.execute({ email });
                if (errors.length > 0 || !user) return null
                if (user && user.password !== password) return null;
                return {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                };
            }
        })
    ],
} satisfies NextAuthConfig