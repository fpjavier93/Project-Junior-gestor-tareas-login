import { useNavigate } from "react-router-dom"
import { Palette } from "lucide-react"
import { Blue, White } from "../../../components/Buttons"
import { useProject } from "../hooks/useProjects"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export function CreateProjectPage() {
    const navigate = useNavigate()
    const { handleSubmitCreateProjectForm, loading } = useProject()

    if (loading) return <LoadingSpinner />

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
            <Card>
                <CardHeader className="border-b">
                    <CardTitle className="text-xl">Crear proyecto</CardTitle>
                    <CardDescription>Organiza tus tareas dentro de un espacio de trabajo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitCreateProjectForm}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Nombre del proyecto</FieldLabel>
                                <Input id="name" name="name" type="text" required placeholder="Ej: Curso React" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">Descripción</FieldLabel>
                                <Textarea id="description" name="description" rows={5} placeholder="Describe brevemente el objetivo del proyecto" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="color">Marcador de color</FieldLabel>
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg border bg-muted"><Palette className="size-4 text-muted-foreground" /></div>
                                    <Input id="color" name="color" type="color" defaultValue="#6366f1" className="h-10 w-16 cursor-pointer p-1" />
                                </div>
                                <FieldDescription>Este color identificará el proyecto en la lista.</FieldDescription>
                            </Field>
                            <Separator />
                            <div className="flex justify-end gap-2">
                                <White type="button" name="Cancelar" onClick={() => navigate("/dashboard/project-page")} />
                                <Blue type="submit" name="Crear proyecto" />
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}