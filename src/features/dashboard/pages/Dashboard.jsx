import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../../components/Card";
import { Blue, White, LogOut } from "../../../components/Buttons";
import { useEffect, useState } from "react";
import { getTasksUserData, getUserDataId, handlesignOut } from "../services/DashboardServices";
import { getCurrentUser } from "../../auth/services";

function Dashboard() {

    const navigate = useNavigate();
    const [userTasks, setuserTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");



    useEffect(() => {

        const handleTasks = async () => {

            setLoading(true);
            const CurrentUser = await getCurrentUser();
            setUserName(CurrentUser.user.user_metadata.nombre);

            const userId = await getUserDataId()
            const getuserTasks = await getTasksUserData(userId);
            setuserTasks(getuserTasks);

            setTimeout(() => setLoading(false), 1000)
        }
        handleTasks()

    }, []);

    const updateDoneTask = userTasks.filter((t) => t.status == "completed").length;


    let progres = 0;

    progres = (updateDoneTask * 100) / userTasks.length;



    if (loading) return <div>Loading</div>

    return (
        <main className="dashboard">

            <div className="max-w-4xl px-4 mx-auto">


                <header className="flex justify-between py-10">
                    <div>
                        <h1 className="text-2xl font-bold text-black">Hola {userName}</h1>

                        <h2 className="text-gray-500">Aqui esta el resumen de tus tareas</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Blue
                            onClick={() => navigate("/createTaskPage")}
                            name={`+ Nueva Tarea`}
                            type={null}
                        />
                    </div>
                </header>

                <div className="flex flex-col gap-4">
                    <Card
                        name='TOTAL'
                        value={userTasks.length}
                    />
                    <Card
                        name='PENDIENTES'
                        value={(userTasks.length - updateDoneTask)}
                    />
                    <Card
                        name='COMPLETADAS'
                        value={updateDoneTask}
                    />
                </div>

                <div className="p-4 my-6 bg-white border border-gray-300 rounded shadow">
                    <p className="mb-2 text-gray-500">PROGRESO GENERAL</p>
                    <p className="text-4xl font-bold">{Number.isNaN(progres) ? progres = 0 : progres.toFixed(2)} %</p>

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

                        <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                            onClick={() => navigate("/allTasksPage")}
                        >Ver todas →</button>
                    </div>


                    {userTasks.map(task => {

                        return <div key={task.id}>
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-900">{task.title}</h3>
                                        <p className="text-sm text-gray-500">{task.description}</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 text-sm font-medium text-indigo-500 bg-gray-200 border rounded-full py">{task.status == "completed" ? "Completada" : "Pendiente"}</span>
                            </div>
                        </div>
                    }
                    ).slice(0, 3)
                    }
                </section>

                <div className="flex justify-center py-10">
                    <LogOut
                        onclick={() => handlesignOut(navigate)}
                    />
                </div>

            </div>
        </main>

    );
}

export default Dashboard;


