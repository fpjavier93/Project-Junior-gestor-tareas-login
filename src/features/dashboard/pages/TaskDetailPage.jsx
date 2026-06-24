import { useParams } from "react-router-dom"
import { getTaskById } from "../services/getTaskById";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useTasks } from "../hooks/useTasks";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";
import ErrorMessage from "../../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

function TaskDetailPage() {
    const navigate = useNavigate();
    const { taskId } = useParams();
    const [showTask, setShowTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ status: false, type: 0 });

    useEffect(() => {

        async function getTask() {
            try {
                setError({ status: false, type: 0 })

                const task = await getTaskById(taskId);

                if (!task) {
                    throw new Error("Error al traer la tarea");
                }

                setShowTask(task);

            } catch (error) {
                setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
            } finally {
                setLoading(false);
            }
        }

        getTask();
    }, [taskId]);


    if (loading) return <LoadingSpinner />
    if (error.status) {
        return <ErrorMessage
            error={"No se pudo cargar la tarea"}
            onTryAgain={() => window.location.reload()}
            onCancel={() => navigate("/dashboard")}
        />
    }


    return (

        <main className="max-w-4xl px-4 py-8 mx-auto">
            <article className="overflow-hidden bg-indigo-100 border border-indigo-200 shadow rounded-3xl">
                <header className="px-6 py-5 bg-indigo-200 border-b border-indigo-300">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {showTask.title}
                    </h1>
                </header>

                <section className="px-6 py-5 space-y-4">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-500">
                            Descripción
                        </h2>
                        <p className="mt-1 text-gray-900">
                            {showTask.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Prioridad
                            </h2>
                            <p className="mt-1 font-medium">
                                {showTask.priority}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Estado
                            </h2>
                            <p className="mt-1 font-medium">
                                {showTask.status === "completed" ? "Completada" : "Pendiente"}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Fecha límite
                            </h2>
                            <p className="mt-1 font-medium">
                                {showTask.due_date || "Sin fecha límite"}
                            </p>
                        </div>
                    </div>

                    {showTask.image_url && (
                        <img
                            src={showTask.image_url}
                            alt={showTask.title}
                            className="object-cover w-full rounded max-h-80"
                        />
                    )}
                </section>

            </article>
            <div className="flex justify-end py-3">
                <button
                    className="text-sm font-medium text-indigo-500 hover:underline hover:cursor-pointer"
                    onClick={() => navigate("/dashboard/tasks")}
                > ← Volver atras</button>
            </div>
        </main>
    )
}

export default TaskDetailPage;