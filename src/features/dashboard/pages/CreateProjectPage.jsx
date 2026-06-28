import { useNavigate } from "react-router-dom";
import { Blue, White } from "../../../components/Buttons";
import { useProject } from "../hooks/useProjects";
import LoadingSpinner from "../../../components/LoadingSpinner";


export function CreateProjectPage() {
    const navigate = useNavigate();
    const { handleSubmitCreateProjectForm, loading } = useProject();








    if (loading) return <LoadingSpinner />

    return (
        <main className="max-w-4xl px-4 py-10 mx-auto">
            <section className="p-6 bg-indigo-200 border border-gray-300 rounded shadow">
                <header className="pb-4 mb-6 border-b border-gray-300">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Crear proyecto
                    </h1>
                    <p className="mt-1 text-sm text-gray-700">
                        Organiza tus tareas dentro de un proyecto.
                    </p>
                </header>

                <form
                    onSubmit={(e) => handleSubmitCreateProjectForm(e)}
                    className="space-y-6"
                >
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-900">
                            Nombre del proyecto
                        </label>

                        <div className="py-3">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Ej: Curso React"
                                className="block w-full rounded-md bg-indigo-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-900">
                            Descripcion
                        </label>

                        <div className="py-3">
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                placeholder="Describe brevemente el objetivo del proyecto"
                                className="block w-full rounded-md bg-indigo-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="color" className="block text-lg font-medium text-gray-900">
                            Marcador
                        </label>

                        <div className="flex items-center gap-3 py-3">
                            <input
                                id="color"
                                name="color"
                                type="color"
                                defaultValue="#6366f1"
                                className="w-12 h-10 p-1 rounded bg-indigo-50"
                            />

                            <p className="text-sm text-gray-700">
                                Puedes identificar tu proyecto con colores
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-300">
                        <div className="flex justify-end gap-3">
                            <White
                                type="button"
                                name="Cancelar"
                                onClick={() => navigate("/dashboard/project-page")}
                            />

                            <Blue
                                type="submit"
                                name="Crear proyecto"
                            />
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
}
