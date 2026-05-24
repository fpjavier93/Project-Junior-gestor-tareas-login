function Card({name,value}) {
    return(
        <div className="p-4 bg-white border border-gray-300 rounded shadow">
                        <p className="text-gray-500">{name}</p>
                        <p className="text-4xl font-bold">{value}</p>
                    </div>
    )


}

export {Card};