import { useState, useEffect } from "react";
import { White, Blue } from "../../../components/Buttons";



export function EditTaskDialog({ isOpen, task, onClose, onSave }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");



    useEffect(() => {

        if (!task) return;

        setTitle(task.title);
        setDescription(task.description)

    }, [task])

    if (!isOpen || !task) return null;

    function handleSubmit(e) {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!title) return

        onSave({
            title: trimmedTitle,
            description: trimmedDescription
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div>
                        <label
                            htmlFor="edit-task-title"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Descripcion:
                        </label>

                        <textarea className="w-full px-3 py-2 bg-white border border-gray-300 rounded"
                            id="edit-task-title"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

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