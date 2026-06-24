export function TaskFilterType({ onTaskChange, onselectedType }) {

    return (

        <div className="flex">
            <div className="mx-1 text-sm font-medium text-indigo-500">Tipo:</div>

            <div className="text-sm font-medium text-black">
                <select className="bg-white"
                    id="task_type"
                    value={onselectedType}
                    onChange={(e) => onTaskChange(e.target.value)}
                >
                    <option value={""}>Selecciona tipo</option>
                    <option value={"study"}>Estudio</option>
                    <option value={"work"}>Trabajo</option>
                    <option value={"personal"}>Personal</option>
                </select>
            </div>
        </div>
    )
}