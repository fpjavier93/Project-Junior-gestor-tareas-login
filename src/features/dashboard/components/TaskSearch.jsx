
export function TaskSearch({ searching, onSearch }) {

    return (
        <div className="flex gap-1">
            <p className="font-bold">Buscar:</p>

            <input className="bg-white"
                value={searching}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    )
}