import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/components/ui/card";

import { CreateUserForm } from "@/src/components/create-user-form";

export default function Signup() {
    return (
        <>
            <div className="bg-muted flex min-h-svh flex-col w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <SignupComponent />
                </div>
            </div>
        </>
    )
}

const SignupComponent = () => (
    <Card className="max-w-sm m-auto" >
        <CardHeader>
            <CardTitle className="text-2xl font-bold" >
                Signup
            </CardTitle>

            <CardDescription>
                Create a new account
            </CardDescription>
        </CardHeader>

        <CardContent >

            <CreateUserForm />

        </CardContent>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>

        <CardFooter className="text-center">
            <span className="m-auto " >Já tenho cadastro <Link href="/login" className="underline underline-offset-4" >entrar</Link></span>
        </CardFooter>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
        </div>
    </Card>
)