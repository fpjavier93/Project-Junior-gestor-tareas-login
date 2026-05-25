
function Blue({ name, onClick = undefined, type = "button" }) {
    return (
        <button className="inline-flex items-center px-4 py-2 text-white bg-indigo-500 border border-gray-300 rounded w-fit hover:cursor-pointer hover:bg-indigo-600"
            type={type}
            onClick={onClick}

        >{name}</button>

    )

}

function White({ name, onClick, type = "button" }) {
    return (
        <button className="inline-flex items-center px-4 py-2 text-black bg-white border border-gray-300 rounded w-fit hover:cursor-pointer hover:bg-gray-50"
            type={type}
            onClick={onClick}

        >{name}</button>

    )

}

export { Blue, White };

