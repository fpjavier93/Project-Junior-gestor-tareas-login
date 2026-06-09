
export function ProgressBarDashboard({ progress }) {

    return (
        <div className="p-4 my-6 bg-indigo-100 rounded shadow">
            <p className="mb-2 text-gray-500">PROGRESO GENERAL</p>
            <p className="text-4xl font-bold">{progress.toFixed(2)} %</p>

            <div className="w-full h-3 my-2 bg-gray-200 rounded-full">
                <div className={`h-3 rounded-full my-2
                        ${progress < 30 ? "bg-red-300" :
                        progress < 70 ? "bg-orange-500" :
                            progress < 99 ? "bg-orange-300" : "bg-green-500"}

                        `}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>

    )
}

export default ProgressBarDashboard;
