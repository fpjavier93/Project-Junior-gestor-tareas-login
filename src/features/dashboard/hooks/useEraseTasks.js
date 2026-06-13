import { useState } from "react";
import { deleteTask, getTasks } from "../services/tasksApiServices";
import { openDeleteTaskModal } from "../services/taskModalServices";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";

export function useEraseTasks({ setError, setUserTasks }) {

    const [isDeletingID, setIsDeletingID] = useState(null);

    async function handleEraseTask(task_id) {

        setIsDeletingID(task_id)

        const result = await openDeleteTaskModal()

        if (result.dismiss) {
            return
        }

        setIsDeletingID(null)

        try {

            await deleteTask(task_id);
            const updateTasks = await getTasks()
            setUserTasks(updateTasks);

        } catch {
            setError({ status: true, type: TASK_ERROR_TYPES.DELETE })
        } finally {

            setIsDeletingID(null);
        }
    };

    return { handleEraseTask }

};
