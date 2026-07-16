import Swal from "sweetalert2";

export async function openDeleteProjectModal(projectName = "") {
    const projectMessage = projectName
        ? 'Se eliminará el proyecto "' + projectName + '".'
        : "Se eliminará este proyecto.";

    const result = await Swal.fire({
        title: "¿Eliminar proyecto?",
        text: projectMessage + " Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        focusCancel: true,
        reverseButtons: true,
    });

    return result;
}
