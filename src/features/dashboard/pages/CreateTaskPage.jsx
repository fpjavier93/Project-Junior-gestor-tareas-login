import { useNavigate } from "react-router-dom";
import { Blue, White } from "../../../components/Buttons";
import ErrorMessage from "../../../components/ErrorMessage";
import { useTasks } from "../hooks/useTasks";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";
import { ImagePickerDialog } from "../components/ImagePickerDialog";
import { useGetImageTask } from "../hooks/useGetImageTask";
import { useState } from "react";





export default function CreateTaskPage() {

    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0];

    const [selectedImage, setSelectedImage] = useState("");
    const [dueDate, setDueDate] = useState((new Date().toISOString().split("T")[0]));
    const [checkin, setCheckin] = useState(false);


    const { handleCreateTaskPriorityChange, createTaskPriority,
        handleSubmitCreateTaskForm, isSubmitting, submitError,
        setError, error, handleGetImagesTask, selectTypeTask, taskType } = useTasks();

    const { isShowSelectTask, openGetImageDialog, closeGetImageDialog } = useGetImageTask();

    const errorCreateTask = { [TASK_ERROR_TYPES.CREATE]: "No se pudo crear la tarea" };

    function handleSetChekin() {

        setCheckin((currentValue) => !currentValue)

    }

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
                    onSubmit={(e) => handleSubmitCreateTaskForm(e, setSelectedImage, setCheckin)}
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
                                required
                                className="block w-full rounded-md bg-indigo-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div className="py-5">

                            <label htmlFor="description" className="block text-lg font-medium text-gray-900">
                                Descripcion
                            </label>

                            <div className="flex py-3">
                                <textarea
                                    id="description"
                                    name="description"
                                    required
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
                                    value={selectedImage}
                                />

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
                                            checked={createTaskPriority === "low"}
                                            onChange={(e) => handleCreateTaskPriorityChange(e.target.id)} />Baja
                                    </label>

                                    <label htmlFor="medium">
                                        <input className="mx-2"
                                            name={"priority"}
                                            value={"medium"}
                                            id="medium"
                                            type="radio"
                                            checked={createTaskPriority === "medium"}
                                            onChange={(e) => handleCreateTaskPriorityChange(e.target.id)} />Media
                                    </label>

                                    <label htmlFor="high">
                                        <input className="mx-2"
                                            name={"priority"}
                                            value={"high"}
                                            id="high"
                                            type="radio"
                                            checked={createTaskPriority === "high"}
                                            onChange={(e) => handleCreateTaskPriorityChange(e.target.id)} />Alta
                                    </label>
                                </div>

                                <div className="flex gap-3">

                                    <input
                                        id="has_due_date"
                                        type="checkbox"
                                        checked={checkin}
                                        onChange={(e) => handleSetChekin(e.target.checked)}
                                    />
                                    <label htmlFor="has_due_date" className="font-medium">Seleccionar fecha limite:</label>

                                    <input className={`h-8 font-medium rounded bg-indigo-50 ${!checkin ? "disabled:bg-gray-300" : ""}`}
                                        type="date"
                                        name="due_date"
                                        min={today}
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        disabled={!checkin}
                                    />

                                </div>
                            </div>

                            <div className="flex gap-3">
                                <p className="block text-lg font-medium text-gray-900"> Tipo de tarea: </p>

                                <select className="bg-white"
                                    id="task_type"
                                    name="task_type"
                                    value={taskType}
                                    onChange={(e) => selectTypeTask(e.target.value)}>

                                    <option value={"study"}>Estudio</option>
                                    <option value={"work"}>Trabajo</option>
                                    <option value={"personal"}>Personal</option>

                                </select>


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
                onSelectedImage={setSelectedImage}
            />
        </div >

    )
}
