import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { CheckSquare2 } from "lucide-react"
import { signUp } from "../services"
import ErrorMessage from "../../../components/ErrorMessage"
import { useForm } from "react-hook-form"
import { registerSchema } from "../schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(registerSchema), mode: "onChange" })

    const navigate = useNavigate()
    const [error, setError] = useState(false)

    async function onSubmit(data) {
        try {
            const response = await signUp(data)
            if (response.success) {
                navigate("/")
                return
            }
            setError(true)
        } catch {
            setError(true)
        }
    }

    if (error) {
        return <ErrorMessage error="No se logró completar el registro" onTryAgain={() => setError(false)} />
    }

    const fields = [
        { name: "nombre", label: "Nombre(s)", type: "text", autoComplete: "given-name" },
        { name: "apellidos", label: "Apellidos", type: "text", autoComplete: "family-name" },
        { name: "email", label: "Correo electrónico", type: "email", autoComplete: "email" },
        { name: "empresa", label: "Empresa", type: "text", autoComplete: "organization" },
        { name: "password", label: "Contraseña", type: "password", autoComplete: "new-password" },
        { name: "confirmPassword", label: "Confirmar contraseña", type: "password", autoComplete: "new-password" },
    ]

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
                    <CardTitle className="text-xl">Crea tu cuenta</CardTitle>
                    <CardDescription>Empieza a organizar tus tareas y proyectos.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="register-form" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="grid gap-5 sm:grid-cols-2">
                            {fields.map((field) => (
                                <Field key={field.name} data-invalid={Boolean(errors[field.name])} className={field.name === "email" || field.name === "empresa" ? "sm:col-span-2" : ""}>
                                    <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                                    <Input id={field.name} type={field.type} autoComplete={field.autoComplete} aria-invalid={Boolean(errors[field.name])} disabled={isSubmitting} {...register(field.name)} />
                                    <FieldError errors={[errors[field.name]]} />
                                </Field>
                            ))}
                            <Button type="submit" className="w-full sm:col-span-2" disabled={isSubmitting}>
                                {isSubmitting ? "Registrando..." : "Crear cuenta"}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-sm text-muted-foreground">
                    ¿Ya tienes una cuenta?{" "}
                    <Button variant="link" asChild className="px-1"><Link to="/">Inicia sesión</Link></Button>
                </CardFooter>
            </Card>
        </main>
    )
}