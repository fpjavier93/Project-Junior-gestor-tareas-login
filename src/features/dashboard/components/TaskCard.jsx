
export function TaskCard({ task, isEditing, isDeleting, isCompleted, onToggleStatus, onEdit, onDelete }) {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between px-5 py-4 text-4xl font-bold bg-indigo-200 border-b border-gray-300">
                {task.title}
                <div className="flex flex-col items-end gap-2">
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer"
                            checked={isCompleted}
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
                </div>
            </div>
            <div className="px-5 py-4 bg-indigo-100 border-b border-gray-300">
                {task.description}
            </div>
        </div>
    )
}