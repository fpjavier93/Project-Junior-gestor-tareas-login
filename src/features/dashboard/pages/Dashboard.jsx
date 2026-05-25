import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../../components/Card";
import { Blue, White } from "../../../components/Buttons";
import generarTareasAleatorias from "../utils/DashboardUtils";
import { useEffect, useState } from "react";

function Dashboard() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleTasks = async () => {
            setLoading(true)
            const data = await generarTareasAleatorias(10)
            setLoading(false)

            setTasks(data)
        }
        handleTasks()

    }, [])
    console.log(tasks)



    const doneTask = tasks.filter((t) => t.completada).length


    const progres = (doneTask * 100) / tasks.length;


    if (loading) return <div>Loading</div>
    else

        return (
            <main className="dashboard">

                <div className="max-w-4xl px-4 mx-auto">


                    <header className="flex justify-between py-10">
                        <div>
                            <h1 className="text-2xl font-bold text-black">Hola(Usuario)</h1>

                            <h2 className="text-gray-500">Aqui esta el resumen de tus tareas</h2>
                            {loading && <div>Loading</div>}
                        </div>
                        <div className="flex items-center gap-2">
                            <White
                                name={`Ver todas`}
                            />
                            <Blue
                                onClick={() => navigate("/")}
                                name={`+ Nueva Tarea`}
                            />
                        </div>
                    </header>

                    <div className="flex flex-col gap-4">
                        <Card
                            name='TOTAL'
                            value={tasks.length}
                        />
                        <Card
                            name='PENDIENTES'
                            value={(tasks.length - doneTask)}
                        />
                        <Card
                            name='COMPLETADAS'
                            value={doneTask}
                        />
                    </div>

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

                    <section className="mt-6 overflow-hidden bg-white border border-gray-300 rounded shadow">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300">
                            <h2 className="font-semibold text-neutral-900">
                                Tareas Recientes
                            </h2>

                            <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer">Ver todas →</button>
                        </div>


                        {tasks.map(tarea => {

                            return <div key={tarea.id}>
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                        <div>
                                            <h3 className="text-sm font-medium text-neutral-900">{tarea.titulo}</h3>
                                            <p className="text-sm text-gray-500">{tarea.descripcion}</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 text-sm font-medium text-indigo-500 bg-gray-200 border rounded-full py">{tarea.completada == true ? tarea.estado = "Completada" : tarea.estado = "Pendiente"}</span>
                                </div>
                            </div>

                        }
                        ).slice(0, 2)
                        }
                    </section>
                </div>
            </main>

        );
}

export default Dashboard;


