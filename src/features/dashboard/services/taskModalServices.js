import Swal from "sweetalert2";

export async function openEditTaskModal(task) {
    const result = await Swal.fire({
        title: "Editar tarea",
        html: `
            <input id="task-title" class="swal2-input" placeholder="Titulo">
            <textarea id="task-description" class="swal2-textarea" placeholder="Descripcion"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",

        didOpen: () => {
            const titleInput = document.getElementById("task-title");
            const descriptionInput = document.getElementById("task-description");

            if (titleInput instanceof HTMLInputElement) {
                titleInput.value = task.title ?? "";
            }

            if (descriptionInput instanceof HTMLTextAreaElement) {
                descriptionInput.value = task.description ?? "";
            }
        },

        preConfirm: () => {
            const titleInput = document.getElementById("task-title");
            const descriptionInput = document.getElementById("task-description");

            const title = titleInput instanceof HTMLInputElement ? titleInput.value : "";
            const description = descriptionInput instanceof HTMLTextAreaElement ? descriptionInput.value : "";

            if (!title) {
                Swal.showValidationMessage("El titulo no puede estar vacio");
                return;
            }

            return { title, description };
        },
    });

    return result.isConfirmed ? result.value : null;
}

export async function openDeleteTaskModal() {
    const result = await Swal.fire({
        title: "Eliminar tarea?",
        text: "Esta accion no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
    });

    return result;
}   
