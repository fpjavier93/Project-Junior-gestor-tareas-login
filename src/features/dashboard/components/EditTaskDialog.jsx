import { useEffect } from "react";
import { White, Blue } from "../../../components/Buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTaskDialogSchema } from "../schemas/editTaskDialogSchema";
import { useForm } from "react-hook-form";


export function EditTaskDialog({ isOpen, task, onClose, onSave }) {

    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(editTaskDialogSchema)
    })


    useEffect(() => {
        if (!isOpen || !task) return;

        reset({
            edit_task_title: task.title ?? "",
            edit_task_description: task.description ?? "",
            priority: task.priority ?? "medium",
        });
    }, [isOpen, task, reset]);


    if (!isOpen || !task) return null;


    async function handleEditTask(data) {
        clearErrors("root.server");

        try {
            await onSave({
                title: data.edit_task_title,
                description: data.edit_task_description,
                priority: data.priority,
            });
        } catch {
            setError("root.server", {
                type: "server",
                message: "No se pudo actualizar la tarea. Inténtalo nuevamente.",
            });
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <form
                noValidate
                onSubmit={handleSubmit(handleEditTask)}
                className="flex flex-col w-full max-w-md p-6 bg-indigo-200 border border-gray-300 rounded shadow">

                <h2 className="mb-4 text-xl font-bold text-gray-900">
                    Editar tarea
                </h2>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="edit_task_title"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Titulo:
                        </label>
                    </div>

                    <input className="w-full px-3 py-2 bg-white border border-gray-300 rounded"
                        id="edit_task_title"
                        {...register("edit_task_title")}
                    />

                    {errors.edit_task_title && (
                        <p className="mt-1 text-sm font-medium text-red-600">
                            {errors.edit_task_title.message}
                        </p>
                    )}

                    <div>
                        <label
                            htmlFor="edit_task_description"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Descripcion:
                        </label>

                        <textarea className="w-full px-3 py-2 bg-white border border-gray-300 rounded"
                            id="edit_task_description"
                            {...register("edit_task_description")}
                        />

                        {errors.edit_task_description && (
                            <p className="mt-1 text-sm font-medium text-red-600">
                                {errors.edit_task_description.message}
                            </p>
                        )}
                    </div>

                </div>

                <div>

                    <label htmlFor="low">
                        <input className="mx-2"
                            name={"priority"}
                            value={"low"}
                            id="low"
                            type="radio"
                            {...register("priority")}
                        />Baja
                    </label>

                    <label htmlFor="medium">
                        <input className="mx-2"
                            name={"priority"}
                            value={"medium"}
                            id="medium"
                            type="radio"
                            {...register("priority")}
                        />Media
                    </label>

                    <label htmlFor="high">
                        <input className="mx-2"
                            name={"priority"}
                            value={"high"}
                            id="high"
                            type="radio"
                            {...register("priority")}
                        />Alta
                    </label>

                    {errors.priority && (
                        <p className="mt-1 text-sm font-medium text-red-600">
                            {errors.priority.message}
                        </p>
                    )}

                </div>

                <div className="flex justify-between">
                    <White
                        type={"button"}
                        name={"Cerrar"}
                        onClick={onClose}
                    />

                    <Blue
                        disabled={isSubmitting}
                        type={"submit"}
                        name={isSubmitting ? "Guardando..." : "Aceptar"}
                    />
                </div>

                {errors.root?.server && (
                    <p className="mt-3 text-sm font-medium text-red-600">
                        {errors.root.server.message}
                    </p>
                )}
            </form>
        </div>
    )
}
