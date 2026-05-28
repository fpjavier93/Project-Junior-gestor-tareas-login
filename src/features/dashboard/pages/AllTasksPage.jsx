import { useEffect, useState } from "react";
import { getTasksUserData } from "../services/DashboardServices";
import { getCurrentUser } from "../../auth/services";


function AllTasksPage() {

    const [loading, setLoading] = useState(true);
    const [userTasks, setuserTasks] = useState([]);
    const [isCheked, setIsCheked] = useState(false);

    useEffect(() => {

        const handleUserTask = async () => {

            const currentUser = await getCurrentUser();

            const getUserTasks = await getTasksUserData(currentUser.user.id);
            setuserTasks(getUserTasks);
            console.log(userTasks)
            setTimeout(() => setLoading(false), 1000)
        }

        handleUserTask();
    }, [])

    console.log(userTasks)

    function handleisCheked(status) {




    }


    if (loading) {
        return <div>LOADING</div>
    }


    function handleShowTasks() {

        const showTasks = userTasks.map((task) => {

            return <div
                key={task.id}>

                <div>
                    <div className="flex flex-col">
                        <div className="flex justify-between px-5 py-4 text-4xl font-bold border-b border-gray-300">
                            {task.title}
                            <div>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"

                                        onChange={() => handleisCheked(task.status)}
                                    />
                                    <div className="relative w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                                    <span className="text-sm font-medium select-none ms-3 text-heading">{isCheked ? "Completado" : "Incompletoooo"}</span>
                                </label>
                            </div>
                        </div>
                        <div className="px-5 py-4 border-b border-gray-300">
                            {task.description}
                        </div>
                    </div>
                </div>

            </div>

        });
        console.log(showTasks)
        return showTasks

    }

    return (
        <main className="allTasskPage">
            <div className="max-w-4xl px-4 mx-auto">
                <header className="flex justify-between py-10">
                    <div>
                        <h1 className="text-2xl font-bold text-black">Todas tus taeas</h1>

                        <h2 className="text-gray-500">Aqui puedes cambiar el status de tus tareas o eliminarlas</h2>
                    </div>
                </header>

                <section className="mt-6 overflow-hidden bg-white border border-gray-300 rounded shadow">
                    {handleShowTasks()}
                </section>
            </div>
        </main>
    )
}

export default AllTasksPage;