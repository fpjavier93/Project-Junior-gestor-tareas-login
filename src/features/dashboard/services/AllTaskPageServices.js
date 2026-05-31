import { supabase } from "../../../../utils/supabase";
import { getCurrentUser } from "../../auth/services";
import { getTasksUserData } from "./DashboardServices";
import Swal from "sweetalert2";

async function updateStatusTask(task_id, updateFields) {


    try {
        const { error } = await supabase
            .from('tasks')
            .update(updateFields)
            .eq('id', task_id)
            .select()

        if (error) {
            throw error;
        }

    } catch (error) {

        console.log("OCurrio un error")
    }
}

async function eraseDbTask(task_id) {
    try {

        const { data, error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", task_id)
            .select()

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error("Error eliminando la tarea:", error);
        throw error;
    }
}

async function editTask(task) {
    const result = await Swal.fire({
        title: "Editar tarea",
        html: `
            <input id="task-title" class="swal2-input" value="${task.title}" placeholder="Título">
            <textarea id="task-description" class="swal2-textarea" placeholder="Descripción">${task.description}</textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
            const titleInput = document.getElementById("task-title");
            const descriptionInput = document.getElementById("task-description");
            const title = titleInput instanceof HTMLInputElement ? titleInput.value : "";
            const description = descriptionInput instanceof HTMLTextAreaElement ? descriptionInput.value : "";

            if (!title) {
                Swal.showValidationMessage("EL titulo no puede esta vacio");
                return;
            }

            return { title, description };
        },
    });


    if (result.isDismissed) {
        return
    }

    await updateStatusTask(task.id, result.value);

    const currentUser = await getCurrentUser()
    const updatedTask = await getTasksUserData(currentUser.user.id)

    return updatedTask
}


export { updateStatusTask, eraseDbTask, editTask };