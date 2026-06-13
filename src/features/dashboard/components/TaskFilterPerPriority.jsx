

export function TaskFilterPerPriority({ onPriorityChange, onSelectedPriority }) {

    return (

        <div className="flex">
            <div className="mx-1 text-sm font-medium text-indigo-500">Prioridad:</div>

            <div className="text-sm font-medium text-black">
                <select className="bg-white"
                    id="prioridad"
                    value={onSelectedPriority}
                    onChange={(e) => onPriorityChange(e.target.value)}
                >
                    <option value={""}>Selecciona Prioridad</option>
                    <option value={"low"}>Baja</option>
                    <option value={"medium"}>Media</option>
                    <option value={"high"}>Alta</option>
                </select>
            </div>
        </div>

    )


}