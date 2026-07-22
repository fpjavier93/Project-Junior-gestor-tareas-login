import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CheckSquare2, CircleAlert, CircleCheck } from "lucide-react"
import { signIn } from "../services"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../schemas/loginSchema"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(loginSchema) })

    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    async function onSubmit(data) {
        setError("")
        setSuccessMessage("")
        try {
            const result = await signIn(data.email, data.password)
            if (result.success) {
                setSuccessMessage(result.message)
                navigate("/dashboard", { replace: true })
            } else {
                setError(result.error || "Error al iniciar sesión")
            }
        } catch {
            setError("Error inesperado al iniciar sesión")
        }
    }

    return (
        <main className="relative flex items-center justify-center w-full min-h-screen p-4 overflow-hidden bg-background">

            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none opacity-40"
                style={{ backgroundImage: `url('/login-bg.jpg')` }}
            />

            <Card className="relative z-10 w-full max-w-md border shadow-2xl bg-orange border-white/20">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center mx-auto mb-2 rounded-lg size-11 bg-primary text-primary-foreground">
                        <CheckSquare2 className="size-6" />
                    </div>
                    <CardTitle className="text-xl">Inicia sesión en TaskFlow</CardTitle>
                    <CardDescription>Accede a tus tareas y proyectos.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-5 space-y-3">
                        {error && (
                            <Alert variant="destructive" role="alert">
                                <CircleAlert />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {successMessage && (
                            <Alert role="status">
                                <CircleCheck />
                                <AlertDescription>{successMessage}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                    <form id="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field data-invalid={Boolean(errors.email)}>
                                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                                <Input className={"border border-gray-500"} id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} disabled={isSubmitting} {...register("email")} />
                                <FieldError errors={[errors.email]} />
                            </Field>
                            <Field data-invalid={Boolean(errors.password)}>
                                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                                <Input className={"border border-gray-500"} id="password" type="password" autoComplete="current-password" aria-invalid={Boolean(errors.password)} disabled={isSubmitting} {...register("password")} />
                                <FieldError errors={[errors.password]} />
                            </Field>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-sm bg-transparent text-muted-foreground border-t-white/10">
                    ¿No tienes una cuenta?{" "}
                    <Button variant="link" asChild className="px-1"><Link to="/register">Regístrate</Link></Button>
                </CardFooter>
            </Card>
        </main>
    )
}