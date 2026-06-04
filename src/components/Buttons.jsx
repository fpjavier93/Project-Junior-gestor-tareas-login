

function Blue({ name, onClick = undefined, type, disabled }) {
    return (
        <button className="inline-flex items-center px-4 py-2 text-white bg-indigo-500 border border-gray-300 rounded w-fit hover:cursor-pointer hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:hover:bg-indigo-300"
            disabled={disabled}
            type={type}
            onClick={onClick}

        >{name}</button>

    )

}

function White({ name, onClick }) {
    return (
        <button className="inline-flex items-center px-4 py-2 text-black bg-white border border-gray-300 rounded w-fit hover:cursor-pointer hover:bg-gray-50"
            onClick={onClick}

        >{name}</button>

    )

}

function LogOut({ onclick }) {
    return (
        <button className="text-sm font-medium text-white hover:underline hover:cursor-pointer"
            onClick={onclick}
        >
            Log-Out
        </button>
    )
}



function Inicio({ onclick }) {
    return (
        <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
            onClick={onclick}
        >
            Volver a inicio
        </button>
    )
}


export { Blue, White, LogOut, Inicio };