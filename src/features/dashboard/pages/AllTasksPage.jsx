import { useEffect } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { isTaskCompleted } from "../utils/AllTasksPageUtils";
import { useTasks } from "../hooks/useTasks";
import { useEraseTasks } from "../hooks/useEraseTasks";
import { useEditTasks } from "../hooks/useEditTasks";
import { TaskCard } from "../components/TaskCard";
import { TaskFilters } from "../components/TaskFilters";
import { TaskSearch } from "../components/TaskSearch";
import { TaskEmptyState } from "../components/TaskEmptyState";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";
import { TaskFilterPerPriority } from "../components/TaskFilterPerPriority";

function AllTasksPage() {

    const { userTasks, setUserTasks, error, setError, handleTaskStatusChange, loadTasks, loading, handleSelect, select, searching, handleSearch, selectPriority, setIsCheckedPriotity, handleSelectPriority } = useTasks();
    const { isDeletingID, handleEraseTask } = useEraseTasks({ setUserTasks, setError });
    const { isEditingID, handleEditTask } = useEditTasks({ setUserTasks, setError });

    const navigate = useNavigate();

    const errorMessages = {
        [TASK_ERROR_TYPES.LOAD]: "Error al cargar la lista de Tareas",
        [TASK_ERROR_TYPES.EDIT]: "Error al editar la tarea",
        [TASK_ERROR_TYPES.UPDATE_STATUS]: "Error al completar la tarea",
        [TASK_ERROR_TYPES.DELETE]: "Error al eliminar la tarea",
    };

    useEffect(() => {

        loadTasks();

    }, []);


    if (loading) {
        return <LoadingSpinner />
    }

    if (error.status) {
        return <ErrorMessage
            error={errorMessages[error.type] || "Ocurrio un error inesperado"}
            onTryAgain={loadTasks}
            onCancel={error.type === TASK_ERROR_TYPES.LOAD ? () => navigate("/dashboard") : undefined} />
    }


    const taskCards = userTasks.map((task) => {

        return (
            <TaskCard
                key={task.id}
                task={task}
                select={select}
                isEditing={isEditingID === task.id}
                isDeleting={isDeletingID === task.id}
                isCompleted={isTaskCompleted(task.status)}
                onToggleStatus={() => handleTaskStatusChange(task, select)}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleEraseTask(task.id)} />
        )
    });

    function renderTaskListContent() {
        if (userTasks.length === 0 && searching.length !== 0) {
            return <TaskEmptyState message={"No se encontraron tareas"} />;
        }
        if (userTasks.length === 0) {
            return <TaskEmptyState message={"No existen tareas"} />
        }

        return taskCards;
    }

    return (
        <main className="allTaskPage">
            <div className="max-w-4xl px-4 mx-auto my-2 overflow-hidden">
                <div className="flex justify-between">

                    <TaskSearch
                        onSearch={handleSearch}
                        searching={searching}
                    />

                    <TaskFilterPerPriority
                        onPriorityChange={handleSelectPriority}
                        onSelectedPriority={selectPriority}
                    />

                    <TaskFilters
                        onStatusChange={handleSelect}
                        select={select}
                    />
                </div>

                <section className="mt-6 overflow-hidden bg-white border border-gray-300 rounded shadow">
                    {renderTaskListContent()}
                </section>
            </div>
        </main >
    )
}

export default AllTasksPage;