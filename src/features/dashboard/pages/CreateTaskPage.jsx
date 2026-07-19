import { useNavigate } from "react-router-dom"
import { CalendarDays, ImagePlus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Blue, White } from "../../../components/Buttons"
import ErrorMessage from "../../../components/ErrorMessage"
import { useTasks } from "../hooks/useTasks"
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes"
import { ImagePickerDialog } from "../components/ImagePickerDialog"
import { useGetImageTask } from "../hooks/useGetImageTask"
import { useState, useEffect } from "react"
import { ProjectSelect } from "../components/ProjectSelect"
import { useProject } from "../hooks/useProjects"
import { taskSchema } from "../schemas/taskSchema"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function CreateTaskPage() {
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(taskSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
            task_type: "study",
            project_id: "",
            has_due_date: false,
            due_date: "",
            image_url: "",
        },
    })

    const hasDueDate = watch("has_due_date")
    const navigate = useNavigate()
    const today = new Date().toISOString().split("T")[0]
    const [selectedImage, setSelectedImage] = useState("")
    const { project, handleProjects } = useProject()
    const { handleSubmitCreateTaskForm, submitError, setError, error } = useTasks()
    const { isShowSelectTask, openGetImageDialog, closeGetImageDialog } = useGetImageTask()
    const errorCreateTask = { [TASK_ERROR_TYPES.CREATE]: "No se pudo crear la tarea" }

    useEffect(() => {
        handleProjects()
    }, [])

    if (error.status) {
        return (
            <ErrorMessage
                error={errorCreateTask[error.type] || "Acción inesperada"}
                onTryAgain={() => setError({ status: false, type: 0 })}
                onCancel={() => navigate("/dashboard")}
            />
        )
    }

    return (
        <main className="w-full max-w-4xl px-4 py-8 mx-auto">
            <Card>
                <CardHeader className="border-b">
                    <CardTitle className="text-xl">Crear tarea</CardTitle>
                    <CardDescription>Define el trabajo, su prioridad y la fecha límite opcional.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        id="create-task-form"
                        noValidate
                        onSubmit={handleSubmit((data) => handleSubmitCreateTaskForm(data, setSelectedImage, reset))}
                    >
                        <FieldGroup>
                            <Field data-invalid={Boolean(errors.title)}>
                                <FieldLabel htmlFor="title">Título</FieldLabel>
                                <Input id="title" type="text" aria-invalid={Boolean(errors.title)} {...register("title")} />
                                <FieldError errors={[errors.title]} />
                            </Field>

                            <Field data-invalid={Boolean(errors.description)}>
                                <FieldLabel htmlFor="description">Descripción</FieldLabel>
                                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem]">
                                    <Textarea id="description" rows={6} aria-invalid={Boolean(errors.description)} {...register("description")} />
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Imagen seleccionada para la tarea" className="object-cover w-full rounded-lg aspect-square" />
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex flex-col items-center justify-center w-full gap-2 text-sm transition-colors border border-dashed rounded-lg aspect-square text-muted-foreground hover:bg-muted"
                                            onClick={openGetImageDialog}
                                        >
                                            <ImagePlus className="size-6" />
                                            Añadir imagen
                                        </Button>
                                    )}
                                </div>
                                <input type="hidden" {...register("image_url")} />
                                <FieldError errors={[errors.description]} />
                            </Field>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <FieldSet data-invalid={fieldState.invalid}>
                                            <FieldLegend variant="label">Prioridad</FieldLegend>
                                            <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-3 gap-2">
                                                {[
                                                    { value: "low", label: "Baja" },
                                                    { value: "medium", label: "Media" },
                                                    { value: "high", label: "Alta" },
                                                ].map((option) => (
                                                    <Label key={option.value} htmlFor={"priority-" + option.value} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer has-data-checked:border-primary has-data-checked:bg-primary/5">
                                                        <RadioGroupItem id={"priority-" + option.value} value={option.value} />
                                                        {option.label}
                                                    </Label>
                                                ))}
                                            </RadioGroup>
                                            <FieldError errors={[fieldState.error]} />
                                        </FieldSet>
                                    )}
                                />

                                <Field data-invalid={Boolean(errors.task_type)}>
                                    <FieldLabel htmlFor="task_type">Tipo de tarea</FieldLabel>
                                    <Controller
                                        name="task_type"
                                        control={control}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger id="task_type" className="w-full" aria-invalid={Boolean(errors.task_type)}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent
                                                    position="popper"
                                                    side="bottom"
                                                    align="start"
                                                    sideOffset={4}>
                                                    <SelectItem value="study">Estudio</SelectItem>
                                                    <SelectItem value="work">Trabajo</SelectItem>
                                                    <SelectItem value="personal">Personal</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <FieldError errors={[errors.task_type]} />
                                </Field>
                            </div>

                            <Controller
                                name="has_due_date"
                                control={control}
                                render={({ field }) => (
                                    <Field orientation="horizontal">
                                        <Checkbox
                                            id="has_due_date"
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                const isChecked = checked === true
                                                field.onChange(isChecked)
                                                setValue("due_date", isChecked ? today : "", { shouldValidate: true })
                                            }}
                                        />
                                        <FieldContent>
                                            <FieldLabel htmlFor="has_due_date">Establecer fecha límite</FieldLabel>
                                            <FieldDescription>Activa esta opción para indicar cuándo debe completarse.</FieldDescription>
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Field data-invalid={Boolean(errors.due_date)} data-disabled={!hasDueDate}>
                                <FieldLabel htmlFor="due_date">Fecha límite</FieldLabel>
                                <div className="relative">
                                    <CalendarDays className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input id="due_date" className="pl-8" type="date" min={today} disabled={!hasDueDate} aria-invalid={Boolean(errors.due_date)} {...register("due_date")} />
                                </div>
                                <FieldError errors={[errors.due_date]} />
                            </Field>

                            <Field data-invalid={Boolean(errors.project_id)}>
                                <FieldLabel htmlFor="project_id">Proyecto</FieldLabel>
                                <Controller
                                    name="project_id"
                                    control={control}
                                    render={({ field }) => (
                                        <ProjectSelect projects={project} value={field.value} onValueChange={field.onChange} disabled={isSubmitting} />
                                    )}
                                />
                                <FieldDescription>La tarea puede quedar sin proyecto.</FieldDescription>
                                <FieldError errors={[errors.project_id]} />
                            </Field>

                            {submitError && (
                                <Alert variant="destructive" role="alert">
                                    <AlertDescription>{submitError}</AlertDescription>
                                </Alert>
                            )}

                            <Separator />

                            <div className="flex flex-wrap justify-end gap-2">
                                <White type="button" name="Cancelar" onClick={() => navigate("/dashboard")} />
                                <Button type="button" variant="outline" onClick={openGetImageDialog}>
                                    <ImagePlus />
                                    {selectedImage ? "Cambiar imagen" : "Añadir imagen"}
                                </Button>
                                <Blue disabled={isSubmitting} name={isSubmitting ? "Creando..." : "Crear tarea"} type="submit" />
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            <ImagePickerDialog
                isOpen={isShowSelectTask}
                onClose={closeGetImageDialog}
                onSelectedImage={(tempSelectImage) => {
                    setSelectedImage(tempSelectImage)
                    setValue("image_url", tempSelectImage, { shouldValidate: true })
                }}
            />
        </main>
    )
}