import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../../components/Card";


const tareasRecientes = [
    {
        id: 1,
        titulo: "Refactorizar el módulo de autenticación",
        descripcion: "Migrar a JWT con refresh token y revisar el guard.",
        estado: 'Pendiene',
        completada: true,
    },
    {
        id: 2,
        titulo: "Diseñar onboarding de usuarios nuevos",
        descripcion: "Flujo de 3 pasos con tour interactivo.",
        estado: "Pendiente",
        completada: true,
    },
    {
        id: 3,
        titulo: "Escribir tests del endpoint /users",
        descripcion: "Cubrir casos 200, 401 y 403 con Vitest.",
        estado: "Pendiente",
        completada: false,
    },
    {
        id: 4,
        titulo: "Configurar el pipeline de CI",
        descripcion: "GitHub Actions con lint, test y deploy.",
        estado: "Pendiente",
        completada: true,
    },
];

let doneTaskCount = 0;
let undoneTask = tareasRecientes.length




function countDoneTask() {
     doneTaskCount = 0;
    for (const tarea of tareasRecientes) {
        if (tarea.completada) {
            doneTaskCount++;
        }
    }
    return doneTaskCount;
}

const doneTask = countDoneTask();


const progres = (doneTask * 100) / tareasRecientes.length;



function Dashboard() {
    const navigate = useNavigate();

    return (
        <main className="dashboard">

            <div className="max-w-4xl px-4 mx-auto">


                <header className="flex justify-between py-10">
                    <div>
                        <h1 className="text-2xl font-bold text-black">Hola(Usuario)</h1>

                        <h2 className="text-gray-500">Aqui esta el resumen de tus tareas</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="inline-flex items-center px-4 py-2 text-black bg-white border border-gray-300 rounded w-fit">Ver todas</button>
                        <button className="inline-flex items-center px-4 py-2 text-black bg-indigo-500 border border-gray-300 rounded w-fit"> + Nueva tarea</button>
                    </div>
                </header>

                <div className="flex flex-col gap-4">
                    <Card
                        name='TOTAL'
                        value={tareasRecientes.length}
                    />
                    <Card
                        name='PENDIENTES'
                        value={(undoneTask - doneTask)}
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
                        progres < 99 ?"bg-orange-300": "bg-green-500"}
                        
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
                   

                        {tareasRecientes.map(tarea => {
                            return <div key={tarea.id}>
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-900">{tarea.titulo}</h3>
                                        <p className="text-sm text-gray-500">{tarea.descripcion}</p>
                                    </div>

                                </div>
                                <span className="px-2 py-1 text-sm font-medium text-indigo-500 bg-gray-200 border rounded-full py">{tarea.completada == true? tarea.estado = "Completada" : tarea.estado = "Pendiente"}</span>
                                </div>
                            </div>
                        })
                        }



                    


                </section>
            </div>
        </main>

    );
}

export default Dashboard;


