export function RisentltyTask({ task, index, diffInDays }) {

    const description = task.description;
    const isLongDescription = description.length > 120;



    return <div className={`flex items-center gap-4 px-5 py-4 ${(index + 1) % 2 ? "bg-indigo-100" : "bg-indigo-200"}`}>

        <div className="flex items-center flex-1 min-w-0 gap-3">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <div className={`w-full${isLongDescription ? " truncate overflow-hidden" : ""}`}>
                <h3 className="text-sm font-medium truncate text-neutral-900">{task.title}</h3>
                <p className={`text-sm text-gray-500 max-w-fit`}>{task.description}</p>
            </div>
        </div>

        <div className="flex flex-col items-start w-40 shrink-0">
            {task.priority === "low"
                ? <p className="text-sm text-black rounded-full">
                    <span>Prioridad: </span>
                    <span className="font-bold text-yellow-500">
                        Baja</span></p> : task.priority === "medium"
                    ? <p className="text-sm text-black rounded-full">
                        <span>Prioridad:</span>
                        <span className="font-bold text-orange-500"> Media</span></p>
                    : <p className="text-sm text-black rounded-full">
                        <span>Prioridad: </span>
                        <span className="font-bold text-red-500">Alta</span></p>}
            {task.status === "pending" ? <p className="text-sm text-red-400 rounded-full">Pendiente</p> : <p className="text-sm text-green-500">Completado</p>}

            <p className="text-sm text-red-500">{task.due_date === null || task.status === "completed" ? null
                : diffInDays > 3 ? `Fecha limite: ${task.due_date}`
                    : diffInDays >= 0 && diffInDays <= 3 ? `La tarea vence pronto (${task.due_date})`
                        : "Limite vencido"}</p>

            <h3 className="flex min-w-0">{task.title}</h3>
        </div>
    </div>

}