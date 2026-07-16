import getUserID from "../services/CreateTaskServices";
import { createProject, deleteProjectByID } from "../services/taskProjectServices";
import { useState } from "react";
import { getProject } from "../services/taskProjectServices";
import { openDeleteProjectModal } from "../services/projectModalServices";

export function useProject() {
    const [loading, setloading] = useState(false);
    const [project, setProject] = useState([]);
    const [projectSelected, setprojectSelected] = useState("Sin proyecto");
    const [deleteError, setDeleteError] = useState("");


    async function handleSubmitCreateProjectForm(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dataProject = Object.fromEntries(formData.entries());

        const newDataForm = {
            user_id: await getUserID(),
            ...dataProject,
        };

        try {
            setloading(true);

            await createProject(newDataForm);

            e.target.reset()

        } catch (error) {
            console.log(error.response?.data || error);
        } finally {
            setloading(false)
        }

    }

    async function handleProjects() {
        setloading(true);

        try {
            const response = await getProject();
            setProject(response);


        } catch (error) {
            console.error("Error al cargar los proyectos:", error.response?.data || error);
        } finally {
            setloading(false)
        }
    }

    function hanldeProjectSelected(value) {

        setprojectSelected(value);

    }

    async function hanldeDeleteProject(project) {

        const result = await openDeleteProjectModal(project.name);

        if (!result.isConfirmed) {
            return;
        }

        setDeleteError("");

        try {
            await deleteProjectByID(project.id);
            const updateProjects = await getProject();
            setProject(updateProjects);
        } catch (error) {
            const errorData = error.response?.data || error;

            console.error("Error al eliminar el proyecto:", errorData);

            if (errorData.code === "23503") {
                setDeleteError("No se puede eliminar el proyecto porque todavía tiene tareas asignadas.");
            } else if (errorData.code === "42501") {
                setDeleteError("No tienes permiso para eliminar este proyecto.");
            } else if (errorData.code === "PROJECT_NOT_DELETED") {
                setDeleteError("El proyecto no se eliminó. Comprueba los permisos de eliminación en Supabase.");
            } else {
                setDeleteError("Ocurrió un error al eliminar el proyecto. Inténtalo nuevamente.");
            }
        }

    }



    return { handleSubmitCreateProjectForm, loading, setloading, project, setProject, handleProjects, projectSelected, hanldeProjectSelected, hanldeDeleteProject, deleteError, setDeleteError };
};


