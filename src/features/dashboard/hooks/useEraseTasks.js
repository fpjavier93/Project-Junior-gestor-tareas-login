import { useState } from "react"
import { deleteTask, getTasks } from "../services/tasksApiServices"
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes"

export function useEraseTasks({ setError, setUserTasks }) {
    const [isDeletingID, setIsDeletingID] = useState(null)
    const [taskToDeleteID, setTaskToDeleteID] = useState(null)

    function handleEraseTask(taskID) {
        setTaskToDeleteID(taskID)
    }

    function closeDeleteDialog() {
        if (isDeletingID) return
        setTaskToDeleteID(null)
    }

    async function confirmEraseTask() {
        if (!taskToDeleteID) return

        setIsDeletingID(taskToDeleteID)

        try {
            await deleteTask(taskToDeleteID)
            setUserTasks(await getTasks())
            setTaskToDeleteID(null)
        } catch (error) {
            console.error("Error al eliminar la tarea:", error.response?.data || error)
            setError({ status: true, type: TASK_ERROR_TYPES.DELETE })
            setTaskToDeleteID(null)
        } finally {
            setIsDeletingID(null)
        }
    }

    return {
        handleEraseTask,
        isDeletingID,
        isDeleteDialogOpen: Boolean(taskToDeleteID),
        closeDeleteDialog,
        confirmEraseTask,
    }
}