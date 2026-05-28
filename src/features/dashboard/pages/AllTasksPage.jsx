import { useEffect, useState } from "react";
import { getTasksUserData } from "../services/DashboardServices";
import { getCurrentUser } from "../../auth/services";
import { updateTask } from "../services/CreateTaskServices";

function AllTasksPage() {
    const [loading, setLoading] = useState(true);
    const [userTasks, setuserTasks] = useState([]);

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: "",
    });

    const showSnackbar = (message) => {
        setSnackbar({
            show: true,
            message,
        });

        setTimeout(() => {
            setSnackbar({
                show: false,
                message: "",
            });
        }, 3000);
    };

    useEffect(() => {
        const handleUserTask = async () => {
            const currentUser = await getCurrentUser();

            const getUserTasks = await getTasksUserData(currentUser.user.id);
            setuserTasks(getUserTasks);
            console.log(userTasks);
            setTimeout(() => setLoading(false), 1000);
        };

        handleUserTask();
    }, []);

    console.log(userTasks);

    async function handleisCheked(taskID) {
        const taskFoundIndex = userTasks.findIndex((t) => t.id === taskID);
        let taskToUpdate = userTasks[taskFoundIndex];
        taskToUpdate.status =
            taskToUpdate.status === "completed" ? "pending" : "completed";

        try {
            await updateTask(taskToUpdate);
            showSnackbar("Tarea actualizada correctamente");
        } catch (error) {
            showSnackbar(error.message || "Error al actualizar la tarea");
            console.log(error);
        }
    }

    function convertChecked(status) {
        return status === "completed";
    }

    if (loading) {
        return <div>LOADING</div>;
    }

    function TitleSection(task) {
        return (<div className="flex items-center gap-2">
            {task.title}
            <span className="px-2 py-1 text-sm font-medium text-indigo-500 bg-gray-200 border rounded-full py">
                {task.status == "completed" ? "Completada" : "Pendiente"}
            </span>
        </div>);
    }

    function CompletedSection(task) {
        return (<div className="flex items-center gap-2">
            <span className="text-sm select-none ms-3 text-heading">
                Completado
            </span>
            <label className=" inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={convertChecked(task.status)}
                    onChange={() => handleisCheked(task.id)}
                />
                <div className="relative w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
        </div>);
    }

    function handleShowTasks() {
        const showTasks = userTasks.map((task) => {
            return (
                <div key={task.id}>
                    <div>
                        <div className="flex flex-col">
                            <div className=" justify-between flex px-5 py-4 text-4xl font-bold border-b border-gray-300">
                                {TitleSection(task)}
                                {CompletedSection(task)}
                                <div>
                                    borrar
                                </div>
                            </div>
                            <div className="px-5 py-4 border-b border-gray-300">
                                {task.description}
                            </div>
                        </div>
                    </div>
                    {snackbar.show && (
                        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-3 rounded shadow-lg">
                            {snackbar.message}
                        </div>
                    )}
                </div>
            );
        });
        console.log(showTasks);
        return showTasks;
    }

    return (
        <main className="allTasskPage">
            <div className="max-w-4xl px-4 mx-auto">
                <header className="flex justify-between py-10">
                    <div>
                        <h1 className="text-2xl font-bold text-black">Todas tus taeas</h1>

                        <h2 className="text-gray-500">
                            Aqui puedes cambiar el status de tus tareas o eliminarlas
                        </h2>
                    </div>
                </header>

                <section className="mt-6 overflow-hidden bg-white border border-gray-300 rounded shadow">
                    {handleShowTasks()}
                </section>
            </div>
        </main>
    );
}

export default AllTasksPage;
