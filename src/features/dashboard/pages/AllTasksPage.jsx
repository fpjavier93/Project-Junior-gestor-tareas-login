import { useEffect, useState } from "react";
import { Inicio } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editTask, eraseTasks, getTasks } from "../services/tasksApi";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";


function AllTasksPage() {

    const [loading, setLoading] = useState(true);
    const [userTasks, setuserTasks] = useState([]);
    const [select, setSelect] = useState("todas");
    const [searching, setSearching] = useState("");
    const [error, setError] = useState({ status: false, type: 0 });
    const [iseditingID, setIsEditingID] = useState(null);
    const [isdeletingID, setIsDeletingID] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {

        handleUserTask();
    }, [])


    const handleUserTask = async () => {

        setError({ status: false, type: 0 })

        try {

            const getUserTasks = await getTasks();

            setuserTasks(getUserTasks);
        }
        catch {
            setError({ status: true, type: 1 })
        }
        finally {
            setLoading(false);
        }

    }

    function checkStatus(status) {

        return status === "completed"
    }

    async function handleisCheked(task) {

        try {

            await editTask(task.id, { status: task.status === "completed" ? "pending" : "completed" })

            const updatedTasks = await getTasks(select === "todas" ? undefined : select)

            setuserTasks(updatedTasks);

        } catch {
            setError({ status: true, type: 3 })
        }


    }

    async function handleEeraseTask(task_id) {

        setIsDeletingID(task_id)

        const result = await Swal.fire({
            title: "¿Eliminar tarea?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
        });

        if (!result.isConfirmed) {

            setIsDeletingID(null)
            return;
        }

        try {

            await eraseTasks(task_id);
            const updateTasks = await getTasks()
            setuserTasks(updateTasks);

        } catch {
            setError({ status: true, type: 4 })
        } finally {

            setIsDeletingID(null);
        }

    }

    async function handleEditTask(task) {

        setIsEditingID(task.id);

        const result = await Swal.fire({
            title: "Editar tarea",
            html: `
                    <input id="task-title" class="swal2-input" value="${task.title}" placeholder="Título">
                    <textarea id="task-description" class="swal2-textarea" placeholder="Descripción">${task.description}</textarea>
                `,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const titleInput = document.getElementById("task-title");
                const descriptionInput = document.getElementById("task-description");
                const title = titleInput instanceof HTMLInputElement ? titleInput.value : "";
                const description = descriptionInput instanceof HTMLTextAreaElement ? descriptionInput.value : "";

                if (!title) {
                    Swal.showValidationMessage("EL titulo no puede esta vacio");
                    return;
                }

                return { title, description };
            },
        });

        if (result.isDismissed) {
            setIsEditingID(null)
            return
        }

        try {

            await editTask(task.id, result.value);

            const updatedTask = await getTasks();

            setuserTasks(updatedTask);

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

            setuserTasks(tasks);
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

        const showTasks = userTasks.map((task, index) => {
            return <div
                key={task.id}>
                <div>
                    <div className="flex flex-col">
                        <div className="flex justify-between px-5 py-4 text-4xl font-bold bg-indigo-200 border-b border-gray-300">
                            {task.title}
                            <div className="flex flex-col items-end gap-2">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"
                                        checked={checkStatus(task.status)}
                                        onChange={() => handleisCheked(task)}
                                    />
                                    <div className="relative w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                                    <span className={`text-sm font-medium  select-none ms-3 text-heading ${task.status == "pending" ? "text-gray-400" : "text-black font-bold"}`}>Completada</span>
                                </label>
                                <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                                    onClick={() => handleEditTask(task)}
                                    disabled={iseditingID === task.id}
                                >{iseditingID === task.id ? "editando..." : "editar tarea"}</button>
                                <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                                    onClick={() => handleEeraseTask(task.id)}
                                    disabled={isdeletingID === task.id}
                                >{isdeletingID === task.id ? "eliminando tarea..." : "eliminar tarea"}</button>
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

            tasks = await getTasks(select === "todas" ? undefined : select);

            const filterTasks = tasks.filter((task) => {
                return task.title.toLowerCase().includes(value.toLowerCase())
            })

            setuserTasks(filterTasks)

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
