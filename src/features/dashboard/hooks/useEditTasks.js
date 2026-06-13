import { useState } from "react";
import { getTasks, editTask } from "../services/tasksApiServices";
import { openEditTaskModal } from "../services/taskModalServices";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";


export function useEditTasks({ setError, setUserTasks }) {

    const [isEditingID, setIsEditingID] = useState(null);


    async function handleEditTask(task) {

        setIsEditingID(task.id);

        const updateTask = await openEditTaskModal(task);

        if (!updateTask) {
            setIsEditingID(null)
            return
        }

        try {

            await editTask(task.id, updateTask);

            const updatedTask = await getTasks();

            setUserTasks(updatedTask);

        } catch {

            setError({ status: true, type: TASK_ERROR_TYPES.EDIT })

        } finally {

            setIsEditingID(null)
        }
    }

    return { handleEditTask };

}
