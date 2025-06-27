import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup() {
    return (
        <>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <SignupComponent />
                </div>
            </div>
        </>
    )
}

const SignupComponent = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold" >
                Signup
            </CardTitle>

            <CardDescription>
                Create a new account
            </CardDescription>
        </CardHeader>

        <CardContent>

            <CardAction className="flex justify-between flex-col gap-4" >
                <div className="flex flex-col gap-3" >
                    <Label htmlFor="email">E-mail</Label>
                    <Input required type="email" name="email" placeholder="Seu e-mail" />
                </div>

                <div className="flex flex-col gap-3" >
                    <Label htmlFor="password">Password</Label>
                    <Input required type="password" name="password" />
                </div>

                <div className="flex gap-3 items-stretch" >
                    <Link href="/login" className={buttonVariants({ variant: "outline", className: "grow max-w-1/2" })} >Tenho cadastro</Link>
                    <Button type="button" className="grow max-w-1/2 cursor-pointer" >Cadastrar</Button>
                </div>

            </CardAction>

        </CardContent>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>

        <CardFooter className="text-center">
            <span className="m-auto " >Já tenho cadastro <Link href="/login" className="underline underline-offset-4" >entrar</Link></span>
        </CardFooter>
    </Card>
)