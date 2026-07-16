import { useEffect } from "react";
import { useProject } from "../hooks/useProjects";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { ProjectCard } from "../components/ProjectCard";


export function ProjectPage() {


    const { loading, project, handleProjects, hanldeDeleteProject, deleteError, setDeleteError } = useProject();


    useEffect(() => {

        handleProjects();

    }, []);

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <main className="max-w-6xl px-4 py-8 mx-auto">
            <header className="flex items-center justify-between pb-5 mb-8 border-b border-indigo-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Proyectos
                    </h1>
                    <p className="mt-1 text-sm text-gray-700">
                        Organiza tus tareas por proyecto.
                    </p>
                </div>
            </header>

            {deleteError && (
                <div
                    className="flex items-start justify-between gap-4 p-4 mb-6 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md"
                    role="alert"
                >
                    <div>
                        <p className="font-semibold">No se pudo eliminar el proyecto</p>
                        <p className="mt-1">{deleteError}</p>
                    </div>

                    <button
                        type="button"
                        className="font-medium text-red-700 hover:text-red-900 hover:underline"
                        onClick={() => setDeleteError("")}
                    >
                        Cerrar
                    </button>
                </div>
            )}

            <ProjectCard
                projects={project}
                onDelete={hanldeDeleteProject}
            />

        </main>
    )
}

