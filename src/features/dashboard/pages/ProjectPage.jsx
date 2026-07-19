import { useEffect } from "react"
import { CircleAlert, FolderKanban, X } from "lucide-react"
import { useProject } from "../hooks/useProjects"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { ProjectCard } from "../components/ProjectCard"
import { DeleteConfirmationDialog } from "../components/DeleteConfirmationDialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function ProjectPage() {
    const {
        loading,
        project,
        handleProjects,
        hanldeDeleteProject,
        deleteError,
        setDeleteError,
        projectToDelete,
        isDeletingProject,
        closeDeleteProjectDialog,
        confirmDeleteProject,
    } = useProject()

    useEffect(() => {
        handleProjects()
    }, [])

    if (loading) return <LoadingSpinner />

    return (
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
            <header>
                <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                    <FolderKanban className="size-6" />
                    Proyectos
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">Organiza tus tareas por proyecto.</p>
            </header>

            {deleteError && (
                <Alert variant="destructive" role="alert">
                    <CircleAlert />
                    <AlertTitle>No se pudo eliminar el proyecto</AlertTitle>
                    <AlertDescription className="flex items-center justify-between gap-4">
                        <span>{deleteError}</span>
                        <Button type="button" variant="ghost" size="icon-sm" aria-label="Cerrar error" onClick={() => setDeleteError("")}><X /></Button>
                    </AlertDescription>
                </Alert>
            )}

            {project.length === 0 ? (
                <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed bg-background text-center">
                    <FolderKanban className="mb-3 size-10 text-muted-foreground" />
                    <p className="font-medium">Todavía no tienes proyectos</p>
                    <p className="mt-1 text-sm text-muted-foreground">Crea uno para agrupar tareas relacionadas.</p>
                </div>
            ) : (
                <ProjectCard projects={project} onDelete={hanldeDeleteProject} />
            )}

            <DeleteConfirmationDialog
                isOpen={Boolean(projectToDelete)}
                title="¿Eliminar este proyecto?"
                description={projectToDelete ? "Se eliminará el proyecto " + projectToDelete.name + ". Esta acción no se puede deshacer." : ""}
                isDeleting={isDeletingProject}
                onCancel={closeDeleteProjectDialog}
                onConfirm={confirmDeleteProject}
            />
        </main>
    )
}