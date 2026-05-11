function Person({ nombre, edad, bgColor,click}) {
    return (
        <div className={`w-1/4 min-w-75 mt-10 mx-auto ${bgColor} shadow-2xl rounded-2xl p-8 hover:bg-amber-50`}>
            <h2>Nombre: {nombre}</h2>
            <p>Edad: {edad}</p>
            <p>Click: {click}</p>
        </div>
    )
};

function Button({ bgColor, text, onClick }) {
    return (
        <div className="flex justify-center mt-5">
            <button className={`${bgColor} hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300`}
                onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export { Person, Button }