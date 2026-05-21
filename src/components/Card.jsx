function Card({name,value}) {
    return(
        <div className="border border-gray-300 p-4 rounded shadow">
                        <p className="text-gray-500">{name}</p>
                        <p className="font-bold text-4xl">{value}</p>
                    </div>
    )


}

export {Card};