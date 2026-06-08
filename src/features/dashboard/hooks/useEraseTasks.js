import Swal from "sweetalert2";
import { useState } from "react";
import { eraseTasks, getTasks } from "../services/tasksApiServices";
import { openEditEraseTaskModal } from "../services/taskModalServices";

export function useEraseTasks({ setError, setUserTasks }) {

    const [isDeletingID, setIsDeletingID] = useState(null);

    async function handleEraseTask(task_id) {

        setIsDeletingID(task_id)

        const result = await openEditEraseTaskModal()

        if (result.dismiss) {
            return
        }

        setIsDeletingID(null)

        try {

            await eraseTasks(task_id);
            const updateTasks = await getTasks()
            setUserTasks(updateTasks);

        } catch {
            setError({ status: true, type: 4 })
        } finally {

            setIsDeletingID(null);
        }
    };

    return { isDeletingID, setIsDeletingID, handleEraseTask }

};
