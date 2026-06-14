import { useState } from "react";
import { getTasks, editTask } from "../services/tasksApiServices";
import { openEditTaskModal } from "../services/taskModalServices";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";
import { useTasks } from "./useTasks";



export function useEditTasks({ setError, setUserTasks }) {


    const [taskToEdit, setTaskToEdit] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    function openEditDialog(task) {

        setTaskToEdit(task);
        setIsEditDialogOpen(true);

    }

    function closeEditDialog() {

        setIsEditDialogOpen(false);
        setTaskToEdit(null);

    }


    async function onSave(editedTask) {

        if (!taskToEdit) return

        try {

            await editTask(taskToEdit.id, editedTask)

            const getUserTasks = await getTasks();

            setUserTasks(getUserTasks);

        } catch {

            setError({ status: true, type: TASK_ERROR_TYPES.EDIT })

        } finally {
            setIsEditDialogOpen(false)
            setTaskToEdit(null)
        }

    }

    return { openEditDialog, taskToEdit, setTaskToEdit, isEditDialogOpen, setIsEditDialogOpen, closeEditDialog, onSave };


}

//const updateTask = await openEditTaskModal(task);

// if (!updateTask) {
//     setTaskToEdit(null)
//     return
// }

// try {

//     await editTask(task.id, updateTask);

//     const updatedTask = await getTasks();

//     setUserTasks(updatedTask);

// } catch {

//     setError({ status: true, type: TASK_ERROR_TYPES.EDIT })

// } finally {

//     setTaskToEdit(null)
// }