
export function ProgressBarDashboard({ progres }) {

    return (
        <div className="p-4 my-6 bg-white border border-gray-300 rounded shadow">
            <p className="mb-2 text-gray-500">PROGRESO GENERAL</p>
            <p className="text-4xl font-bold">{progres.toFixed(2)} %</p>

            <div className="w-full h-3 my-2 bg-gray-200 rounded-full">
                <div className={`h-3 rounded-full my-2
                        ${progres < 30 ? "bg-red-300" :
                        progres < 70 ? "bg-orange-500" :
                            progres < 99 ? "bg-orange-300" : "bg-green-500"}

                        `}
                    style={{ width: `${progres}%` }}
                ></div>
            </div>
        </div>

    )
}

export default ProgressBarDashboard;