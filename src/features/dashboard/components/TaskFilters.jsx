export function TaskFilters({ onStatusChange, select }) {

    return (

        <div className="flex">
            <div className="mx-1 text-sm font-medium text-indigo-500">Mostrar Tareas:</div>

            <div className="text-sm font-medium text-black">
                <select className="bg-white"
                    id="estado"
                    value={select}
                    onChange={(e) => onStatusChange(e.target.value)}
                >
                    <option value={"todas"}>Todas las tareas</option>
                    <option value={"completed"}>Completadas</option>
                    <option value={"pending"}>Pendientes</option>
                </select>
            </div>
        </div>

    )

}
