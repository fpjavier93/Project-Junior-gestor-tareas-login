import { useState, useEffect } from "react";
import { White, Blue } from "../../../components/Buttons";
import { useTasks } from "../hooks/useTasks";



export function EditTaskDialog({ isOpen, task, onClose, onSave }) {

    const { titleEditTask, setTitleEditTask, descriptionEditTask, setDescriptionEditTask, editTaskPriority, setCreateTaskPriority, setEditTaskPriority } = useTasks();

    useEffect(() => {

        if (!task) return;

        setEditTaskPriority(task.priority)
        setTitleEditTask(task.title);
        setDescriptionEditTask(task.description)

    }, [task])


    if (!isOpen || !task) return null;

    function handleSubmit(e) {

        e.preventDefault();

        const trimmedTitle = titleEditTask.trim();
        const trimmedDescription = descriptionEditTask.trim();

        if (!trimmedTitle) return

        onSave({
            title: trimmedTitle,
            description: trimmedDescription,
            priority: editTaskPriority
        });

    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full max-w-md p-6 bg-indigo-200 border border-gray-300 rounded shadow">

                <h2 className="mb-4 text-xl font-bold text-gray-900">
                    Editar tarea
                </h2>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="edit-task-title"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Titulo:
                        </label>
                    </div>

                    <input className="w-full px-3 py-2 bg-white border border-gray-300 rounded"
                        id="edit-task-title"
                        value={titleEditTask}
                        onChange={(e) => setTitleEditTask(e.target.value)}
                    />

                    <div>
                        <label
                            htmlFor="edit-task-title"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Descripcion:
                        </label>

                        <textarea className="w-full px-3 py-2 bg-white border border-gray-300 rounded"
                            id="edit-task-priority"
                            value={descriptionEditTask}
                            onChange={(e) => setDescriptionEditTask(e.target.value)}
                        />
                    </div>

                </div>

                <div>

                    <label htmlFor="low">
                        <input className="mx-2"
                            name={"priority"}
                            value={"low"}
                            id="low"
                            type="radio"
                            checked={editTaskPriority === "low"}
                            onChange={(e) => setEditTaskPriority(e.target.value)}
                        />Baja
                    </label>

                    <label htmlFor="medium">
                        <input className="mx-2"
                            name={"priority"}
                            value={"medium"}
                            id="medium"
                            type="radio"
                            checked={editTaskPriority === "medium"}
                            onChange={(e) => setEditTaskPriority(e.target.value)}
                        />Media
                    </label>

                    <label htmlFor="high">
                        <input className="mx-2"
                            name={"priority"}
                            value={"high"}
                            id="high"
                            type="radio"
                            checked={editTaskPriority === "high"}
                            onChange={(e) => setEditTaskPriority(e.target.value)}
                        />Alta
                    </label>

                </div>

                <div className="flex justify-between">
                    <White
                        name={"Cerrar"}
                        onClick={onClose}
                    />

                    <Blue
                        type={"submit"}
                        name={"Aceptar"}
                    />
                </div>

            </form>
        </div>
    )
}