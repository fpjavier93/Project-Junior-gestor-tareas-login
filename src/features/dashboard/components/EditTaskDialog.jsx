import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editTaskDialogSchema } from "../schemas/editTaskDialogSchema"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function EditTaskDialog({ isOpen, task, onClose, onSave }) {
    const {
        register,
        control,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(editTaskDialogSchema) })

    useEffect(() => {
        if (!isOpen || !task) return
        reset({
            edit_task_title: task.title ?? "",
            edit_task_description: task.description ?? "",
            priority: task.priority ?? "medium",
        })
    }, [isOpen, task, reset])

    if (!task) return null

    async function handleEditTask(data) {
        clearErrors("root.server")
        try {
            await onSave({
                title: data.edit_task_title,
                description: data.edit_task_description,
                priority: data.priority,
            })
        } catch {
            setError("root.server", {
                type: "server",
                message: "No se pudo actualizar la tarea. Inténtalo nuevamente.",
            })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Editar tarea</DialogTitle>
                    <DialogDescription>Actualiza la información principal de la tarea.</DialogDescription>
                </DialogHeader>

                <form id="edit-task-form" noValidate onSubmit={handleSubmit(handleEditTask)}>
                    <FieldGroup>
                        <Field data-invalid={Boolean(errors.edit_task_title)}>
                            <FieldLabel htmlFor="edit_task_title">Titulo:</FieldLabel>
                            <Input id="edit_task_title" aria-invalid={Boolean(errors.edit_task_title)} {...register("edit_task_title")} />
                            <FieldError errors={[errors.edit_task_title]} />
                        </Field>

                        <Field data-invalid={Boolean(errors.edit_task_description)}>
                            <FieldLabel htmlFor="edit_task_description">Descripcion:</FieldLabel>
                            <Textarea id="edit_task_description" rows={4} aria-invalid={Boolean(errors.edit_task_description)} {...register("edit_task_description")} />
                            <FieldError errors={[errors.edit_task_description]} />
                        </Field>

                        <Controller
                            name="priority"
                            control={control}
                            render={({ field, fieldState }) => (
                                <FieldSet data-invalid={fieldState.invalid}>
                                    <FieldLegend variant="label">Prioridad</FieldLegend>
                                    <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-3 gap-3">
                                        {[
                                            { value: "low", label: "Baja" },
                                            { value: "medium", label: "Media" },
                                            { value: "high", label: "Alta" },
                                        ].map((option) => (
                                            <Label key={option.value} htmlFor={"edit-priority-" + option.value} className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 has-data-checked:border-primary has-data-checked:bg-primary/5">
                                                <RadioGroupItem id={"edit-priority-" + option.value} value={option.value} />
                                                {option.label}
                                            </Label>
                                        ))}
                                    </RadioGroup>
                                    <FieldError errors={[fieldState.error]} />
                                </FieldSet>
                            )}
                        />

                        {errors.root?.server && <FieldError>{errors.root.server.message}</FieldError>}
                    </FieldGroup>
                </form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" disabled={isSubmitting}>Cerrar</Button>
                    </DialogClose>
                    <Button type="submit" form="edit-task-form" disabled={isSubmitting}>
                        {isSubmitting ? "Guardando..." : "Aceptar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}