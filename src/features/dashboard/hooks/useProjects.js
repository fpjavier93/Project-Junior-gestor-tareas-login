import getUserID from "../services/CreateTaskServices"
import { createProject, deleteProjectByID, getProject } from "../services/taskProjectServices"
import { useState } from "react"

export function useProject() {
    const [loading, setloading] = useState(false)
    const [project, setProject] = useState([])
    const [projectSelected, setprojectSelected] = useState("Sin proyecto")
    const [deleteError, setDeleteError] = useState("")
    const [projectToDelete, setProjectToDelete] = useState(null)
    const [isDeletingProject, setIsDeletingProject] = useState(false)

    async function handleSubmitCreateProjectForm(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const dataProject = Object.fromEntries(formData.entries())
        const newDataForm = {
            user_id: await getUserID(),
            ...dataProject,
        }

        try {
            setloading(true)
            await createProject(newDataForm)
            event.target.reset()
        } catch (error) {
            console.error("Error al crear el proyecto:", error.response?.data || error)
        } finally {
            setloading(false)
        }
    }

    async function handleProjects() {
        setloading(true)
        try {
            setProject(await getProject())
        } catch (error) {
            console.error("Error al cargar los proyectos:", error.response?.data || error)
        } finally {
            setloading(false)
        }
    }

    function hanldeProjectSelected(value) {
        setprojectSelected(value)
    }

    function hanldeDeleteProject(projectToRemove) {
        setDeleteError("")
        setProjectToDelete(projectToRemove)
    }

    function closeDeleteProjectDialog() {
        if (isDeletingProject) return
        setProjectToDelete(null)
    }

    async function confirmDeleteProject() {
        if (!projectToDelete) return

        setIsDeletingProject(true)
        setDeleteError("")

        try {
            await deleteProjectByID(projectToDelete.id)
            setProject(await getProject())
            setProjectToDelete(null)
        } catch (error) {
            const errorData = error.response?.data || error
            console.error("Error al eliminar el proyecto:", errorData)

            if (errorData.code === "23503") {
                setDeleteError("No se puede eliminar el proyecto porque todavía tiene tareas asignadas.")
            } else if (errorData.code === "42501") {
                setDeleteError("No tienes permiso para eliminar este proyecto.")
            } else if (errorData.code === "PROJECT_NOT_DELETED") {
                setDeleteError("El proyecto no se eliminó. Comprueba los permisos de eliminación en Supabase.")
            } else {
                setDeleteError("Ocurrió un error al eliminar el proyecto. Inténtalo nuevamente.")
            }

            setProjectToDelete(null)
        } finally {
            setIsDeletingProject(false)
        }
    }

    return {
        handleSubmitCreateProjectForm,
        loading,
        setloading,
        project,
        setProject,
        handleProjects,
        projectSelected,
        hanldeProjectSelected,
        hanldeDeleteProject,
        deleteError,
        setDeleteError,
        projectToDelete,
        isDeletingProject,
        closeDeleteProjectDialog,
        confirmDeleteProject,
    }
}