"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import Link from "next/link";

import { buttonVariants, Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
})

type formType = z.infer<typeof formSchema>

export function CreateUserForm() {

    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { push } = useRouter()
    
    async function onSubmit(data: formType) {
        
        const result = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.email.split("@")[0],
        }, {
            onSuccess: (ctx) => {
                console.log(`on success: `, ctx)
                form.reset()
                toast.error("Erro ao criar usuario")
                toast(`Usuario criado com sucesso!`)
                push("/login?email=" + data.email + "&password=" + data.password + "&redirect=true")
            },
            onError: (ctx) => {
                console.log(`on error: `, ctx)
                toast.error("Erro ao criar usuario")
            },
        })
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between flex-col gap-4" >

                <FormField control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3" >
                            <FormLabel htmlFor="email">E-mail</FormLabel>
                            <FormControl>
                                <Input autoFocus required type="email" placeholder="Seu e-mail" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3" >
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                                <Input required type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-3 items-stretch" >
                    <Link href="/login" className={buttonVariants({ variant: "outline", className: "grow max-w-1/2" })} >Tenho cadastro</Link>
                    <Button type="submit" className="grow max-w-1/2 cursor-pointer" >Cadastrar</Button>
                </div>

            </form>
        </Form>
    )
}