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



function AllTasksPage() {


    const { userTasks, setUserTasks, error, setError, handleTaskStatusChange, loadTasks, loading, handleSelect, select, searching, handleSearch } = useTasks();
    const { isDeletingID, handleEraseTask } = useEraseTasks({ setUserTasks, setError });
    const { isEditingID, handleEditTask } = useEditTasks({ setUserTasks, setError });

    const navigate = useNavigate();

    useEffect(() => {

        loadTasks();

    }, []);


    if (loading) {
        return <LoadingSpinner />
    }

    if (error.status === true && error.type === 1) {
        return <ErrorMessage error={"Error al cargar la lista de Tareas"}
            onTryAgain={loadTasks}
            onCancel={() => navigate("/dashboard")} />
    }

    if (error.status === true && error.type === 2) {
        return <ErrorMessage error={"Error al editar la tarea"}
            onTryAgain={loadTasks}
        />
    }

    if (error.status === true && error.type === 3) {
        return <ErrorMessage error={"Error al completar la tarea"}
            onTryAgain={loadTasks}
        />
    }

    if (error.status === true && error.type === 4) {
        return <ErrorMessage error={"Error al eliminar la tarea"}
            onTryAgain={loadTasks}
        />
    }

    const showTasks = userTasks.map((task) => {

        return (<div key={task.id}>
            <TaskCard
                task={task}
                select={select}
                isEditing={isEditingID === task.id}
                isDeleting={isDeletingID === task.id}
                isCompleted={isTaskCompleted(task.status)}
                onToggleStatus={() => handleTaskStatusChange(task, select)}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleEraseTask(task.id)} />
        </div>)
    });


    function handleShowTasks() {
        if (userTasks.length === 0 && searching.length !== 0) {
            return <TaskEmptyState message={"No se encontraron tareas"} />;
        }
        if (userTasks.length === 0) {
            return <TaskEmptyState message={"No existen tareas"} />
        }

        return showTasks;
    }

    return (
        <main className="allTaskPage">
            <div className="max-w-4xl px-4 mx-auto overflow-hidden">
                <div className="flex justify-between">

                    <TaskSearch
                        onSearch={handleSearch}
                        searching={searching}
                    />

                    <TaskFilters
                        onStatusChange={handleSelect}
                        select={select}
                    />
                </div>

                <section className="mt-6 overflow-hidden bg-white border border-gray-300 rounded shadow">
                    {handleShowTasks()}
                </section>
            </div>
        </main >
    )
}

export default AllTasksPage;
