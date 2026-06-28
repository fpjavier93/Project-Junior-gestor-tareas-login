import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useProject } from "../hooks/useProjects"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { getProjectByID } from "../services/taskProjectServices"

export function ProjectDetailsPage() {

    const { projectID } = useParams()
    const { loading, setloading } = useProject();
    const [project, setProject] = useState({});


    useEffect(() => {

        async function hanldeProjectDetailsPage() {

            try {
                setloading(true)
                const detailsProject = await getProjectByID(projectID)
                setProject(detailsProject);
                console.log(detailsProject)

            } finally {
                setloading(false)
            }

        }

        hanldeProjectDetailsPage()


    }, [projectID])



    if (loading) {
        return <LoadingSpinner />
    }



    return (
        <main className="max-w-5xl px-4 py-8 mx-auto">
            <section className="overflow-hidden border-indigo-200 shadow rounded-3xl"
                style={{ backgroundColor: project.color || "#e0e7ff" }}>

                <header className="flex items-start justify-between gap-4 px-6 py-5 border-b border-indigo-300"
                    style={{ backgroundColor: project.color || "#e0e7ff" }}>
                    <div>
                        <p className="text-sm font-medium text-indigo-700">
                            Proyecto
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-gray-900">
                            {project.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="text-sm font-medium text-indigo-600 hover:underline hover:cursor-pointer"
                            onClick={() => navigate("/dashboard/project-page")}
                        >
                            Volver
                        </button>
                    </div>
                </header>

                <section className="px-6 py-5 space-y-6">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-500">
                            Descripcion
                        </h2>
                        <p className="mt-1 text-gray-900">
                            Aqui se mostrara la descripcion del proyecto.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="p-4 border border-indigo-200 rounded-md bg-indigo-50">
                            <h2 className="text-sm font-semibold text-gray-500">
                                ID del proyecto
                            </h2>
                            <p className="mt-1 text-sm font-medium text-gray-900 break-all">
                                {projectID}
                            </p>
                        </div>

                        <div className="p-4 border border-indigo-200 rounded-md bg-indigo-50">
                            <h2 className="text-sm font-semibold text-gray-500">
                                Tareas
                            </h2>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                0
                            </p>
                        </div>

                        <div className="p-4 border border-indigo-200 rounded-md bg-indigo-50">
                            <h2 className="text-sm font-semibold text-gray-500">
                                Estado
                            </h2>
                            <p className="mt-1 font-medium text-gray-900">
                                Activo
                            </p>
                        </div>
                    </div>

                    <div className="pt-5 border-t border-indigo-200">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Tareas del proyecto
                            </h2>
                            <p className="mt-1 text-sm text-gray-700">
                                Aqui podras mostrar las tareas relacionadas con este proyecto.
                            </p>
                        </div>

                        <div className="flex items-center justify-center mt-5 border border-indigo-300 border-dashed rounded-md min-h-40 bg-indigo-50">
                            <p className="text-sm font-medium text-gray-500">
                                Todavia no hay tareas cargadas en esta vista.
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    )
}


