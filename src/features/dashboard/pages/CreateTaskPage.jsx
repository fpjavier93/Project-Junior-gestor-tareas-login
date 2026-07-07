import { useNavigate } from "react-router-dom";
import { Blue, White } from "../../../components/Buttons";
import ErrorMessage from "../../../components/ErrorMessage";
import { useTasks } from "../hooks/useTasks";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";
import { ImagePickerDialog } from "../components/ImagePickerDialog";
import { useGetImageTask } from "../hooks/useGetImageTask";
import { useState, useEffect } from "react";
import { ProjectSelect } from "../components/ProjectSelect";
import { useProject } from "../hooks/useProjects";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../schemas/taskSchema";
import { useForm } from "react-hook-form";
import { tr } from "zod/locales";

export default function CreateTaskPage() {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(taskSchema),
        mode: "onChange",
        defaultValues: {
            has_due_date: false,
            due_date: "",
            image_url: "",
        }
    })

    const hasDueDate = watch("has_due_date");

    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0];

    const [selectedImage, setSelectedImage] = useState("");


    const { project, handleProjects, projectSelected, hanldeProjectSelected } = useProject();



    const { handleCreateTaskPriorityChange, createTaskPriority,
        handleSubmitCreateTaskForm, submitError,
        setError, error, handleGetImagesTask, selectTypeTask, taskType } = useTasks();

    const { isShowSelectTask, openGetImageDialog, closeGetImageDialog } = useGetImageTask();

    const errorCreateTask = { [TASK_ERROR_TYPES.CREATE]: "No se pudo crear la tarea" };




    useEffect(() => {
        handleProjects();

    }, [])



    if (error.status) {
        return <ErrorMessage error={errorCreateTask[error.type] || "Accion inesperada"}
            onTryAgain={() => setError(false)}
            onCancel={() => navigate("/dashboard")}
        />
    }

    return (
        <div className="max-w-4xl max-h-screen py-1 mx-auto px-auto">

            <div className="p-4 bg-indigo-200 border border-gray-300 rounded shadow my-18">

                <form
                    onSubmit={handleSubmit((data) => handleSubmitCreateTaskForm(data, setSelectedImage, reset))}
                    className="space-y-6">
                    <div>

                        <label htmlFor="title" className="block text-lg font-medium text-gray-900">
                            Titulo
                        </label>

                        <div className="py-3">
                            <input
                                id="title"
                                name="title"
                                type="title"
                                {...register("title")}
                                className="block w-full rounded-md bg-indigo-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />

                            {errors.title && (
                                <p className="mt-1 text-sm font-medium text-red-600">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className="py-5">

                            <label htmlFor="description" className="block text-lg font-medium text-gray-900">
                                Descripcion
                            </label>

                            <div className="flex py-3">
                                <textarea
                                    id="description"
                                    name="description"
                                    {...register("description")}
                                    rows={5}
                                    className="block w-full rounded-md bg-indigo-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />

                                {selectedImage && (
                                    <img
                                        className="object-cover w-40 h-32"
                                        src={selectedImage}
                                        alt="Imagen seleccionada para la tarea"
                                    />)
                                }


                                <input
                                    type="hidden"
                                    name="image_url"
                                    {...register("image_url")}

                                />

                            </div>

                            <div>
                                {errors.description && (
                                    <p className="mt-1 text-sm font-medium text-red-600">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between py-3">
                                <div className="flex gap-3">

                                    <p className="block text-lg font-medium text-gray-900">Prioridad:</p>

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

                                <div className="flex gap-3">

                                    <input
                                        id="has_due_date"
                                        type="checkbox"
                                        checked={hasDueDate}
                                        {...register("has_due_date", {
                                            onChange: (e) => {
                                                if (e.target.checked) {
                                                    setValue("due_date", today, { shouldValidate: true });
                                                } else {
                                                    setValue("due_date", "", { shouldValidate: true });
                                                }
                                            },
                                        })}

                                    />
                                    {errors.task_type && (
                                        <p className="mt-1 text-sm font-medium text-red-600">
                                            {errors.task_type.message}
                                        </p>
                                    )}

                                    <label htmlFor="has_due_date" className="font-medium">Seleccionar fecha limite:</label>

                                    <input className={`h-8 font-medium rounded bg-indigo-50 ${!hasDueDate ? "disabled:bg-gray-300" : ""}`}
                                        type="date"
                                        name="due_date"
                                        min={today}
                                        {...register("due_date")}
                                        disabled={!hasDueDate}
                                    />

                                    {errors.due_date && (
                                        <p className="mt-1 text-sm font-medium text-red-600">
                                            {errors.due_date.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <p className="block text-lg font-medium text-gray-900"> Tipo de tarea: </p>

                                <select className="bg-white"
                                    id="task_type"
                                    name="task_type"
                                    value={taskType}
                                    onChange={(e) => selectTypeTask(e.target.value)}
                                    {...register("task_type")}
                                >
                                    <option value={"study"}>Estudio</option>
                                    <option value={"work"}>Trabajo</option>
                                    <option value={"personal"}>Personal</option>

                                </select>
                            </div>

                            <div className="py-3">
                                <div className="flex gap-3">
                                    <p className="block text-lg font-medium text-gray-900"> Asignar la tarea al proyecto: </p>

                                    <ProjectSelect
                                        projects={project}
                                        onProjecSelected={projectSelected}
                                        onHandleProjectSelected={hanldeProjectSelected}
                                    />

                                </div>
                            </div>

                            <div className="pt-4 my-5 border-t border-gray-200"></div>
                            {submitError && (
                                <p className="text-sm text-red-600">{submitError}</p>
                            )}

                            <div className="flex justify-end gap-3">

                                <White
                                    type={"button"}
                                    name="Cancelar"
                                    onClick={() => navigate("/dashboard")}
                                />

                                <White
                                    type={"button"}
                                    name="Añadir Imagen..."
                                    onClick={openGetImageDialog}
                                />

                                <Blue
                                    disabled={isSubmitting ? true : false}
                                    name={isSubmitting ? "Creando..." : "Crear tarea"}
                                    type="submit"
                                />
                            </div>
                        </div>
                    </div>
                </form>

            </div>

            <ImagePickerDialog
                isOpen={isShowSelectTask}
                onClose={closeGetImageDialog}
                onSelectedImage={(tempSelectImage) => {
                    setSelectedImage(tempSelectImage);
                    setValue("image_url", tempSelectImage);
                }}
            />
        </div >

    )
}
