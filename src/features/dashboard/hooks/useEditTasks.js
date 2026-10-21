import { useState } from "react";
import { editTask } from "../services/tasksApiServices";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";

export function useEditTasks({ setError, loadTasks }) {

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

            await loadTasks();

            setIsEditDialogOpen(false)
            setTaskToEdit(null)

        } catch (error) {
            console.error("Error al editar la tarea:", error);

            setError({ status: true, type: TASK_ERROR_TYPES.EDIT });

            throw error;

        }

    }

    return { openEditDialog, taskToEdit, setTaskToEdit, isEditDialogOpen, setIsEditDialogOpen, closeEditDialog, onSave };

}
