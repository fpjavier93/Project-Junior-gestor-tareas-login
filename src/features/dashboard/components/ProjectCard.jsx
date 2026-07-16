import { useNavigate } from "react-router-dom"


export function ProjectCard({ projects, onDelete }) {
    const navigate = useNavigate();

    return (

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
                <article
                    key={project.id}
                    className={`relative flex flex-col justify-between px-5 pt-8 pb-5 border border-indigo-200 rounded-md shadow min-h-44 hover:border-black`}
                    style={{ backgroundColor: project.color || "#e0e7ff" }}
                >
                    <div className="absolute top-0 w-24 h-6 -translate-y-3 bg-indigo-300 border border-b-0 border-indigo-200 left-4 rounded-t-md" />

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {project.name}
                        </h2>
                    </div>

                    <div className="flex justify-end mt-10">
                        <button
                            type="button"
                            className="text-sm font-medium text-indigo-600 hover:underline hover:cursor-pointer"
                            onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                        >
                            Ver detalles
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-sm font-medium text-indigo-600 hover:underline hover:cursor-pointer"
                            onClick={() => onDelete(project)}
                        >
                            Eliminar
                        </button>
                    </div>
                </article>
            ))}
        </section>
    )

}