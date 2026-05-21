import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../../components/Card";


function Dashboard() {
    const navigate = useNavigate();

    return (
            <main className="dashboard">

                <div className="max-w-4xl mx-auto px-4">

                
                <header className="flex justify-between py-10">
                    <div>
                        <h1 className="text-black font-bold text-2xl">Hola(Usuario)</h1>
                        
                        <h2 className="text-gray-500">Aqui esta el resumen de tus tareas</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="inline-flex w-fit items-center text-black border border-gray-300 px-4 py-2 rounded">Ver todas</button>
                        <button className="inline-flex w-fit items-center text-black border border-gray-300 px-4 py-2 rounded bg-blue-600"> + Nueva tarea</button>
                    </div>
                </header>

                <div className="flex flex-col gap-4">
                    <Card
                    name='TOTAL'
                    value="5"
                    />
                    <Card
                    name='PENDIENTES'
                    value="0"
                    />
                    <Card
                    name='COMPLETADAS'
                    value="0"
                    />
                </div>

                <div className="border border-gray-300 p-4 rounded shadow my-6">
                <p className="text-gray-500">PROGRESO GENERAL</p>

                </div>

                <section>
                    {/* Contenido */}
                </section>
                </div>
            </main>
        
    );
}

export default Dashboard;


