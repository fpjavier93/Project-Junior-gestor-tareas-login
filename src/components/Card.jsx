function Card({ name, value }) {
    return (
        <div className="p-4 bg-indigo-100 rounded shadow">
            <p className="text-gray-500">{name}</p>
            <p className="text-4xl font-bold">{value}</p>
        </div>
    )


}

export { Card };