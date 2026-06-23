import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function TaskCard({ task, isEditing, isDeleting, isCompleted, isStatusUpdating, onToggleStatus, onEdit, onDelete, Image, diffInDays }) {

    const navigate = useNavigate();
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const description = task.description || "";
    const isLongDescripion = description.length > 120;


    function hanldeIsDescriptionExpanded() {
        setIsDescriptionExpanded((currentValue) => !currentValue)
    }

    return (

        <div className="overflow-hidden shadow rounded-3xl">
            <div className="flex justify-between px-5 py-4 text-2xl font-bold bg-indigo-200 border-b border-gray-300">

                <div>
                    <p className="text-sm text-red-500">{task.due_date === null || task.status === "completed" ? null
                        : diffInDays > 3 ? `Fecha limite: ${task.due_date}`
                            : diffInDays >= 0 && diffInDays <= 3 ? `La tarea vence pronto (${task.due_date})`
                                : "Limite vencido"}</p>
                    <h3 className="flex min-w-0">{task.title}</h3>
                </div>

                <div className="flex justify-end gap-6">

                    <div>
                        {Image && <img
                            src={Image}
                            alt={task.title}
                            className="object-cover w-48 h-32"
                        />}
                    </div>

                    <div className="flex flex-col items-end gap-2">

                        <div className="text-sm font-medium text-indigo-500 hover:cursor-default">
                            <p className={task.priority === "low"
                                ? "text-yellow-500" : task.priority === "medium"
                                    ? "text-orange-500" : "text-red-500"
                            }>{task.priority === "low"
                                ? "Baja Prioridad" : task.priority === "medium"
                                    ? "Mediana Prioridad" : "Alta Prioridad"}</p>

                        </div>

                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer"
                                checked={isCompleted}
                                disabled={isStatusUpdating}
                                onChange={onToggleStatus}
                            />
                            <div className="relative w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                            <span className={`text-sm font-medium  select-none ms-3 text-heading ${task.status === "pending" ? "text-gray-400" : "text-black font-bold"}`}>Completada</span>
                        </label>
                        <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                            onClick={onEdit}
                            disabled={isEditing}
                        >{isEditing ? "editando..." : "editar tarea"}</button>
                        <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                            onClick={onDelete}
                            disabled={isDeleting}
                        >{isDeleting ? "eliminando tarea..." : "eliminar tarea"}</button>
                        <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                            onClick={() => navigate(`/dashboard/tasks/${task.id}`)}>
                            Ver detalles
                        </button>

                    </div>
                </div>
            </div>

            <div className={`px-5 py-4 bg-indigo-100 border-b border-gray-300`}>

                <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isDescriptionExpanded ? "max-h-96" : "max-h-12"}`}>
                    <p>
                        {description}
                    </p>
                </div>

                <div className="flex justify-end">
                    {isLongDescripion ? <button
                        type="button"
                        onClick={hanldeIsDescriptionExpanded}
                        className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer">
                        {!isDescriptionExpanded ? "Mostrar mas..." : "Mostrar menos"}
                    </button> : null}
                </div>
            </div>
        </div>
    )
};