import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { editTask, eraseTasks, getTasks } from "../services/tasksApiServices";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { openEditTaskModal } from "../services/taskModalServices";
import { isTaskCompleted } from "../utils/AllTasksPageUtils";
import { useTasks } from "../hooks/useTasks";
import { useEraseTasks } from "../hooks/useEraseTasks";


function AllTasksPage() {

    const [select, setSelect] = useState("todas");
    const [searching, setSearching] = useState("");
    const [isEditingID, setIsEditingID] = useState(null);

    const { userTasks, setUserTasks, error, setError, handleTaskStatusChange, loadTasks, loading, setLoading } = useTasks();
    const { isDeletingID, setIsDeletingID, handleEraseTask } = useEraseTasks({ setUserTasks, setError });

    const navigate = useNavigate();

    useEffect(() => {

        loadTasks();

    }, [])

    async function handleEditTask(task) {

        setIsEditingID(task.id);

        const updateTask = await openEditTaskModal(task);

        if (!updateTask) {
            setIsEditingID(null)
            return
        }

        try {

            await editTask(task.id, updateTask);

            const updatedTask = await getTasks();

            setUserTasks(updatedTask);

        } catch {

            setError({ status: true, type: 2 })

        } finally {

            setIsEditingID(null)
        }
    }

    async function handleSelect(value) {

        setSelect(value);

        let tasks;

        try {

            if (value == "todas") {

                tasks = await getTasks()
            }
            if (value == "pending") {

                tasks = await getTasks(value)

            }
            if (value == "completed") {

                tasks = await getTasks(value)
            }

            setUserTasks(tasks);
        } catch {
            setError({ status: true, type: 1 })
            setSelect("todas")
        }

    }


    if (loading) {
        return <LoadingSpinner />
    }

    if (error.status == true && error.type == 1) {
        return <ErrorMessage error={"Error al cargar la lista de Tareas"}
            onTryAgain={handleUserTask}
            onCancel={() => navigate("/dashboard")} />
    }

    if (error.status == true && error.type == 2) {
        return <ErrorMessage error={"Error al editar la tarea"}
            onTryAgain={handleUserTask}
        />
    }

    if (error.status == true && error.type == 3) {
        return <ErrorMessage error={"Error al completar la tarea"}
            onTryAgain={handleUserTask}
        />
    }

    if (error.status == true && error.type == 4) {
        return <ErrorMessage error={"Error al eliminar la tarea"}
            onTryAgain={handleUserTask}
        />
    }

    function handleShowTasks() {

        if (userTasks.length === 0 && searching.length !== 0) {
            return showEmptyTasks("No se encontraron tareas")
        }
        if (userTasks.length === 0) {
            return showEmptyTasks("No existen tareas")
        }

        const showTasks = userTasks.map((task) => {
            return <div
                key={task.id}>
                <div>
                    <div className="flex flex-col">
                        <div className="flex justify-between px-5 py-4 text-4xl font-bold bg-indigo-200 border-b border-gray-300">
                            {task.title}
                            <div className="flex flex-col items-end gap-2">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"
                                        checked={isTaskCompleted(task.status)}
                                        onChange={() => handleTaskStatusChange(task, select)}
                                    />
                                    <div className="relative w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                                    <span className={`text-sm font-medium  select-none ms-3 text-heading ${task.status == "pending" ? "text-gray-400" : "text-black font-bold"}`}>Completada</span>
                                </label>
                                <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                                    onClick={() => handleEditTask(task)}
                                    disabled={isEditingID === task.id}
                                >{isEditingID === task.id ? "editando..." : "editar tarea"}</button>
                                <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                                    onClick={() => handleEraseTask(task.id)}
                                    disabled={isDeletingID === task.id}
                                >{isDeletingID === task.id ? "eliminando tarea..." : "eliminar tarea"}</button>
                            </div>
                        </div>
                        <div className="px-5 py-4 bg-indigo-100 border-b border-gray-300">
                            {task.description}
                        </div>
                    </div>
                </div>
            </div>

        });
        return showTasks;
    }
    function showEmptyTasks(message) {
        return (
            <div>
                <div className="flex flex-col">
                    <div className="flex justify-center px-5 py-4 text-4xl font-bold border-b border-gray-300">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
    }

    async function handleSearch(value) {

        try {

            setSearching(value)
            let tasks = [];

            tasks = await getTasks(select === "todas" ? undefined : select, value);

            // const filterTasks = tasks.filter((task) => {
            //     return task.title.toLowerCase().includes(value.toLowerCase())
            // })

            setUserTasks(tasks)

        } catch {

            setError({ status: true, type: 1 })

        }
    }

    return (
        <main className="allTasskPage">
            <div className="max-w-4xl px-4 mx-auto overflow-hidden">

                <div className="flex justify-between">
                    <div className="flex gap-1">
                        <p className="font-bold">Buscar:</p>
                        <input className="bg-white"
                            value={searching}
                            onChange={(e) => handleSearch(e.target.value)}
                        />

                    </div>
                    <div className="flex">
                        <div className="flex justify-end mx-7">
                            <div className="mx-1 text-sm font-medium text-indigo-500">Mostrar Tareas:</div>
                            <div className="text-sm font-medium text-black">
                                <select className="bg-white"
                                    id="estado"
                                    value={select}
                                    onChange={(e) => handleSelect(e.target.value)}
                                >
                                    <option value={"todas"}>Todas las tareas</option>
                                    <option value={"completed"}>Completadas</option>
                                    <option value={"pending"}>Pendientes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="mt-6 overflow-hidden bg-white border border-gray-300 rounded shadow">
                    {handleShowTasks()}
                </section>
            </div>
        </main>
    )
}


export default AllTasksPage;
