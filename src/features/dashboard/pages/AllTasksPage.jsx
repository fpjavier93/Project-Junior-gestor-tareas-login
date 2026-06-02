import { useEffect, useState } from "react";
import { Inicio } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editTask, eraseTasks, getTasks } from "../services/tasksApi";


function AllTasksPage() {

    const [loading, setLoading] = useState(true);
    const [userTasks, setuserTasks] = useState([]);
    const [select, setSelect] = useState("todas");
    const navigate = useNavigate();

    useEffect(() => {

        const handleUserTask = async () => {

            const getUserTasks = await getTasks();


            setuserTasks(getUserTasks);

            setTimeout(() => setLoading(false), 1000)
        }

        handleUserTask();
    }, [])

    function checkStatus(status) {

        return status === "completed"
    }

    async function handleisCheked(task) {

        await editTask(task.id, { status: task.status === "completed" ? "pending" : "completed" })

        const updatedTasks = await getTasks(select === "todas" ? undefined : select)

        setuserTasks(updatedTasks);
    }

    async function handleEeraseTask(task_id) {

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
            return;
        }

        await eraseTasks(task_id);


        const updateTasks = await getTasks()

        setuserTasks(updateTasks);
    }



    async function handleEditTask(task) {

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

        console.log(result.value)

        if (result.isDismissed) {
            return
        }

        try {

            await editTask(task.id, result.value);
            const updatedTask = await getTasks();

            setuserTasks(updatedTask);

        } catch (error) {

            return error
        }




    }

    async function handleSelect(value) {

        setSelect(value);

        let tasks;

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
                            <div className="flex flex-col items-end gap-2">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"
                                        checked={checkStatus(task.status)}
                                        onChange={() => handleisCheked(task)}
                                    />
                                    <div className="relative w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                                    <span className="text-sm font-medium select-none ms-3 text-heading">Completada</span>
                                </label>
                                <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                                    onClick={() => handleEditTask(task)}
                                >editar tarea</button>
                                <button className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                                    onClick={() => handleEeraseTask(task.id)}
                                >eliminar tarea</button>
                            </div>
                        </div>
                        <div className="px-5 py-4 border-b border-gray-300">
                            {task.description}
                        </div>
                    </div>
                </div>
            </div>

        });

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

                <div className="flex justify-end">
                    <div className="flex justify-end mx-7">
                        {/* <input className="bg-white"
                            value={""} /> */}
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

                    <Inicio
                        onclick={() => navigate("/Dashboard")}
                    />
                </div>

                <section className="mt-6 overflow-hidden bg-white border border-gray-300 rounded shadow">
                    {handleShowTasks()}
                </section>
            </div>
        </main>
    )
}

export default AllTasksPage;
