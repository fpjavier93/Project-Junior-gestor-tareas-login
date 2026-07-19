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
        <main className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-10">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-2 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
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
                                <Input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} disabled={isSubmitting} {...register("email")} />
                                <FieldError errors={[errors.email]} />
                            </Field>
                            <Field data-invalid={Boolean(errors.password)}>
                                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                                <Input id="password" type="password" autoComplete="current-password" aria-invalid={Boolean(errors.password)} disabled={isSubmitting} {...register("password")} />
                                <FieldError errors={[errors.password]} />
                            </Field>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-sm text-muted-foreground">
                    ¿No tienes una cuenta?{" "}
                    <Button variant="link" asChild className="px-1"><Link to="/register">Regístrate</Link></Button>
                </CardFooter>
            </Card>
        </main>
    )
}