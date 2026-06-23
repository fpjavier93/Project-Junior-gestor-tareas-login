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
    const { error, setError } = useTasks({ status: false, type: 0 });

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

        <div>

            hola



        </div>

    )
}

export default TaskDetailPage;