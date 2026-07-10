import { useEffect } from "react";
import { useProject } from "../hooks/useProjects";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { ProjectCard } from "../components/ProjectCard";


export function ProjectPage() {


    const { loading, project, handleProjects } = useProject();


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

            <ProjectCard
                projects={project}
            />

        </main>
    )
}

