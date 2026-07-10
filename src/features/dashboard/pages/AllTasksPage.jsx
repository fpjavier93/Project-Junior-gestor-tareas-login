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
import { EditTaskDialog } from "../components/EditTaskDialog";
import { handleImage } from "../utils/getURLImagen";
import { calcDiffInDays } from "../utils/CreateTaskUtils";
import { TaskFilterType } from "../components/TaskType";


function AllTasksPage() {

    const { userTasks, setUserTasks, error, setError, handleTaskStatusChange, loadTasks, loading, handleSelect, select, searching, handleSearch,
        taskPriorityFilter, handleTaskPriorityFilterChange, updatingStatusId, submitError, taskType, hanldeSearchTypeTask } = useTasks();
    const { isDeletingID, handleEraseTask } = useEraseTasks({ setUserTasks, setError });
    const { taskToEdit, openEditDialog, isEditDialogOpen, closeEditDialog, onSave } = useEditTasks({ setUserTasks, setError });
    const today = new Date().toISOString().split("T")[0];

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

    if (error.status && error.type === TASK_ERROR_TYPES.LOAD) {
        return <ErrorMessage
            error={errorMessages[error.type] || "Ocurrio un error inesperado"}
            onTryAgain={loadTasks}
            onCancel={() => navigate("/dashboard")}
        />
    }


    const taskCards = userTasks.map((task) => {

        return (

            <TaskCard
                key={task.id}
                task={task}
                select={select}
                isEditing={taskToEdit?.id === task.id}
                isDeleting={isDeletingID === task.id}
                isCompleted={isTaskCompleted(task.status)}
                isStatusUpdating={updatingStatusId === task.id}
                onToggleStatus={() => handleTaskStatusChange(task, select)}
                onEdit={() => openEditDialog(task)}
                onDelete={() => handleEraseTask(task.id)}
                Image={handleImage(task.image_url)}
                today={today}
                diffInDays={calcDiffInDays(task, today)}
                taskType={task.task_type}

            />

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
                        onPriorityChange={handleTaskPriorityFilterChange}
                        selectedPriority={taskPriorityFilter}
                    />

                    <TaskFilters
                        onStatusChange={handleSelect}
                        select={select}
                    />
                    <TaskFilterType
                        onselectedType={taskType}
                        onTaskChange={hanldeSearchTypeTask}
                    />



                </div>

                {submitError && (
                    <p className="mt-4 text-sm font-medium text-red-600">{submitError}</p>
                )}

                <section className="flex flex-col gap-6 mt-6">
                    {renderTaskListContent()}
                </section>

                <EditTaskDialog
                    isOpen={isEditDialogOpen}
                    task={taskToEdit}
                    onClose={closeEditDialog}
                    onSave={onSave}
                />
            </div>
        </main >
    )
}

export default AllTasksPage;
