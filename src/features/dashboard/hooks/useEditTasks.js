import { useState } from "react";
import { getTasks, editTask } from "../services/tasksApiServices";
import { openEditTaskModal } from "../services/taskModalServices";


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

            setError({ status: true, type: 2 })

        } finally {

            setIsEditingID(null)
        }
    }

    return { isEditingID, setIsEditingID, handleEditTask };

}
