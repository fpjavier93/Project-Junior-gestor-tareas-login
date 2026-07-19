import { useEffect } from "react"
import { CircleAlert, SlidersHorizontal, X } from "lucide-react"
import LoadingSpinner from "../../../components/LoadingSpinner"
import ErrorMessage from "../../../components/ErrorMessage"
import { useNavigate } from "react-router-dom"
import { isTaskCompleted } from "../utils/AllTasksPageUtils"
import { useTasks } from "../hooks/useTasks"
import { useEraseTasks } from "../hooks/useEraseTasks"
import { useEditTasks } from "../hooks/useEditTasks"
import { TaskCard } from "../components/TaskCard"
import { TaskFilters } from "../components/TaskFilters"
import { TaskSearch } from "../components/TaskSearch"
import { TaskEmptyState } from "../components/TaskEmptyState"
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes"
import { TaskFilterPerPriority } from "../components/TaskFilterPerPriority"
import { EditTaskDialog } from "../components/EditTaskDialog"
import { DeleteConfirmationDialog } from "../components/DeleteConfirmationDialog"
import { handleImage } from "../utils/getURLImagen"
import { calcDiffInDays } from "../utils/CreateTaskUtils"
import { TaskFilterType } from "../components/TaskType"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function AllTasksPage() {
    const {
        userTasks,
        setUserTasks,
        error,
        setError,
        handleTaskStatusChange,
        loadTasks,
        loading,
        handleSelect,
        select,
        searching,
        handleSearch,
        taskPriorityFilter,
        handleTaskPriorityFilterChange,
        updatingStatusId,
        submitError,
        setSubmitError,
        taskType,
        hanldeSearchTypeTask,
    } = useTasks()

    const {
        isDeletingID,
        handleEraseTask,
        isDeleteDialogOpen,
        closeDeleteDialog,
        confirmEraseTask,
    } = useEraseTasks({ setUserTasks, setError })

    const { taskToEdit, openEditDialog, isEditDialogOpen, closeEditDialog, onSave } = useEditTasks({ setUserTasks, setError })
    const today = new Date().toISOString().split("T")[0]
    const navigate = useNavigate()

    const errorMessages = {
        [TASK_ERROR_TYPES.LOAD]: "Error al cargar la lista de tareas",
        [TASK_ERROR_TYPES.EDIT]: "Error al editar la tarea",
        [TASK_ERROR_TYPES.UPDATE_STATUS]: "Error al completar la tarea",
        [TASK_ERROR_TYPES.DELETE]: "Error al eliminar la tarea",
    }

    useEffect(() => {
        loadTasks()
    }, [])

    if (loading) return <LoadingSpinner />

    if (error.status && error.type === TASK_ERROR_TYPES.LOAD) {
        return (
            <ErrorMessage
                error={errorMessages[error.type] || "Ocurrió un error inesperado"}
                onTryAgain={loadTasks}
                onCancel={() => navigate("/dashboard")}
            />
        )
    }

    const taskCards = userTasks.map((task) => (
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
    ))

    function renderTaskListContent() {
        if (userTasks.length === 0 && searching.length !== 0) return <TaskEmptyState message="No se encontraron tareas" />
        if (userTasks.length === 0) return <TaskEmptyState message="No existen tareas" />
        return taskCards
    }

    const operationError = error.status && error.type !== TASK_ERROR_TYPES.LOAD
        ? errorMessages[error.type] || "Ocurrió un error inesperado"
        : submitError

    return (
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight">Tareas</h1>
                <p className="mt-1 text-sm text-muted-foreground">Consulta, filtra y administra todas tus tareas.</p>
            </header>

            <Card>
                <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2"><SlidersHorizontal className="size-4" />Filtros</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <TaskSearch onSearch={handleSearch} searching={searching} />
                    <TaskFilterPerPriority onPriorityChange={handleTaskPriorityFilterChange} selectedPriority={taskPriorityFilter} />
                    <TaskFilters onStatusChange={handleSelect} select={select} />
                    <TaskFilterType onselectedType={taskType} onTaskChange={hanldeSearchTypeTask} />
                </CardContent>
            </Card>

            {operationError && (
                <Alert variant="destructive" role="alert">
                    <CircleAlert />
                    <AlertTitle>No se pudo completar la acción</AlertTitle>
                    <AlertDescription className="flex items-center justify-between gap-4">
                        <span>{operationError}</span>
                        <Button type="button" variant="ghost" size="icon-sm" aria-label="Cerrar error" onClick={() => { setError({ status: false, type: 0 }); setSubmitError("") }}><X /></Button>
                    </AlertDescription>
                </Alert>
            )}

            <section className="flex flex-col gap-5">{renderTaskListContent()}</section>

            <EditTaskDialog isOpen={isEditDialogOpen} task={taskToEdit} onClose={closeEditDialog} onSave={onSave} />

            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                title="¿Eliminar esta tarea?"
                description="Esta acción eliminará la tarea de forma permanente y no se puede deshacer."
                isDeleting={Boolean(isDeletingID)}
                onCancel={closeDeleteDialog}
                onConfirm={confirmEraseTask}
            />
        </main>
    )
}

export default AllTasksPage