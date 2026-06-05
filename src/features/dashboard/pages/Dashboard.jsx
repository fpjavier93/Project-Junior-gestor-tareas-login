import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/Card";
import { Blue, LogOut } from "../../../components/Buttons";
import { useEffect, useState } from "react";
import { handlesignOut as handleSignOut } from "../services/DashboardServices";
import { getCurrentUser } from "../../auth/services";
import ProgressBarDashboard from "../../../components/ProgressBarDashboard";
import { getTasks } from "../services/tasksApi";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";

function Dashboard() {

    const navigate = useNavigate();
    const [userTasks, setuserTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
        handleTasks()

    }, []);

    const handleTasks = async () => {

        try {

            setLoading(true);

            const currentUser = await getCurrentUser();
            setUserName(currentUser.user.user_metadata.nombre);

            const getuserTasks = await getTasks();
            setuserTasks(getuserTasks);



        } catch {

            setError(true);

        } finally {
            setLoading(false) //practicar loading visual (luego crear un loading)
        }
    }

    const updateDoneTask = userTasks.filter((t) => t.status == "completed").length;

    const progres = userTasks.length > 0 ? (updateDoneTask * 100) / userTasks.length : 0;



    if (loading) return <LoadingSpinner />

    if (error) {
        return <ErrorMessage error={"Error al cargar la pagina"}
            onTryAgain={handleTasks}
            onCancel={() => handleSignOut(navigate)} />
    }


    return (
        <main className="dashboard">

            <div className="max-w-4xl px-4 mx-auto">

                <header className="flex justify-between py-10">
                    <div>
                        <h1 className="text-2xl font-bold text-black">Hola {userName}</h1>
                        <h2 className="text-gray-500">Aqui esta el resumen de tus tareas</h2>
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

                <ProgressBarDashboard progres={progres} />

                <section className="mt-6 overflow-hidden bg-white rounded shadow">

                    <div className="flex items-center justify-between px-5 py-4 bg-indigo-200">
                        <h2 className="font-semibold text-neutral-900">
                            Tareas Recientes
                        </h2>

                        <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                            onClick={() => navigate("/dashboard/tasks")}
                        >Ver todas →</button>
                    </div>


                    {userTasks.map((task, index) => {

                        return <div key={task.id}>


                            <div className={`flex items-center justify-between px-5 py-4 ${(index + 1) % 2 ? "bg-indigo-100" : "bg-indigo-200"} `}>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-900">{task.title}</h3>

                                        <p className="text-sm text-gray-500">{task.description}</p>
                                    </div>
                                </div>
                                {task.status == "pending" ? <p className="text-sm text-red-400 rounded-full">Pendiente</p> : <p className="text-sm text-green-500">Completado</p>}
                            </div>
                        </div>
                    }
                    ).slice(0, 6)
                    }
                </section>


            </div>
        </main>

    );
}

export default Dashboard;




